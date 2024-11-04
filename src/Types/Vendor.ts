export enum Product {
    EPB = "EPB",
    VS = "VS",
    EPB_VS = "EPB & VS",
    Service = "Service",
    Other = "Other"
}

export interface Vendor {
    id?: number;
    name: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    contact_name?: string;
    contact_email?: string;
    contact_phone?: string;
    product: Product;
}