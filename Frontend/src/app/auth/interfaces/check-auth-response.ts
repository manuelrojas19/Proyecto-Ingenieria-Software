import { Employee } from "../models/employee";

export interface CheckAuthResponse {
    authenticated: boolean;
    employee: Employee;
}
