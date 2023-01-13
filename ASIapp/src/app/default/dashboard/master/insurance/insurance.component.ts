import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MatDialog } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { RespAck } from 'src/app/models/RespAck';
import { Insurance } from 'src/app/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InsuranceDialogComponent } from 'src/app/dialogs/insurance-dialog/insurance-dialog.component';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {
  displayedColumns: string[] = ['company_name', 'action'];
  dataSource: MatTableDataSource<Insurance>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  insurances : Insurance[];
  insurance : Insurance;  
  constructor(private fb: FormBuilder, private dialog: MatDialog, private cs: CommonService) { 
   }

  ngOnInit() {
    this.reloadTable();     
  }
  reloadTable(){
    this.cs.get_insurance_company().subscribe((insurance:Insurance[])=>{
      this.insurances = insurance;
     this.dataSource = new MatTableDataSource(this.insurances);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;     
   })
  }
opendialog(row,action):void {
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = false;
    DialogConfig.autoFocus = true;
    DialogConfig.width = "40%";
    this.dialog.open(InsuranceDialogComponent,{
      data: ({row,action})
    })
  }

delete(row){
    this.cs.delete_insurance_company(row.i_id).subscribe((res:RespAck)=>{
    if(res.ack){
      this.insurances.splice(this.insurances.indexOf(this.insurance), 1);
      this.cs.alert('success', 'Record Deleted succesfully');
      this.reloadTable();
    }else{
      this.cs.alert('error', res.discription);
    }
  })
}
applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

}

