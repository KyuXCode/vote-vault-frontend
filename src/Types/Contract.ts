export enum ContractType {
    Purchase = 'Purchase',
    Lease = 'Lease',
    Service = 'Service',
    Other = 'Other'
}

export interface Contract {
    id?: number;
    begin_date: string;
    end_date: string;
    type: ContractType;
    certification_id: number;
}
