import { Profiles } from "./profiles.enum";

export interface Employee {
    id: number,
    name: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    profile: Profiles,
    department: string,
}
