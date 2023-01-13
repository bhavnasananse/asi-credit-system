import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Action } from 'rxjs/internal/scheduler/Action';
import { User, Role, User1, Insurance, PaymentMode, Customer, CustomerType, Credit } from '../models/user';
import { RespAck } from '../models/RespAck';
import {AES , enc} from 'crypto-ts';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient, private snackBar:MatSnackBar ) { }
 
  user_login(username: string, password: string):Observable<User>{
    return this.http.post<User>('http://localhost:3000/users/login', {username:username, password: password})
  }

  save_user(obj:User1):Observable<RespAck>{
    return this.http.post<RespAck>('http://localhost:3000/users/add_user',obj)
  }
  get_users():Observable<User1[]>{
    return this.http.get<User1[]>('http://localhost:3000/users/user')
  }
  update_user(obj: User1):Observable<RespAck>{
    return this.http.post<RespAck>('http://localhost:3000/users/update_user',obj) 
  }
  putroles():Observable<Role[]>{
    return this.http.get<Role[]>('http://localhost:3000/users/roles')
  }
  delete_user(id:number): Observable<RespAck>{
    return this.http.post<RespAck>('http://localhost:3000/users/delete_user',{id:id})
  }
  
 
get_role():Observable<Role[]>{
    return this.http.get<Role[]>('http://localhost:3000/role/role')
}
add_role(obj:Role):Observable<RespAck>{
    return this.http.post<RespAck>('http://localhost:3000/role/add_role',obj)
}
update_role(obj: Role): Observable<RespAck>{
    return this.http.post<RespAck>('http://localhost:3000/role/update_role',obj)
}
delete_role(r_id:number):Observable<RespAck>{
  return this.http.post<RespAck>('http://localhost:3000/role/delete_role',{r_id:r_id})
}
  

add_customer(obj):Observable<RespAck>{
  return this.http.post<RespAck>('http://localhost:3000/customer/customer_type_add',obj)
}
get_customer_type():Observable<CustomerType[]>{
  return this.http.get<CustomerType[]>('http://localhost:3000/customer/customer_type_get')
}
update_customer_type(obj):Observable<RespAck>{
  return this.http.post<RespAck>('http://localhost:3000/customer/customer_type_update',obj)
}
delete_customer_type(c_id: number):Observable<RespAck>{
  return this.http.post<RespAck>('http://localhost:3000/customer/customer_type_delete',{c_id:c_id})
}
set_default(obj):Observable<RespAck>{
  return this.http.post<RespAck>('http://localhost:3000/customer/set_is_default',obj) 
}
get_default_list():Observable<any[]>{
  return this.http.get<any[]>('http://localhost:3000/customer/get_default_list') 
}
set_non_default(obj):Observable<RespAck>{
  return this.http.post<RespAck>('http://localhost:3000/customer/set_non_default',obj) 
}


add_insurance_company(obj):Observable<RespAck>{
  return this.http.post<RespAck>('http://localhost:3000/insurance/add_insurance_company',obj)
}
get_insurance_company(): Observable<Insurance[]>{
  return this.http.get<Insurance[]>('http://localhost:3000/insurance/get_insurance_company')
}
update_insurance_company(obj: Insurance): Observable<RespAck>{
  return this.http.post<RespAck>('http://localhost:3000/insurance/update_insurance_company',obj)
}
delete_insurance_company(i_id: number):Observable<RespAck>{
  return this.http.post<RespAck>('http://localhost:3000/insurance/delete_insurance_company',{i_id:i_id})
}


add_payment_mode(obj): Observable<RespAck>{
  return this.http.post<RespAck>('http://localhost:3000/payment/add_payment_mode',obj)
}
get_payment_mode(): Observable<PaymentMode[]>{
  return this.http.get<PaymentMode[]>('http://localhost:3000/payment/payment_mode')
}
update_payment_mode(obj): Observable<RespAck>{
  return this.http.post<RespAck>('http://localhost:3000/payment/update_payment_mode', obj)
}
delete_payment_mode(p_id:number): Observable<RespAck>{
  return this.http.post<RespAck>('http://localhost:3000/payment/delete_payment_mode',{p_id:p_id})
}


get_customer_list(): Observable<Customer[]>{
  return this.http.get<Customer[]>('http://localhost:3000/customer/get_customer')
}
update_customer_list(obj: Customer):Observable<RespAck>{
  return this.http.post<RespAck>('http://localhost:3000/customer/update_customer',obj)
}
add_customer_list(obj):Observable<RespAck>{
  return this.http.post<RespAck>('http://localhost:3000/customer/add_customer',obj)
}
delete_customer_list(cl_id:number):Observable<RespAck>{
  return this.http.post<RespAck>('http://localhost:3000/customer/delete_customer',{cl_id: cl_id})
}
get_cust_details(obj): Observable<any>{
  return this.http.post<any>('http://localhost:3000/customer/get_cust_details',obj)
}

add_credit(obj):Observable<RespAck>{
  return this.http.post<RespAck>('http://localhost:3000/credit/add_credit',obj)
}
get_credit_list():Observable<Credit[]>{
  return this.http.get<Credit[]>('http://localhost:3000/credit/get_credit_list')
}
update_credit(obj: Credit):Observable<RespAck>{
  return this.http.post<RespAck>('http://localhost:3000/credit/update_credit',obj)
}
delete_credit(credit_id:number):Observable<RespAck>{
  return this.http.post<RespAck>('http://localhost:3000/credit/delete_credit',{credit_id: credit_id})
}
get_cname():Observable<any[]>{
  return this.http.get<any[]>('http://localhost:3000/credit/cname')
}
get_ctype():Observable<any[]>{
  return this.http.get<any[]>('http://localhost:3000/credit/ctype')
}
get_advisor():Observable<any[]>{
  return this.http.get<any[]>('http://localhost:3000/credit/role_type')
}
add_approve_amount(obj): Observable<RespAck>{
  return this.http.post<RespAck>('http://localhost:3000/credit/add_approve_amount',obj)
}


