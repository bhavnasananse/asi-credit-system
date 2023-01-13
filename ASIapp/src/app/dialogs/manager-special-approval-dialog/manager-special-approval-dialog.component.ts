import { Component, OnInit, Inject } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { RespAck } from 'src/app/models/RespAck';

@Component({
  selector: 'app-manager-special-approval-dialog',
  templateUrl: './manager-special-approval-dialog.component.html',
  styleUrls: ['./manager-special-approval-dialog.component.css']
})
export class ManagerSpecialApprovalDialogComponent implements OnInit {
  fgaddcredit: FormGroup;
  cust: any = [];  
  custs: any = [];
  flag : boolean = true;
  constructor(private fb: FormBuilder, private cs : CommonService, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.fgaddcredit = this.fb.group({
    s_id:[''],
    c_id:['',Validators.required],
    cl_id:['', Validators.required],
    car_no:['', Validators.required],
    require_credit:['', Validators.required],
    invoice_no:['', Validators.required],
    advisor_name:[''],
    comment:['']
  }) 
}
  ngOnInit() {
    this.putcust();
    this.putctype();
    
  }
  save(){
    let obj= this.fgaddcredit.value;  
    if(confirm('Your Credit Is Specially Approved!'))
    this.cs.add_special_approval(obj).subscribe((resp:RespAck)=>{
    if(resp.ack){
         this.cs.alert('success','record Inserted succesfully');
         this.dialog.closeAll();
         window.location.reload();
     }else{
     this.cs.alert('error', resp.discription);
    }
   })   
}
  
  cancel(){
    this.dialog.closeAll();
 }
 
putcust(){
this.cs.get_cname().subscribe((obj: any[])=>{
  this.cust = obj; 
  // console.log(this.cust);
})
}
putctype(){
this.cs.get_ctype().subscribe((obj:any[])=>{
  this.custs = obj;
  // console.log(this.custs);
})
}

}
