export interface Expense {
    id?: number;
    name: string;
    amount: number;
    fund: string;
    owner: string
    contract_id: number;
    county_id: number;
}