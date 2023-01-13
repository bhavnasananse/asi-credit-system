import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router,ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {
  displayedColumns: string[] = ['c_name', 'require_credit','advisor_name','approver_name'];
  dataSource: MatTableDataSource<any>
  id:any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private router: Router,private route: ActivatedRoute, private cs : CommonService) {
    this.id = route.snapshot.params.id;
      console.log(this.id);
   }

  ngOnInit() {
    if(this.id != null){
      this.cs.get_pending_report(this.id).subscribe((resp:any)=>{
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
