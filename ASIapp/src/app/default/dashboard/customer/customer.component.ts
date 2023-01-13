import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { RespAck } from 'src/app/models/RespAck';
import { Customer } from 'src/app/models/user';
import { CustomerdialogComponent } from 'src/app/dialogs/customerdialog/customerdialog.component';
import { CustomerDetailDialogComponent } from 'src/app/dialogs/customer-detail-dialog/customer-detail-dialog.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers: Customer[];
  customer : Customer;
  state: string ='default';
  obj: any[];
  displayedColumns: string[] = ['c_name', 'credit_amount', 'credit_days', 'car_no', 'contact_no','action'];
  dataSource: MatTableDataSource<Customer> 
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private cs: CommonService, private dialog: MatDialog) { }

  ngOnInit() {
    this.reloadTable();     
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  reloadTable(){
    this.cs.get_customer_list().subscribe((customers: Customer[])=>{
    this.customers = customers;    
    this.dataSource = new MatTableDataSource(this.customers);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;       
  })
}
  default(){
    this.state = 'default';
    this.reloadTable();
  }

default1(){
  this.state ='!default';
  this.dataSource = null;
  this.cs.get_default_list().subscribe((obj:any[])=>{
    this.obj = obj;
    this.dataSource = new MatTableDataSource(this.obj);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
  
  })    
}

  opendialog(row,action):void {
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = false;
    DialogConfig.autoFocus = true;
    DialogConfig.width = "40%";
    this.dialog.open(CustomerdialogComponent,{
      data: ({row ,action})
    })
  }

  opendialog1(row):void {
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = false;
    DialogConfig.autoFocus = true;
    DialogConfig.width = "40%";
    this.dialog.open(CustomerDetailDialogComponent,{
      data: ({row})
    })
  }
  
  delete(row){
    if(confirm('Are you sure you want to delete?'))
    this.cs.delete_customer_list(row.cl_id).subscribe((resp:RespAck)=>{
      if(resp.ack){
        this.customers.splice(this.customers.indexOf(this.customer),1);
        this.cs.alert('success','record Deleted succesfully');
        window.location.reload();
        this.ngOnInit();
      }else{
        this.cs.alert('error', resp.discription);
      }
    })
  }
  set_default(row){
    let obj = row;
    this.cs.set_default(obj).subscribe((resp:RespAck)=>{
      if(resp.ack){
        this.cs.alert('success','Set Default Succesfully');
        window.location.reload();
      }else{
        this.cs.alert('error',resp.discription);
      }
    })
  }

  set_non_default(row){
    let obj = row;
    this.cs.set_non_default(obj).subscribe((resp:RespAck)=>{
      if(resp.ack){
        this.cs.alert('success','Set As Non Default Succesfully');
        window.location.reload();
      }else{
        this.cs.alert('error',resp.discription);
      }
    }) 
  }
  
}
