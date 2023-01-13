import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';

import { AppRoutingModule } from './module/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './module/material.module';
import { HomeComponent } from './comps/home/home.component';
import { DashboardComponent } from './default/dashboard/dashboard.component';

import { MasterComponent } from './default/dashboard/master/master.component';
import { UserComponent } from './default/dashboard/master/user/user.component';
import { RoleComponent } from './default/dashboard/master/role/role.component';
import { CustomerTypeComponent } from './default/dashboard/master/customer-type/customer-type.component';
import { InsuranceComponent } from './default/dashboard/master/insurance/insurance.component';
import { CreditComponent } from './default/dashboard/credit/credit.component';
import { FollowUpComponent } from './default/dashboard/follow-up/follow-up.component';
import { ReportsComponent } from './default/dashboard/reports/reports.component';
import { ServiceAdvisorComponent } from './default/dashboard/reports/service-advisor/service-advisor.component';
import { ManagerComponent } from './default/dashboard/manager/manager.component';
import { CreditExpireComponent } from './default/dashboard/reports/credit-expire/credit-expire.component';
import { SpecialApprovalComponent } from './default/dashboard/reports/special-approval/special-approval.component';
import { TodaysCreditPayComponent } from './default/dashboard/reports/todays-credit-pay/todays-credit-pay.component';
import { CreditApprovalComponent } from './default/dashboard/credit-approval/credit-approval.component';
import { AccountsComponent } from './default/dashboard/accounts/accounts.component';
import { ManagerDashboardComponent } from './default/dashboard/manager-dashboard/manager-dashboard.component';
import { Manager1Component } from './default/dashboard/reports/manager1/manager1.component';
import { RoleDialogComponent } from './dialogs/role-dialog/role-dialog.component';
import { CustomerTypeDialogComponent } from './dialogs/customer-type-dialog/customer-type-dialog.component';
import { PaymentModeComponent } from './default/dashboard/master/payment-mode/payment-mode.component';
import { PaymentModeDialogComponent } from './dialogs/payment-mode-dialog/payment-mode-dialog.component';
import { CustomerdialogComponent } from './dialogs/customerdialog/customerdialog.component';
import { CustomerComponent } from './default/dashboard/customer/customer.component';
import { UserDialogComponent } from './dialogs/user-dialog/user-dialog.component';
import { Customer1Component } from './default/dashboard/reports/customer1/customer1.component';
import { CreditDialogComponent } from './dialogs/credit-dialog/credit-dialog.component';
import { InsuranceDialogComponent } from './dialogs/insurance-dialog/insurance-dialog.component';
import { CustomComponent } from './default/dashboard/custom/custom.component';
import { ManagerDialogComponent } from './dialogs/manager-dialog/manager-dialog.component';
import { ManagerDialog1Component } from './dialogs/manager-dialog1/manager-dialog1.component';
import { CreditDialog1Component } from './dialogs/credit-dialog1/credit-dialog1.component';
import { ManagerSpecialApprovalComponent } from './default/dashboard/manager-special-approval/manager-special-approval.component';
import { ManagerSpecialApprovalDialogComponent } from './dialogs/manager-special-approval-dialog/manager-special-approval-dialog.component';
import { MSAAddPaymentDialogComponent } from './dialogs/m-s-a-add-payment-dialog/m-s-a-add-payment-dialog.component';
import { AccountDialogComponent } from './dialogs/account-dialog/account-dialog.component';
import { ManagerAddPaymentDialogComponent } from './dialogs/manager-add-payment-dialog/manager-add-payment-dialog.component';
import { CustomerDetailDialogComponent } from './dialogs/customer-detail-dialog/customer-detail-dialog.component';
import { PendingComponent } from './default/dashboard/pending/pending.component';
import { DatePipe } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    MasterComponent,
    UserComponent,
    RoleComponent,
    CustomerTypeComponent,
    InsuranceComponent,    
    CreditComponent,
    FollowUpComponent,
    ReportsComponent,
    ServiceAdvisorComponent,
    ManagerComponent,
    CreditExpireComponent,
    SpecialApprovalComponent,
    TodaysCreditPayComponent,
    CreditApprovalComponent,
    AccountsComponent,
    ManagerDashboardComponent,
    Manager1Component,
    RoleDialogComponent,
    CustomerTypeDialogComponent,
    PaymentModeComponent,
    PaymentModeDialogComponent,
    CustomerdialogComponent,
    CustomerComponent,
    UserDialogComponent,
    Customer1Component,
    CreditDialogComponent,
    InsuranceDialogComponent,
    CustomComponent,
    ManagerDialogComponent,
    ManagerDialog1Component,
    CreditDialog1Component,
    ManagerSpecialApprovalComponent,
    ManagerSpecialApprovalDialogComponent,
    MSAAddPaymentDialogComponent,
    AccountDialogComponent,
    ManagerAddPaymentDialogComponent,
    CustomerDetailDialogComponent,
    PendingComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent] 
})
export class AppModule { }
