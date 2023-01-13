import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MatDialog } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { RespAck } from 'src/app/models/RespAck';
import { CreditDialogComponent } from 'src/app/dialogs/credit-dialog/credit-dialog.component';
import { Credit } from 'src/app/models/user';
import { FollowUpComponent } from '../follow-up/follow-up.component';
import { CreditDialog1Component } from 'src/app/dialogs/credit-dialog1/credit-dialog1.component';
import { MSAAddPaymentDialogComponent } from 'src/app/dialogs/m-s-a-add-payment-dialog/m-s-a-add-payment-dialog.component';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent implements OnInit {
  credits: Credit[];
  credit: Credit;
  state: string = 'default';
  obj: any[];
  displayedColumns: string[] = ['c_name','require_credit','approve_amount','balance_amount','due_date','advisor_name','comment','action'];
  dataSource: MatTableDataSource<Credit>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private cs : CommonService, private dialog: MatDialog) { }

  ngOnInit() {
    this.reloadTable();
  }
  opendialog(row,action):void {
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = false;
    DialogConfig.autoFocus = true;
    DialogConfig.width = "40%";
    this.dialog.open(CreditDialogComponent,{
      data: ({row,action})
    })
  }
  opendialog1(row):void {
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = false;
    DialogConfig.autoFocus = true;
    DialogConfig.width = "40%";
    this.dialog.open(CreditDialog1Component,{
      data: ({row})
    })
  }

  reloadTable(){
    this.state = 'default';
    this.cs.get_credit_list().subscribe((credit: Credit[])=>{
      this.credits = credit;
      this.dataSource = new MatTableDataSource(this.credits);
      // console.log(this.credits);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  
  delete(row){
    if(confirm('Are you sure you want to delete?'))
    this.cs.delete_credit(row.credit_id).subscribe((resp:RespAck)=>{
      if(resp.ack){
            this.credits.splice(this.credits.indexOf(this.credit),1);
            this.cs.alert('success','deleted successfully');
          this.reloadTable();
      }else{
           this.cs.alert('error',resp.discription);
      }
    });
   } 
   applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  get_reject_list(){
    this.state = 'reject';
    this.dataSource = null;
    this.cs.get_reject_list().subscribe((obj:any[])=>{
      this.obj = obj
      // console.log(this.obj);
      this.dataSource = new MatTableDataSource(this.obj);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  show_credit(){
    this.state='default';
    this.reloadTable();
  }
  show_approve(){
    this.state='approve';
    this.dataSource = null;
    this.cs.get_approved_list().subscribe((obj: any[])=>{
      this.obj = obj;
      this.dataSource = new MatTableDataSource(this.obj);
      // console.log(this.obj);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      })
    }
}
