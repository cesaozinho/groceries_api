import AppError from "../errors/AppError";
import User from "../models/User";

class DeleteUserService {
    public async execute(id: string) {
        const user = await User.findById(id);

        if (!user) {
            throw new AppError('Unable to perform this action.', 403);
        }

        await user.remove();
    }
}

export default DeleteUserService;