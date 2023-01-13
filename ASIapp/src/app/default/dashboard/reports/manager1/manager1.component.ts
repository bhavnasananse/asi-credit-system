import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Role } from 'src/app/models/user';
import { CommonService } from 'src/app/services/common.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';


@Component({
  selector: 'app-manager1',
  templateUrl: './manager1.component.html',
  styleUrls: ['./manager1.component.css']
})
export class Manager1Component implements OnInit {
  fgcust: FormGroup;
  manager: any[]

  displayedColumns: string[] = ['c_name', 'require_credit','approve_amount','balance_amount','due_date','advisor_name'];
  dataSource: MatTableDataSource<any>

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private fb: FormBuilder,private cs : CommonService) { 
    this.fgcust = this.fb.group({
      date1:[''],
      date2:[''],
      approver_name:['']      
    })
  }

  ngOnInit() {
    this.get_manager_list();
  }

  get_manager_list(){
    this.cs.get_advisor().subscribe((obj:any[])=>{      
      this.manager = obj
      console.log(this.manager)
    })
  }
  submit(){
    let obj = this.fgcust.value
    this.cs.get_manager_reports(obj).subscribe((resp: any)=>{
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

