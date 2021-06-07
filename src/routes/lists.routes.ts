import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import AddItemToListService from '../services/AddItemToListService';
import CreateListService from '../services/CreateListService';
import DeleteItemService from '../services/DeleteItemService';
import DeleteListService from '../services/DeleteListService';
import GetListByIdService from '../services/GetListByIdService';
import GetUserListsService from '../services/GetUserListsService';
import UpdateItemService from '../services/UpdateItemService';

const listsRouter = Router();

listsRouter.use(ensureAuthenticated);

listsRouter.get('/', async (request, response) => {
    const { id } = request.user;

    const getUserLists = new GetUserListsService();

    const lists = await getUserLists.execute(id);

    return response.json(lists);
});

listsRouter.get('/:listId', async (request, response) => {
    const { id } = request.user;
    const { listId } = request.params;

    const getListById = new GetListByIdService();

    const list = await getListById.execute({ userId: id, listId });

    return response.json(list);
});

listsRouter.post('/', async (request, response) => {
    const { id } = request.user;
    const { title } = request.body;

    const createList = new CreateListService();

    const list = await createList.execute({ id, title });

    return response.json(list);
});

listsRouter.post('/:listId/item', async (request, response) => {
    const { id } = request.user;
    const { listId } = request.params;
    const { content, quantity } = request.body;

    const addItem = new AddItemToListService();

    const item = await addItem.execute({ userId: id, listId, content, quantity });

    return response.json(item);
});

listsRouter.put('/:listId/item/:itemId', async (request, response) => {
    const { id } = request.user;
    const { listId, itemId } = request.params;
    const { content, quantity } = request.body;

    const updateItem = new UpdateItemService();

    await updateItem.execute({ userId: id, listId, itemId, content, quantity });

    return response.status(204).send();
});

listsRouter.delete('/:listId/item/:itemId', async (request, response) => {
    const { id } = request.user;
    const { listId, itemId } = request.params;

    const deleteItem = new DeleteItemService();

    await deleteItem.execute({ userId: id, listId, itemId });

    return response.status(204).send();
});

listsRouter.delete('/:listId', async (request, response) => {
    const { id } = request.user;
    const { listId } = request.params;

    const deleteList = new DeleteListService();

    await deleteList.execute({ userId: id, listId });

    return response.status(204).send();
});

export default listsRouter;