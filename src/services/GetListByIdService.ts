import AppError from "../errors/AppError";
import List from "../models/List";
import User from "../models/User";

interface IRequest {
    userId: string;
    listId: string;
}

class GetListByIdService {
    public async execute({ userId, listId }: IRequest) {
        const user = await User.findById(userId);
        const list = await List.findById(listId);

        if (!user._id.equals(list.owner.id)) {
            throw new AppError('You don\' have permission to view this list.', 403);
        }

        return list;
    }
}

export default GetListByIdService;