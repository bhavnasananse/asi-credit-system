import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { RespAck } from 'src/app/models/RespAck';
import { Router } from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { User1, Role } from 'src/app/models/user';
import { UserDialogComponent } from 'src/app/dialogs/user-dialog/user-dialog.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User1[];
  user : User1;
  displayedColumns: string[] = ['firstname','lastname','username','role','credit','action'];
  dataSource :MatTableDataSource<User1>
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
 
   constructor(private cs:CommonService, private router:Router,private dialog:MatDialog) {
  }

  ngOnInit() {  
    this.reloadTable();
}
opendialog(row ,action): void{
  const DialogConfig = new MatDialogConfig();
  DialogConfig.disableClose = true;
  DialogConfig.autoFocus = true;
  DialogConfig.width = "60%";
  this.dialog.open(UserDialogComponent, {
    data: ({row,action})
  })  
}

reloadTable(){
  this.cs.get_users().subscribe((obj:User1[])=>{
    this.users = obj;
    // console.log(this.users);
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;   
  });
}

applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
}

delete(row){
  if(confirm('Are you sure you want to delete?'))
  this.cs.delete_user(row.id).subscribe((resp:RespAck)=>{
    if(resp.ack){
          this.users.splice(this.users.indexOf(this.user),1);
          this.cs.alert('success','Record deleted successfully');
          this.reloadTable();
    }else{
         this.cs.alert('error',resp.discription);
    }
  });
 }


}




