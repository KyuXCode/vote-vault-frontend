export enum ComponentType {
    DRE = 'DRE',
    OpScan = 'OpScan',
    BMD = 'BMD',
    VVPAT = 'VVPAT',
    COTS = 'COTS',
    Other = 'Other',
    Hardware = 'Hardware',
    Software = 'Software',
    Peripheral = 'Peripheral'
}

export interface Component {
    id? : number;
    name: string;
    description: string;
    type: ComponentType;
    certification_id: number;
}