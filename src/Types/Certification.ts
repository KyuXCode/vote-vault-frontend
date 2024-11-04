export enum CertificationType {
    Certification = 'Certification',
    Reevaluation = 'Reevaluation',
    Renewal = 'Renewal',
    Recertification = 'Recertification',
    Other = 'Other',
}

export enum CertificationAction {
    Approved = 'Approved',
    Pending = 'Pending',
    Denied = 'Denied',
    Other = 'Other',
}

export enum SystemType {
    VS = 'VS',
    EPB = 'EPB',
}

export enum SystemBase {
    DRE = 'DRE',
    OpScan = 'OpScan',
    PCLaptop = 'PC/Laptop',
    Tablet = 'Tablet',
    CustomHardware = 'Custom Hardware',
    Other = 'Other',
}

export interface Certification {
    id?: number;
    model_number: string;
    description: string;
    application_date: string;
    certification_date: string;
    expiration_date: string;
    federal_certification_number?: string;
    federal_certification_date?: string;
    type: CertificationType;
    action: CertificationAction;
    system_type: SystemType;
    system_base: SystemBase;
    vendor_id: number;
}