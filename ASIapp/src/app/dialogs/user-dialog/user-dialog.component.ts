import { Component, OnInit, Inject } from '@angular/core';
import { RespAck } from 'src/app/models/RespAck';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { User1, Role } from 'src/app/models/user';
import { MatchRevealedValidator } from 'src/app/models/MyValidations';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {
  fgadd:FormGroup;
  user: User1;
  roles: Role[];
  flag :boolean=true;
  
  constructor(private cs:CommonService, private fb:FormBuilder, private router:Router, private dialog:MatDialog, @Inject(MAT_DIALOG_DATA) public data:any) {
    this.fgadd = this.fb.group({
      id :[''],
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      r_id:['',Validators.required],
      credit:['',Validators.required],
      username:['',Validators.required],    
      password:['',[Validators.required, Validators.minLength(6)]],
      cpassword:['',[Validators.required]]
    },{validators:MatchRevealedValidator});    
  }
  ngOnInit() {
    this.putroles();
  if(this.data['action'] =='edit'){
    this.updatevalue();
    this.flag=false;
  }  
}

updatevalue(){
  this.user = this.data['row'];      
  this.fgadd = this.fb.group({
    id:[this.data['row'].id],
    firstname:[this.data['row'].firstname],
    lastname:[this.data['row'].lastname],
    r_id:[this.data['row'].r_id],
    role:[this.data['row'].role],
    credit:[this.data['row'].credit],
    username:[this.data['row'].username],    
    password:[this.data['row'].password],
    cpassword:[this.data['row'].password]
  });
}
  
  putroles(){
    this.cs.putroles().subscribe((roles:Role[])=>{
      this.roles= roles;
      console.log(this.roles);
    })
  }
  save(){
     let obj = this.fgadd.value;
    //  delete obj.cpassword;
       this.cs.save_user(obj).subscribe((resp:RespAck)=>{
       if(resp.ack){
            this.cs.alert('success','record Inserted succesfully');
            this.dialog.closeAll();
            window.location.reload();
        }else{
        this.cs.alert('error', resp.discription);
       }
      })
}
  cancel()
  {
     this.dialog.closeAll();
  }
  update(){
      let obj = this.fgadd.value; 
        this.cs.update_user(obj).subscribe((resp:RespAck)=>{
              if(resp.ack){          
                this.cs.alert('success','Record Updated succesfully');
                this.dialog.closeAll();
                window.location.reload();
              }else{
                this.cs.alert('error', resp.discription);
              }        
            })
          }
  // roles : Role[] = [
  //   {r_id:1, role: 'Admin'},
  //   {r_id:3, role: 'Manager'},
  //   {r_id:4,role:'Service-Advisor'},
  //   {r_id:5,role:'Body & Paint'}, 
  //   {r_id:6,role:'Account'},
  //   {r_id:7,role:'EDP'},
  //   {r_id:8,role:'Demo'},
  // ]        
  

}
  

