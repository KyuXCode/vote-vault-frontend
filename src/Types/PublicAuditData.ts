export interface AuditData {
    inventory_id: number;
    serial_number: string;
    condition: string;
    usage: string;
    system_base: string;
    component_name: string;
    component_type: string;
    county_name: string;
    total_count: number;
    row_num: number;
    temporary_guid: string;
}

export type PublicAuditData = Record<string, AuditData[]>;
