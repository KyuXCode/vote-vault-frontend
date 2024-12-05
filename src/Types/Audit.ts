import {RandomAuditData} from "./RandomAuditData.ts";
import {PublicAuditData} from "./PublicAuditData.ts";

export interface PublicAudit {
    seed_number: string,
    results: PublicAuditData[],
}

export interface RandomAudit {
    seed_number: string,
    results: RandomAuditData[],
}