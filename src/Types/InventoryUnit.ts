export enum Condition {
    New = 'New',
    Excellent = 'Excellent',
    Good = 'Good',
    Worn = 'Worn',
    Damaged = 'Damaged',
    Unusable = 'Unusable'
}

export enum Usage {
    Active = 'Active',
    Spare = 'Spare',
    Display = 'Display',
    Other = 'Other',
    Inactive = 'Inactive'
}

export interface InventoryUnit {
    id?: number;
    serial_number: string;
    acquisition_date: string;
    condition: Condition;
    usage: Usage;
    expense_id: number;
    component_id: number;
}
