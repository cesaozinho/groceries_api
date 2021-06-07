import AppError from "../errors/AppError";
import List from "../models/List";
import User from "../models/User";

interface IRequest {
    userId: string;
    listId: string;
    itemId: string;
}

type User = {
    id: string;
    content: string;
    quantity: string;
};

class DeleteItemService {
    public async execute({ userId, listId, itemId }: IRequest) {
        const user = await User.findById(userId);
        const list = await List.findById(listId);

        if (!user._id.equals(list.owner.id)) {
            throw new AppError('You don\'t have permision to delete this item.', 403);
        }

        await list.itemList.remove({ id: itemId });

        await list.save();
    }
}

export default DeleteItemService;