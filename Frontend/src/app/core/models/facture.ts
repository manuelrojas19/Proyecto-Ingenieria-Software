import { Commission } from "./commission";

export interface Facture {
    id: number,
    description: String,
    date: Date,
    amount: number,
    file: String,
}
