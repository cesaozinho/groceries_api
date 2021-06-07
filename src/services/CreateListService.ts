import AppError from "../errors/AppError";
import List from "../models/List";
import User from "../models/User";

interface IRequest {
    id: string;
    title: string;
}

class CreateListService {
    public async execute({ id, title }: IRequest) {
        const user = await User.findById(id);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        const list = new List({
            title,
            owner: {
                id: user._id,
                name: user.name
            }
        });

        await list.save();

        user.lists.push(list);

        await user.save();

        return list;
    }
}

export default CreateListService;