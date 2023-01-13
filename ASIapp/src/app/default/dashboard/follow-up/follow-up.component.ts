import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import{CreditComponent} from '../credit/credit.component';
import { from } from 'rxjs';
import { MAT_DIALOG_DATA, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.css']
})
export class FollowUpComponent implements OnInit {
  followup : any[];
  state : string = 'default';
  displayedColumns: string[] = ['c_name','date','comment','next_date'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  constructor(private cs : CommonService) { }

  ngOnInit() {
    this.reloadTable();
  }
  reloadTable(){
    this.state = 'default';
    this.cs.todays_followup().subscribe((obj: any[])=>{
      this.followup = obj;
      this.dataSource = new MatTableDataSource(this.followup);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    
  }
  follow_up(){
    this.state = '!default';
    this.dataSource = null;
    this.cs.get_followup().subscribe((obj: any[])=>{
      this.followup = obj;
      this.dataSource = new MatTableDataSource(this.followup);
      // console.log(this.followup);
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
