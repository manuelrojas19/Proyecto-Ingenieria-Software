import { Employee } from "./employee";

export interface Commission {
    id: number,
    typeCommission: String,
    placeCommission: String,
    isApprovedByFinances: Boolean,
    isApprovedByManager: Boolean,
    beginDate: Date,
    endDate: Date,
    amountAssigned: Number,
    employee: Employee,
}
