import List from "../models/List";

class GetUserListsService {
    public async execute(id: string) {
        const lists = await List.find({ 'owner.id': id });

        return lists;
    }
}

export default GetUserListsService;