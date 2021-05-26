import { Employee } from "../models/employee";

export interface SigninResponse {
    message: string;
    employee: Employee;
}
