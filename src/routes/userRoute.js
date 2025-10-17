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
 * users/edit:
 *  put:
 *      summary: Memperbarui data pengguna yang sedang login (termasuk password).
 *      description: Endpoint ini digunakan oleh pengguna yang terautentikasi untuk mengubah email, username, dan/atau password mereka.
 *      tags: [Users]
 *      security:
 *          - bearerAuth: []  # Menunjukkan bahwa endpoint ini memerlukan Bearer Token
 *      requestBody:
 *          required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      username:
 *                          type: string
 *                          description: Username baru. Wajib diisi.
 *                          example: budi_baru
 *                      email:
 *                          type: string
 *                          format: email
 *                          description: Email baru. Wajib diisi.
 *                          example: budi.baru@example.com
 *                      password:
 *                          type: string
 *                          format: password
 *                          description: Password baru (akan di-hash). Bersifat opsional.
 *                          example: PasswordKuat123
 *      responses:
 *          '200':
 *              description: Pembaruan pengguna berhasil.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: User Edit Success
 *                                  data:
 *                                      type: object
 *                                      properties:
 *                                      id:
 *                                          type: integer
 *                                          example: 1
 *                                      username:
 *                                          type: string
 *                                          example: budi_baru
 *                                      email:
 *                                          type: string
 *                                          example: budi.baru@example.com
 *      '401':
 *          description: Tidak Terautentikasi. Token tidak valid atau hilang.
 *      '400':
 *          description: Permintaan Buruk. Validasi input gagal (misalnya, password terlalu pendek).
 *      '409':
 *          description: Konflik. Email sudah digunakan oleh pengguna lain.
 *      '500':
 *          description: Kesalahan Server Internal.
 */

router.get("/", verifyToken, getUsers);
router.post("/avatar", verifyToken, upload.single("file"), uploadAvatar);
router.put("/edit", verifyToken, editUser);

export default router;
