import { Employee } from "../models/employee";
import { Meta } from "./meta";

export interface EmployeeResponse {
    meta: Meta,
    employee: Employee,
}