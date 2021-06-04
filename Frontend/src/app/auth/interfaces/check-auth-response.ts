import { Employee } from "../../core/models/employee";

export interface CheckAuthResponse {
    authenticated: boolean;
    employee: Employee;
}
