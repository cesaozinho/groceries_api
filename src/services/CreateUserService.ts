import { hash } from "bcryptjs";
import AppError from "../errors/AppError";
import User from "../models/User";

interface IRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: IRequest): Promise<any> {
        const userExists = await User.findOne({ email });

        if (!!userExists) {
            throw new AppError('E-mail already registered', 409);
        }

        const hashedPassword = await hash(password, 8);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        const userWithoutPassword = {
            id: user._id,
            name: user.name,
            email: user.email,
            lists: user.lists
        };

        return userWithoutPassword;
    }
}

export default CreateUserService;