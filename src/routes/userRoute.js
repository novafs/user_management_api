import express from "express";
import {
  getUsers,
  uploadAvatar,
  editUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve all users.
 *     description: This endpoint can only be accessed by authenticated users.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved the list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   username:
 *                     type: string
 *                     example: budi
 *                   email:
 *                     type: string
 *                     example: budi@example.com
 *                   role:
 *                     type: string
 *                     example: user
 *                   avatar_url:
 *                     type: string
 *                     example: https://res.cloudinary.com/.../avatar.jpg
 *       '401':
 *         description: Unauthorized. Missing or invalid token.
 *       '500':
 *         description: Internal server error while fetching users.
 * 
 * /api/users/avatar:
 *   post:
 *     summary: Upload or update user avatar.
 *     description: Allows an authenticated user to upload or update their profile picture.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Image file for the avatar upload.
 *     responses:
 *       '200':
 *         description: Avatar uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Avatar uploaded
 *                 url:
 *                   type: string
 *                   example: https://res.cloudinary.com/.../avatar.jpg
 *       '400':
 *         description: No file uploaded.
 *       '401':
 *         description: Unauthorized. Missing or invalid token.
 *       '500':
 *         description: Internal server error during avatar upload.
 * 
 * /api/users/edit:
 *   put:
 *     summary: Update user profile (including password).
 *     description: This endpoint allows an authenticated user to update their username, email, and/or password.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: New username.
 *                 example: budi_new
 *               email:
 *                 type: string
 *                 format: email
 *                 description: New email.
 *                 example: budi.new@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: New password (will be hashed).
 *                 example: StrongPassword123
 *     responses:
 *       '200':
 *         description: User successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Edit Success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: budi_new
 *                     email:
 *                       type: string
 *                       example: budi.new@example.com
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-10-22T12:34:56Z
 *       '400':
 *         description: Validation failed (e.g., email already in use or password same as previous).
 *       '401':
 *         description: Unauthorized. Missing or invalid token.
 *       '500':
 *         description: Internal server error during user update.
 */

router.get("/", verifyToken, getUsers);
router.post("/avatar", verifyToken, upload.single("file"), uploadAvatar);
router.put("/edit", verifyToken, editUser);

export default router;
