import { v4 as uuid } from 'uuid';
import AppError from "../errors/AppError";
import List from "../models/List";
import User from "../models/User";

interface IRequest {
    userId: string;
    listId: string;
    content: string;
    quantity: number;
}

class AddItemToListService {
    public async execute({ userId, listId, content, quantity }: IRequest) {
        const user = await User.findById(userId);
        const list = await List.findById(listId);

        if (!user._id.equals(list.owner.id)) {
            throw new AppError('You don\'t have permission to add to this list.', 403);
        }

        const listItem = {
            id: uuid(),
            content,
            quantity
        };

        list.itemList.push(listItem);

        await list.save();

        return listItem;
    };
}

export default AddItemToListService;