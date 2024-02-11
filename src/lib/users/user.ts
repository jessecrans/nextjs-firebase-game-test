import { v4 as uuidv4 } from 'uuid';

export type User = {
    id: string,
    name: string
}

/**
 * Creates a user object with a unique id and the given username
 * 
 * @param userName Username of the user
 * @returns The user object
 */
export const createUser = (userName: string) => {
    const user: User = {
        id: uuidv4(),
        name: userName
    }
    return user;
}

/**
 * Stores the user object in local storage
 * 
 * @param user 
 */
export const storeUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
}

/**
 * Gets the user object from local storage
 * 
 * @returns The user object from local storage
 */
export const getUser = () => {
    return JSON.parse(localStorage.getItem('user') || '{}') as User;
}