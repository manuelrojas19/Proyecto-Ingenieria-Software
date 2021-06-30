import { Employee } from "./employee";

export interface Commission {
    id: number,
    type: string,
    managerApproval: boolean,
    financesApproval: boolean,
    startDate: Date,
    endDate: Date,
    place: string,
    amountDeposited : number,
    employee: Employee,
}
