import {Router} from 'express';
import { registerUser, loginUser, getUsers, getUserById, patchUser } from '../controllers/user.js';
import { usersPicturesUpload } from '../middlewares/uploads.js';
import { isAuthenticated,isAuthorized } from '../middlewares/auth.js';

const userRouter = Router();

// Public routes
userRouter.post('/user/register', usersPicturesUpload.single("image"), registerUser);
userRouter.post('/user/login', loginUser);

// Protected routes
userRouter.get('/user', isAuthenticated, isAuthorized, getUsers); // Admin only - get all users
userRouter.get('/user/:id', isAuthenticated, getUserById);    // Get user by ID (for profile)
userRouter.patch('/user:id', isAuthenticated, usersPicturesUpload.single("image"), patchUser); // Update user
// userRouter.delete('/:id', isAuthenticated, deleteUser);  // Delete user

export default userRouter;