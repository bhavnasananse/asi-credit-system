import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RespAck } from 'src/app/models/RespAck';
import { CommonService } from 'src/app/services/common.service';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-manager-dialog1',
  templateUrl: './manager-dialog1.component.html',
  styleUrls: ['./manager-dialog1.component.css']
})
export class ManagerDialog1Component implements OnInit {
  fgaddcredit: FormGroup;
  cust: any = [];  
  custs: any = [];
  advisor: any[];
  flag : boolean = true;
  constructor(private fb: FormBuilder, private cs : CommonService, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.fgaddcredit = this.fb.group({
    credit_id:[''],
    c_id:['',Validators.required],
    cl_id:['', Validators.required],
    car_no:['', Validators.required],
    require_credit:['', Validators.required],
    invoice_no:['', Validators.required],
    invoice_amount:['', Validators.required],
    approver_name:[''],
    due_date:['', Validators.required],
    comment:['']
  }) 
}

  ngOnInit() {
    this.putcust();
    this.putctype();
    this.advisor_list()
  }
  save(){
    let obj= this.fgaddcredit.value;       
    this.cs.add_credit(obj).subscribe((resp:RespAck)=>{
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
advisor_list(){
  this.cs.get_advisor().subscribe((obj:any[])=>{
    this.advisor = obj;
  console.log(this.advisor);
  })
}

}

