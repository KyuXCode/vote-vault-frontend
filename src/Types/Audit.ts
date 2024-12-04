import {RandomAuditData} from "./RandomAuditData.ts";
import {PublicAuditData} from "./PublicAuditData.ts";

export interface Audit {
    seed_number: string,
    results: RandomAuditData[]
}