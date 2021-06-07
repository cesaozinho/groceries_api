import AppError from "../errors/AppError";
import List from "../models/List";
import User from "../models/User";

interface IRequest {
    userId: string;
    listId: string;
}

class DeleteListService {
    public async execute({ userId, listId }: IRequest) {
        const user = await User.findById(userId);
        const list = await List.findById(listId);

        if (!user._id.equals(list.owner.id)) {
            throw new AppError('You don\'t have permission to delete this list.', 403);
        }

        await user.lists.remove(listId);

        await user.save();

        await list.remove();
    }
}

export default DeleteListService;