export class User{
    id?: number;
    username: string;
    password?:string;
}

export interface User1{
    id?: number;
    r_id?: number;
    firstname: string;
    lastname: string;
    role: string;
    credit: string;
    username: string;
}

export interface Role{
    r_id: number;
    role: string;
    is_deleted?: boolean;
}

export interface Insurance{
    i_id:number;
    company_name: string;
}

export class PaymentMode{
    p_id?: number;
    mode_name : string;
    is_deleted? : boolean;
}

export interface CustomerType{
    c_id: number;
    c_type: string;
}
export interface Customer{
    cl_id: number;
    c_id: number;
    c_name: string;
    car_no: string;
    contact_no: number;
    contact_person: string;
    contact_person_no: number;
    location: string;
    GSTN: string;
    credit_amount: number;
    credit_days: number;
    comment?: string;
}

export interface Credit{
    credit_id?: number;
    require_credit: number;
    invoice_no: number;
    invoice_amount: number;
    due_date: number;
    comment?: string;
    c_id?: number;
    cl_id?: number;
    is_credit_deleted: boolean;
    c_name: string;
    car_no: string;    
}