add_followup(obj):Observable<RespAck>{
  return this.http.post<RespAck>('http://localhost:3000/followup/add_followup',obj)
}
todays_followup():Observable<any[]>{
  return this.http.get<any[]>('http://localhost:3000/followup/get_todays_followup')
}
get_followup():Observable<any[]>{
  return this.http.get<any[]>('http://localhost:3000/followup/get_followup')
}

add_special_approval(obj):Observable<RespAck>{
  return this.http.post<RespAck>('http://localhost:3000/special_approve/add_special_approval',obj)
}
specially_approve(obj):Observable<RespAck>{
  return this.http.post<RespAck>('http://localhost:3000/special_approve/is_approve',obj)
}
get_special_approval_list():Observable<any[]>{
  return this.http.get<any[]>('http://localhost:3000/special_approve/get_special_approval_list')
}


add_payment(obj): Observable<any>{
  return this.http.post<any>('http://localhost:3000/special_approve/add_payment',obj)
}
set_reject(obj): Observable<RespAck>{
  return this.http.post<RespAck>('http://localhost:3000/manager/is_reject', obj)
}
get_reject_list():Observable<any[]>{
  return this.http.get<any[]>('http://localhost:3000/manager/get_reject_list')
}
approve_credit(obj):Observable<RespAck>{
  return this.http.post<RespAck>('http://localhost:3000/manager/approve_credit',obj)
}
set_approve(obj):Observable<RespAck>{
  return this.http.post<RespAck>('http://localhost:3000/manager/is_approved', obj)
}
get_approved_list():Observable<any[]>{
  return this.http.get<any[]>('http://localhost:3000/manager/get_approved_list')
}
manager_add_payment(obj): Observable<any>{
  return this.http.post<any>('http://localhost:3000/manager/add_payment',obj)
}

update_status(obj):Observable<any>{
  return this.http.post<any>('http://localhost:3000/account/set_payment_status',obj)
}
get_payment_status():Observable<any[]>{
  return this.http.get<any[]>('http://localhost:3000/account/get_list_complete');
}
get_pending_list():Observable<any[]>{
  return this.http.get<any[]>('http://localhost:3000/account/get_list_pending');
}

get_credit_details():Observable<any[]>{
  return this.http.get<any[]>('http://localhost:3000/custom/get_credit_details')
}

get_total_credit():Observable<any[]>{
  return this.http.get<any[]>('http://localhost:3000/manager/get_total_credit')
}
get_approver_reports():Observable<any>{
  return this.http.get<any>('http://localhost:3000/manager/get_approver_reports')
}


get_credit_approval():Observable<any[]>{
  return this.http.get<any[]>('http://localhost:3000/credit/get_credit_approval')
}

get_list(obj): Observable<any>{
  return this.http.post<any>('http://localhost:3000/reports/get_list',obj)
}
get_outstanding_list(obj): Observable<any>{
  return this.http.post<any>('http://localhost:3000/reports/get_outstanding_list',obj)
}
get_recovery_list(obj): Observable<any>{
  return this.http.post<any>('http://localhost:3000/reports/get_recovery_list',obj)
}
get_manager_reports(obj): Observable<any>{
  return this.http.post<any>('http://localhost:3000/reports/get_manager_reports',obj)
}
get_credit_expire_reports(obj): Observable<any>{
  return this.http.post<any>('http://localhost:3000/reports/get_credit_expire_reports',obj)
}
get_special_approve_reports(obj): Observable<any>{
  return this.http.post<any>('http://localhost:3000/reports/get_specially_approved_reports',obj)
}
get_special_recovery_reports(obj): Observable<any>{
  return this.http.post<any>('http://localhost:3000/reports/get_specially_recovery_reports',obj)
}
get_special_outstanding_reports(obj): Observable<any>{
  return this.http.post<any>('http://localhost:3000/reports/get_specially_outstanding_reports',obj)
}
get_approver_credit_report(obj): Observable<any>{
  return this.http.post<any>('http://localhost:3000/reports/get_approver_reports',obj)
}
get_approver_outstanding_report(obj): Observable<any>{
  return this.http.post<any>('http://localhost:3000/reports/get_approver_outstanding_reports',obj)
}
get_approver_recovery_report(obj): Observable<any>{
  return this.http.post<any>('http://localhost:3000/reports/get_approver_recovery_reports',obj)
}

get_advisor_list(): Observable<any>{
  return this.http.get<any>('http://localhost:3000/reports/get_advisor_list')
}

get_pending_report(id:number): Observable<any>{
  return this.http.post<any>('http://localhost:3000/pending/get_pending_report',{id:id})
}


setUser(user:User){
  var ciphertext = AES.encrypt(JSON.stringify(user), '');
  sessionStorage.setItem("user",ciphertext.toString());
} 

getUser():User{    
  if(sessionStorage.getItem("user")!=null){
    var enctext = sessionStorage.getItem("user");
    var bytes  = AES.decrypt(enctext.toString(), '');
    var plaintext = bytes.toString(enc.Utf8);
    return JSON.parse(plaintext);
  }else{
    return null;
  }
}
  alert(type:string , messege:string,action?:string, timeout?:number){
    action= action == null ? 'Ok': action;
    timeout= timeout == null ? 5000 : timeout;

    this.snackBar.open(messege, action, {
      duration: timeout,
    });
  }  
  
}
