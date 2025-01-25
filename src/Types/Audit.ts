import {RandomAuditData} from "./RandomAuditData.ts";

export interface Audit {
    seed_number: string,
    results: RandomAuditData[]
}