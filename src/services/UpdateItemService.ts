import AppError from "../errors/AppError";
import List from "../models/List";
import User from "../models/User";

interface IRequest {
    userId: string;
    listId: string;
    itemId: string;
    content: string;
    quantity: number;
}

class UpdateItemService {
    public async execute({ userId, listId, itemId, content, quantity }: IRequest) {
        const user = await User.findById(userId);
        const list = await List.findById(listId);

        if (!user._id.equals(list.owner.id)) {
            throw new AppError('You don\'t have permission to update this list.', 403);
        }

        const updatedList = await List.findOneAndUpdate({ '_id': listId, 'itemList._id': itemId }, {
            '$set': {
                'itemList.$.content': content,
                'itemList.$.quantity': quantity
            }
        });

        await updatedList.save();
    }
}

export default UpdateItemService;