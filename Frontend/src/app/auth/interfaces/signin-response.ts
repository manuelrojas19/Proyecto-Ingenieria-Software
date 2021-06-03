import { Employee } from "../../core/models/employee";

export interface SigninResponse {
    message: string;
    employee: Employee;
}
