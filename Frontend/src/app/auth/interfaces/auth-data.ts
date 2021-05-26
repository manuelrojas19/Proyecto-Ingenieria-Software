import { Employee } from "../models/employee";

export interface AuthData {
    isAuthenticated: boolean,
    employee: Employee,
}
