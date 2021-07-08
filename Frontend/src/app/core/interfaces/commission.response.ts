import { Commission } from "../models/commission";
import { Meta } from "./meta";

export interface CommissionResponse {
    meta: Meta,
    commission: Commission,
}
