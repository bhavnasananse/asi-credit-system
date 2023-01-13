import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MatDialog } from '@angular/material';
import { AccountDialogComponent } from 'src/app/dialogs/account-dialog/account-dialog.component';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  obj : any[];
  state: string ='complete';
  displayedColumns: string[] = ['c_name','approve_amount','balance_amount','advisor_name','invoice_no','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  constructor(private dialog: MatDialog, private cs : CommonService) { }

  ngOnInit() {
   this.pending(); 
  }
reloadTable(){
  this.state ='complete';
  this.cs.get_payment_status().subscribe((obj:any[])=>{
    this.obj = obj;
    // console.log(this.obj);
      this.dataSource = new MatTableDataSource(this.obj);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  })
}
  opendialog(row): void{
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = false;
    DialogConfig.autoFocus = true;
    DialogConfig.width = "40%";
    this.dialog.open(AccountDialogComponent,{
      data: ({row})
    })
  }
  pending(){
    this.state = 'pending';
    this.dataSource = null;
    this.cs.get_pending_list().subscribe((obj:any[])=>{
      this.obj = obj;
      // console.log(this.obj);
        this.dataSource = new MatTableDataSource(this.obj);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    })
  }
  completed(){
    this.state ='complete';
    this.reloadTable();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
