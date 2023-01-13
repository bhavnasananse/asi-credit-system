import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Credit } from 'src/app/models/user';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-credit-approval',
  templateUrl: './credit-approval.component.html',
  styleUrls: ['./credit-approval.component.css']
})
export class CreditApprovalComponent implements OnInit {
  obj: any[];
  state : string ='default'
  displayedColumns: string[] = ['c_name','gate_pass_id','approve_amount','due_date','advisor_name','approver_name','action'];
  dataSource: MatTableDataSource<Credit>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private cs : CommonService) { }

  ngOnInit() { 
    this.get_credit_approval();
  }

  get_credit_approval(){
    this.state ='default';
    this.cs.get_approved_list().subscribe((obj:any[])=>{
      this.obj = obj
      // console.log(this.obj);
      this.dataSource = new MatTableDataSource(this.obj);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  get_verified(){
    this.state ='!default';
    this.dataSource = null;

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
