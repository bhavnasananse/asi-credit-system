import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.css']
})
export class CustomComponent implements OnInit {
  obj : any[];
  displayedColumns: string[] = ['c_name', 'pay_amount','approve_amount', 'balance_amount', 'advisor_name','approver_name'];
  dataSource: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
 
  constructor(private cs: CommonService) { }

  ngOnInit() {
    this.reloadTable();
    this.total_credit();

  }
  reloadTable(){
    this.cs.get_credit_details().subscribe((obj:any[])=>{
      this.obj = obj;
      this.dataSource = new MatTableDataSource(this.obj);
      // console.log(this.obj);
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

total_credit(){
  this.cs.get_total_credit().subscribe((obj: any[])=>{
    this.obj = obj;
    // console.log(this.obj[0].total);
  })
}

}
