import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { Credit } from 'src/app/models/user';
import { ManagerDialogComponent } from 'src/app/dialogs/manager-dialog/manager-dialog.component';
import { ManagerDialog1Component } from 'src/app/dialogs/manager-dialog1/manager-dialog1.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RespAck } from 'src/app/models/RespAck';
import { MSAAddPaymentDialogComponent } from 'src/app/dialogs/m-s-a-add-payment-dialog/m-s-a-add-payment-dialog.component';
import { ManagerSpecialApprovalDialogComponent } from 'src/app/dialogs/manager-special-approval-dialog/manager-special-approval-dialog.component';
import { ManagerAddPaymentDialogComponent } from 'src/app/dialogs/manager-add-payment-dialog/manager-add-payment-dialog.component';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  state : string = 'default';
  obj: any[];
  fgaddcredit: FormGroup;
  displayedColumns: string[] = ['c_name', 'require_credit','approve_amount', 'balance_amount', 'advisor_name','advisor_comment','approver_name','comment','action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
 
  constructor(private cs : CommonService, private dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit() {
    this.reloadTable();

  }
  reloadTable(){
    this.cs.get_credit_list().subscribe((obj:any)=>{
      this.obj = obj;
      this.dataSource = new MatTableDataSource(this.obj);
      // console.log(this.obj);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  opendialog(row,action):void {
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = false;
    DialogConfig.autoFocus = true;
    DialogConfig.width = "40%";
    this.dialog.open(ManagerDialogComponent,{
      data: ({row,action})
    })
  }
  opendialog1(){
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = false;
    DialogConfig.autoFocus = true;
    DialogConfig.width = "40%";
    this.dialog.open(ManagerDialog1Component)
  }
  opendialog2(row){
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = false;
    DialogConfig.autoFocus = true;
    DialogConfig.width = "40%";
    this.dialog.open(ManagerAddPaymentDialogComponent ,{
      data: ({row})
    })
  } 
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
}

reject(row){
  this.fgaddcredit = this.fb.group({
    credit_id: [row.credit_id],
  })
  let obj = this.fgaddcredit.value;
  this.cs.set_reject(obj).subscribe((resp:RespAck)=>{
    if(resp.ack){
      this.cs.alert('','');
      this.reloadTable();
    }else{
      this.cs.alert('error',resp.discription);
      }
    })
  }
approved(){
  this.state= 'approve';
  this.dataSource = null;
  this.cs.get_approved_list().subscribe((obj: any[])=>{
    this.obj = obj;
    this.dataSource = new MatTableDataSource(this.obj);
    // console.log(this.obj);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  })
}
  approval(){
    this.state='default';
    this.reloadTable();
  }
  forword(row){
    console.log(row);
  }
  
}
