import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogConfig, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { RespAck } from 'src/app/models/RespAck';

@Component({
  selector: 'app-manager-dialog',
  templateUrl: './manager-dialog.component.html',
  styleUrls: ['./manager-dialog.component.css']
})
export class ManagerDialogComponent implements OnInit {
  flag : boolean = true;
  fgmanager: FormGroup;
  state : string = 'default';
  constructor(private cs: CommonService,private dialog: MatDialog, private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any) { 
      this.fgmanager = this.fb.group({
      credit_id:[''],
      require_credit:['',Validators.required],
      approve_amount:['',Validators.required],
      approver_comment:['']
    })
      
   }

  ngOnInit() {
    this.generate_random();     

    if(this.data['action'] =='approve'){
      this.acceptvalue();
      this.flag=false;
    }
  }
  cancel(){
    this.dialog.closeAll();
 }
 approve(){
  alert("your credit is succesfully approved!");
   let obj = this.fgmanager.value;
   this.cs.approve_credit(obj).subscribe((resp: RespAck)=>{
    if(resp.ack){
      this.cs.alert('success','Credit Approved');
  }else{
    this.cs.alert('error', resp.discription);
  }
   })
   this.cs.set_approve(obj).subscribe((resp: RespAck)=>{
    if(resp.ack){
     this.cs.alert('success','record Inserted succesfully');
     this.dialog.closeAll();
     window.location.reload();
    }else{
     this.cs.alert('error', resp.discription);
    }
  })
}

 acceptvalue(){
  this.fgmanager = this.fb.group({
    credit_id:[this.data['row'].credit_id],
    require_credit:[this.data['row'].require_credit],
    approve_amount:[this.data['row'].approve_amount],
    approver_comment:[this.data['row'].approver_comment]
  })
 }

generate_random(){
    var rn = require('random-number');
    var options = {
      min:  100
      ,max:  1000
      ,integer: true
      }
    rn(options)
    console.log(rn(options));
    return rn(options);
   }
}
