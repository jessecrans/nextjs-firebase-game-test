import { v4 as uuidv4 } from 'uuid';

export type User = {
    id: string,
    name: string
}

export const createUser = (userName: string) => {
    const user: User = {
        id: uuidv4(),
        name: userName
    }
    return user;
}