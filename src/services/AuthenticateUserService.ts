import AppError from '../errors/AppError';
import authConfig from '../config/auth';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import User from '../models/User';

interface IRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: IRequest) {
        const user = await User.findOne({ email });

        if (!user) {
            throw new AppError('Incorrect e-mail/password combination', 401);
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError('Incorrect e-mail/password combination', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user._id.toString(),
            expiresIn
        });

        const userWithoutPassword = {
            id: user._id,
            name: user.name,
            email: user.email,
            lists: user.lists,
            createdAt: user.createdAt
        };

        return { user: userWithoutPassword, token };
    }
}

export default AuthenticateUserService;