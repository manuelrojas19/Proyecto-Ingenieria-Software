import { Profile } from "./profile";
import { Department } from "./department";

export interface Employee {
    id: number,
    name: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    profile: Profile,
    department: Department,
}
