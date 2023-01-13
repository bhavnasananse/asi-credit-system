import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-credit-expire',
  templateUrl: './credit-expire.component.html',
  styleUrls: ['./credit-expire.component.css']
})
export class CreditExpireComponent implements OnInit {
  fgcust: FormGroup;

  displayedColumns: string[] = ['c_name', 'require_credit','approve_amount','balance_amount','due_date','advisor_name'];
  dataSource: MatTableDataSource<any>
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(private fb: FormBuilder, private cs : CommonService) { 
    this.fgcust = this.fb.group({
      date1:[''],
      date2:[''],
      c_id:['']      
    })
  }
  ngOnInit() {
  }
submit(){
  let obj = this.fgcust.value
  this.cs.get_credit_expire_reports(obj).subscribe((resp:any)=>{
    console.log(resp);
    this.dataSource = new MatTableDataSource(resp);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  })
}
applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}
