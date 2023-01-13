import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MatDialog } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { CustomerTypeDialogComponent } from 'src/app/dialogs/customer-type-dialog/customer-type-dialog.component';
import { CustomerType } from 'src/app/models/user';
import { RespAck } from 'src/app/models/RespAck';

@Component({
  selector: 'app-customer-type',
  templateUrl: './customer-type.component.html',
  styleUrls: ['./customer-type.component.css']
})
export class CustomerTypeComponent implements OnInit {
  customers : CustomerType[];
  customer : CustomerType;

  displayedColumns: string[] = ['c_type', 'action'];
  dataSource: MatTableDataSource<CustomerType>

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private cs: CommonService, private dialog: MatDialog) { }

  ngOnInit() {
   this.reloadTable();
  }
  opendialog(row, action):void {
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = false;
    DialogConfig.autoFocus = true;
    DialogConfig.width = "40%";
    this.dialog.open(CustomerTypeDialogComponent,{
      data: ({row,action})
    })
  }

  reloadTable(){
    this.cs.get_customer_type().subscribe((customer:CustomerType[])=>{
      this.customers = customer;
      this.dataSource = new MatTableDataSource(this.customers);  
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  });

}
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
     }
}
delete(row){
  if(confirm('Are you sure you want to delete?'))
  this.cs.delete_customer_type(row.c_id).subscribe((resp:RespAck)=>{
    if(resp.ack){
          this.customers.splice(this.customers.indexOf(this.customer),1);
          this.cs.alert('success','deleted successfully');
          this.reloadTable();
    }else{
         this.cs.alert('error',resp.discription);
    }
  });
 }

}
