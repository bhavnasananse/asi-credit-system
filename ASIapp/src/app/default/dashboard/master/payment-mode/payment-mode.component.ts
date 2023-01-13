import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { PaymentMode } from 'src/app/models/user';
import { PaymentModeDialogComponent } from 'src/app/dialogs/payment-mode-dialog/payment-mode-dialog.component';
import { RespAck } from 'src/app/models/RespAck';

@Component({
  selector: 'app-payment-mode',
  templateUrl: './payment-mode.component.html',
  styleUrls: ['./payment-mode.component.css']
})
export class PaymentModeComponent implements OnInit {
  payment : PaymentMode;
  payments : PaymentMode[];

  displayedColumns: string[] = ['mode_name', 'action'];
  dataSource: MatTableDataSource<PaymentMode>;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
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
    this.cs.get_payment_mode().subscribe((payments:PaymentMode[])=>{
      this.payments = payments;
      this.dataSource = new MatTableDataSource(this.payments);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  opendialog(row,action):void {
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = false;
    DialogConfig.autoFocus = true;
    DialogConfig.width = "40%";
    this.dialog.open(PaymentModeDialogComponent,{
      data: ({row,action})
    })
  }
  delete(row){
    if(confirm('Are you sure you want to delete?'))
    this.cs.delete_payment_mode(row.p_id).subscribe((resp:RespAck)=>{
      if(resp.ack){
            this.payments.splice(this.payments.indexOf(this.payment),1);
            this.cs.alert('success','deleted successfully');
            this.reloadTable();
      }else{
           this.cs.alert('error',resp.discription);
      }
    });
   }
}

