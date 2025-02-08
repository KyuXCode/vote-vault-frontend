import {OrgType} from "../Enums/OrgType.ts";
import {Role} from "../Enums/Role.ts";

export interface UserCredential {
    id?: number;
    status?: string;
    name: string;
    email: string;
    password?: string;
    password_confirmation?: string;
    phone?: string;
    username: string;
    supervisor_name: string;
    supervisor_email: string;
    organization: OrgType;
    role: Role;
    created_at?: string;
    updated_at?: string;
}
