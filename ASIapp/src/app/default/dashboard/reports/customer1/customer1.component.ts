import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-customer1',
  templateUrl: './customer1.component.html',
  styleUrls: ['./customer1.component.css']
})
export class Customer1Component implements OnInit {
  fgcust: FormGroup;
 
  displayedColumns: string[] = ['c_name', 'require_credit','approve_amount','balance_amount','due_date','advisor_name'];
  dataSource: MatTableDataSource<any>

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private fb: FormBuilder, private cs: CommonService) { 
    this.fgcust = this.fb.group({
      date1:[''],
      date2:[''],
      c_id:[''],
      val:['']      
    })
  }

  ngOnInit() {
    
  }
  submit(){
   let obj = this.fgcust.value
    if(this.fgcust.value.val == 1){
      this.cs.get_list(obj).subscribe((obj:any)=>{
        console.log(obj);
        this.dataSource = new MatTableDataSource(obj);      
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    }else if(this.fgcust.value.val == 2){
      this.cs.get_outstanding_list(obj).subscribe((resp:any)=>{
        console.log(resp);
        this.dataSource = new MatTableDataSource(resp);      
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    }else if(this.fgcust.value.val == 3){
      this.cs.get_recovery_list(obj).subscribe((resp:any)=>{
        console.log(resp);
        this.dataSource = new MatTableDataSource(resp);      
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    }    
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
