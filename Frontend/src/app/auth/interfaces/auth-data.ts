import { Employee } from "../../core/models/employee";

export interface AuthData {
    isAuthenticated: boolean,
    employee: Employee,
}
