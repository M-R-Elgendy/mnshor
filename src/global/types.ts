
export enum Role {
    ADMIN = 'admin',
    USER = 'user'
}

export type SessionToken = {
    id: number;
    role: Role;
}