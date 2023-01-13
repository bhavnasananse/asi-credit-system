import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { RoleDialogComponent } from 'src/app/dialogs/role-dialog/role-dialog.component';
import { RespAck } from 'src/app/models/RespAck';
import { Role } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})

export class RoleComponent implements OnInit {
  roles : Role[];
  role : Role;

  displayedColumns: string[] = ['role', 'action'];
  dataSource: MatTableDataSource<Role>

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;  

  constructor(private router:Router , private cs: CommonService , private dialog: MatDialog ) {      
 }

  ngOnInit() {
    this.reloadTable();
}
opendialog(row, action):void {
  const DialogConfig = new MatDialogConfig();
  DialogConfig.disableClose = false;
  DialogConfig.autoFocus = true;
  DialogConfig.width = "40%";
  this.dialog.open(RoleDialogComponent,{
    data: ({row,action})
  })
}
reloadTable(){
  this.cs.get_role().subscribe((roles:Role[])=>{
    this.roles = roles;
    // console.log(this.roles);
    this.dataSource = new MatTableDataSource(this.roles);      
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });
}

delete(row){
  if(confirm('Are you sure you want to delete?'))
  this.cs.delete_role(row.r_id).subscribe((resp:RespAck)=>{
    if(resp.ack){
          this.roles.splice(this.roles.indexOf(this.role),1);
          this.cs.alert('success','deleted successfully');
        this.reloadTable();
    }else{
         this.cs.alert('error',resp.discription);
    }
  });
 }

 applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
} 



