import send from '../../../../../utils/responseHandler.util.js';
import { getUserById, createUser as createNewUser } from '../services/user.service';

export async function getUser(req, res) {
    const user = await getUserById(req.params.id);
    send(res, user);
}

export async function createUser(req, res) {
    const newUser = await createNewUser(req.body);
    send(res, newUser, 'User created successfully', 201);
}