export interface AuthUser{
    name: string;
    password: string;
    status: boolean;
    roles:string[];
    jwt: string;
}
