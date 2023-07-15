export interface User {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    id: number
}

export interface Register {
    email: string,
    password: string,
    repeatPassword: string
}

export interface Login {
    email: string;
    password: string;
}

export interface LoggedUser {
    accessToken: string
    user: User
}