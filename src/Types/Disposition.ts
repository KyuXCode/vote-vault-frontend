export interface Disposition {
    id?:number;
    date: string;
    method: string;
    entity: string;
    amount: number;
    inventory_unit_id: number;
}