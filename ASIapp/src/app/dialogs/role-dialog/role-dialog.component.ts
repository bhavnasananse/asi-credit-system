import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogConfig, MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RespAck } from 'src/app/models/RespAck';
import { CommonService } from 'src/app/services/common.service';
import { Role } from 'src/app/models/user';


@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.css']
})
export class RoleDialogComponent implements OnInit {
  fgaddrole: FormGroup;  
  roles: Role[];
  role: Role;
  flag :boolean=true;
  
  constructor(private dialog: MatDialog, private fb:FormBuilder, private cs:CommonService,@Inject(MAT_DIALOG_DATA) public data: any) {
    this.fgaddrole = this.fb.group({
      r_id: [''],      
      role:['',Validators.required],          
    });
  }

  ngOnInit() {
    if(this.data['action'] =='edit'){
      this.updatevalue();
      this.flag=false;
  }
}
opendialog() {    
  const DialogConfig = new MatDialogConfig();
  DialogConfig.disableClose = true;
  DialogConfig.autoFocus = true;
  DialogConfig.width = "60%";
  this.dialog.open(RoleDialogComponent);
}
  updatevalue(){
    // this.role = this.data['row'];      
    this.fgaddrole = this.fb.group({
      r_id:[this.data['row'].r_id],
      role:[this.data['row'].role]
    })
  } 
 
  cancel(){
     this.dialog.closeAll();
  }
  save(){
       let obj= this.fgaddrole.value;       
       this.cs.add_role(obj).subscribe((resp:RespAck)=>{
       if(resp.ack){
            this.cs.alert('success','record Inserted succesfully');
              this.dialog.closeAll();
              window.location.reload();
        }else{
        this.cs.alert('error', resp.discription);
       }
      })   
  }       
  
 update(){  
    let obj = this.fgaddrole.value; 
      this.cs.update_role(obj).subscribe((resp:RespAck)=>{
            if(resp.ack){          
              this.cs.alert('success','Record Updated succesfully');
              this.dialog.closeAll();
              window.location.reload();
            }else{
              this.cs.alert('error', resp.discription);
            }        
          })
        }
 

       



}


