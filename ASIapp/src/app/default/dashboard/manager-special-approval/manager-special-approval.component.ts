import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { ManagerSpecialApprovalDialogComponent } from 'src/app/dialogs/manager-special-approval-dialog/manager-special-approval-dialog.component';
import { MSAAddPaymentDialogComponent} from 'src/app/dialogs/m-s-a-add-payment-dialog/m-s-a-add-payment-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-special-approval',
  templateUrl: './manager-special-approval.component.html',
  styleUrls: ['./manager-special-approval.component.css']
})
export class ManagerSpecialApprovalComponent implements OnInit {
  obj: any[];
  displayedColumns: string[] = ['c_name', 'require_credit','advisor_name','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(private cs: CommonService, private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
   this.reloadTable();
  }
  reloadTable(){
    this.cs.get_special_approval_list().subscribe((obj: any[])=>{
      this.obj = obj;  
      this.dataSource = new MatTableDataSource(this.obj);
      // console.log(this.obj);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  opendialog(){
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = false;
    DialogConfig.autoFocus = true;
    DialogConfig.width = "40%";
    this.dialog.open(ManagerSpecialApprovalDialogComponent)
  }
  opendialog1(row){
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = false;
    DialogConfig.autoFocus = true;
    DialogConfig.width = "40%";
    this.dialog.open(MSAAddPaymentDialogComponent,{
        data: ({row})
    })
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
}

approved(){
  this.router.navigate['/dashboard/manager'];
}
}
