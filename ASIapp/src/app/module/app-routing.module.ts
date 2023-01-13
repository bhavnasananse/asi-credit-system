import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../comps/home/home.component';
import { DashboardComponent } from '../default/dashboard/dashboard.component';
import { MasterComponent } from '../default/dashboard/master/master.component';
import { UserComponent } from '../default/dashboard/master/user/user.component';
import { RoleComponent } from '../default/dashboard/master/role/role.component';
import { CustomerTypeComponent } from '../default/dashboard/master/customer-type/customer-type.component';
import { InsuranceComponent } from '../default/dashboard/master/insurance/insurance.component';
import { PaymentModeComponent } from '../default/dashboard/master/payment-mode/payment-mode.component';
import { AuthGuard } from '../guards/auth.guard';
import { CreditComponent } from '../default/dashboard/credit/credit.component';
import { CreditApprovalComponent } from '../default/dashboard/credit-approval/credit-approval.component';
import { FollowUpComponent } from '../default/dashboard/follow-up/follow-up.component';
import { ManagerComponent } from '../default/dashboard/manager/manager.component';
import { ManagerDashboardComponent } from '../default/dashboard/manager-dashboard/manager-dashboard.component';
import { ReportsComponent } from '../default/dashboard/reports/reports.component';
import { CreditExpireComponent } from '../default/dashboard/reports/credit-expire/credit-expire.component';
import { ServiceAdvisorComponent } from '../default/dashboard/reports/service-advisor/service-advisor.component';
import { SpecialApprovalComponent } from '../default/dashboard/reports/special-approval/special-approval.component';
import { TodaysCreditPayComponent } from '../default/dashboard/reports/todays-credit-pay/todays-credit-pay.component';
import { Manager1Component } from '../default/dashboard/reports/manager1/manager1.component';
import { RoleDialogComponent } from '../dialogs/role-dialog/role-dialog.component';
import { CustomerTypeDialogComponent } from '../dialogs/customer-type-dialog/customer-type-dialog.component';
import { PaymentModeDialogComponent } from '../dialogs/payment-mode-dialog/payment-mode-dialog.component';
import { CustomerComponent } from '../default/dashboard/customer/customer.component';
import { UserDialogComponent } from '../dialogs/user-dialog/user-dialog.component';
import { Customer1Component } from '../default/dashboard/reports/customer1/customer1.component';
import { AccountsComponent } from '../default/dashboard/accounts/accounts.component';
import { CustomerdialogComponent } from '../dialogs/customerdialog/customerdialog.component';
import { CreditDialogComponent } from '../dialogs/credit-dialog/credit-dialog.component';
import { InsuranceDialogComponent } from '../dialogs/insurance-dialog/insurance-dialog.component';
import { CustomComponent } from '../default/dashboard/custom/custom.component';
import { ManagerDialogComponent } from '../dialogs/manager-dialog/manager-dialog.component';
import { ManagerDialog1Component } from '../dialogs/manager-dialog1/manager-dialog1.component';
import { CreditDialog1Component } from '../dialogs/credit-dialog1/credit-dialog1.component';
import { ManagerSpecialApprovalComponent } from '../default/dashboard/manager-special-approval/manager-special-approval.component';
import { ManagerSpecialApprovalDialogComponent } from '../dialogs/manager-special-approval-dialog/manager-special-approval-dialog.component';
import { MSAAddPaymentDialogComponent } from '../dialogs/m-s-a-add-payment-dialog/m-s-a-add-payment-dialog.component';
import { AccountDialogComponent } from '../dialogs/account-dialog/account-dialog.component';
import { ManagerAddPaymentDialogComponent } from '../dialogs/manager-add-payment-dialog/manager-add-payment-dialog.component';
import { CustomerDetailDialogComponent } from '../dialogs/customer-detail-dialog/customer-detail-dialog.component';
import { PendingComponent } from '../default/dashboard/pending/pending.component';

 
const routes: Routes = [
  
  {path: '', component:HomeComponent},

  {path: 'dashboard', component:DashboardComponent ,canActivate:[AuthGuard], children:[
      {path: '', component: CustomComponent},
      {path: 'customer', component: CustomerComponent},
      {path: 'accounts', component: AccountsComponent},
      {path: 'manager-special-approval', component: ManagerSpecialApprovalComponent},

      {path: 'pending', component: PendingComponent},
      {path: 'pending/:id', component: PendingComponent},

    
    {path: 'master', component:MasterComponent, canActivate:[AuthGuard], children:[
      {path: 'user', component:UserComponent},
      {path: 'role', component:RoleComponent},
      {path: 'customer-type', component:CustomerTypeComponent},
      {path: 'insurance', component:InsuranceComponent},
      {path: 'payment-mode', component: PaymentModeComponent},

    ]},    
   
    {path: 'credit', component:CreditComponent},
    {path: 'credit-approval', component:CreditApprovalComponent},
    {path: 'role', component:RoleComponent},    
    {path: 'follow-up', component:FollowUpComponent},
    {path: 'manager', component:ManagerComponent},
    {path: 'manager-dashboard', component:ManagerDashboardComponent},

    {path: 'reports', component:ReportsComponent, children:[
      {path: 'credit-expire', component:CreditExpireComponent},
      {path: 'customer1', component: Customer1Component},
      {path: 'service-advisor', component:ServiceAdvisorComponent},
      {path: 'special-approval', component:SpecialApprovalComponent},
      {path: 'todays-credit-pay', component:TodaysCreditPayComponent},
      {path: 'manager1', component:Manager1Component},
    ]},
  ]
},
{path: 'role-dialogcomponent', component:RoleDialogComponent},
  {path: 'Customer-type-dialogcomponent', component:CustomerTypeDialogComponent},
  {path: 'payment-mode-dialogcomponent', component:PaymentModeDialogComponent},
  {path: 'customerdialogcomponent', component: CustomerdialogComponent},
  {path: 'customer-detail-dialogcomponent', component: CustomerDetailDialogComponent},

  {path: 'user-dialogcomponent', component: UserDialogComponent},
  {path: 'credit-dialog', component: CreditDialogComponent},
  {path: 'credit-dialog1', component: CreditDialog1Component},
  {path: 'insurance-dialog', component: InsuranceDialogComponent},
  {path: 'manager-dialog', component: ManagerDialogComponent},
  {path: 'manager-dialog1', component: ManagerDialog1Component},
  {path: 'manager-add-payment-dialog', component: ManagerAddPaymentDialogComponent},
  {path: 'manager-special-approval-dialog', component: ManagerSpecialApprovalDialogComponent},
  {path: 'm-s-a-add-payment-dialog', component: MSAAddPaymentDialogComponent},
  {path: 'account-dialog', component: AccountDialogComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // entryComponents: [UserComponent],
})
export class AppRoutingModule { }
