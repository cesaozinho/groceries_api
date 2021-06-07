import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';

const usersRouter = Router();

/* usersRouter.get('/', async (request, response) => {
    const user = await User.findById('60aac46d7f590432a0611df1');

    const userWithoutPassword = {
        id: user._id,
        name: user.name,
        email: user.email,
        lists: user.lists,
        createdAt: user.createdAt
    };

    return response.json(userWithoutPassword);
}); */

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
        name,
        email,
        password
    });

    return response.json(user);
});

usersRouter.delete('/', ensureAuthenticated, async (request, response) => {
    const { id } = request.user;

    const deleteUser = new DeleteUserService();

    await deleteUser.execute(id);

    return response.status(204).send();
});

export default usersRouter;