import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {
  obj : any[];
  obj1 : any[];

  constructor(private cs: CommonService) { }

  ngOnInit() {
    this.total_credit();
    this.get_approver_report();
  }
  total_credit(){
    this.cs.get_total_credit().subscribe((obj: any[])=>{
      this.obj = obj;
    })
  }
  get_approver_report(){
    this.cs.get_approver_reports().subscribe((obj:any)=>{
      this.obj1 = obj;
      console.log(this.obj1)
    })
  }

}
