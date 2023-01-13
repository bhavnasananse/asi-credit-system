import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-service-advisor',
  templateUrl: './service-advisor.component.html',
  styleUrls: ['./service-advisor.component.css'],
  providers:[DatePipe]
})
export class ServiceAdvisorComponent implements OnInit {
  service_advisor: any[]
  fgcust: FormGroup;
  manager: any[]

  displayedColumns: string[] = ['c_name', 'require_credit','approve_amount','balance_amount','due_date','advisor_name'];
  dataSource: MatTableDataSource<any>

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(public datepipe: DatePipe,private fb: FormBuilder,private cs : CommonService) { 
    this.fgcust = this.fb.group({
      date1:[''],
      date2:[''],
      approver_name:[''],
      c_id:[''],
      val:['']      
    })
  }

  ngOnInit() {
    this.get_manager_list();
  }
  // get_manager_list(){
  //   this.cs.get_advisor_list().subscribe((obj:any[])=>{      
  //     this.service_advisor = obj
  //     console.log(this.service_advisor)
  //   })
  // }
  get_manager_list(){
    this.cs.get_advisor().subscribe((obj:any[])=>{      
      this.manager = obj
      console.log(this.manager)
    })
  }
  submit(){
    let obj = this.fgcust.value
    obj.date1 = this.datepipe.transform(obj.date1, 'yyyy-dd-MM');   
    obj.date2 = this.datepipe.transform(obj.date2, 'yyyy-dd-MM');
    if(this.fgcust.value.val == 1){
    this.cs.get_approver_credit_report(obj).subscribe((resp:any)=>{
      console.log(resp);
      this.dataSource = new MatTableDataSource(resp)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }else if(this.fgcust.value.val == 2){
    this.cs.get_approver_outstanding_report(obj).subscribe((resp:any)=>{
      console.log(resp);
      this.dataSource = new MatTableDataSource(resp)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }else if(this.fgcust.value.val == 3){
    this.cs.get_approver_recovery_report(obj).subscribe((resp:any)=>{
      console.log(resp);
      this.dataSource = new MatTableDataSource(resp)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
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
