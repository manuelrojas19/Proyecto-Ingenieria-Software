import { Commission } from "../models/commission";
import { Meta } from "./meta";

export interface CommissionsResponse {
    meta: Meta,
    commissions: Commission[],
}
