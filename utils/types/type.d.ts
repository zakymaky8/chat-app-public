export type TUser = {
    _id: string,
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    email: string,
    allowedUsersToChat: string[] | TUser[],
    chattedUsers: string[],
    alowedChats: string,
    isActive: boolean,
    preferences: {
        alowedChats: string,
        theme: string,
        canTheySearchYou: boolean
    }
}



