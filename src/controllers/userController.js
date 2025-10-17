import pool from '../config/db.js';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';
import bcrypt from 'bcryptjs';


export const getUsers = async (req, res) => {
  const { rows } = await pool.query('SELECT id, username, email, role, avatar_url FROM users');
  res.json(rows);
};

export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const uploadStream = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'avatars' },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const result = await uploadStream();
    const { id } = req.user;

    await pool.query('UPDATE users SET avatar_url = $1 WHERE id = $2', [result.secure_url, id]);

    res.json({ message: 'Avatar uploaded', url: result.secure_url });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
};

export const editUser = async (req, res) => {
    try {
      const { id } = req.user
      const { username, email, password } = req.body
      const passwordHash = await bcrypt.hash(password, 10);
      await pool.query('UPDATE users SET username=$1, email=$2, password=$3 WHERE id=$4 RETURNING id, email, username', [username, email, passwordHash, id])

      res.json({ message: 'User Edit Success', data: {id, username, emailz}});
    } catch (error) {
      console.log(error);
      
      res.status(500).json({ message: 'Error Edit User' });
    }
}
