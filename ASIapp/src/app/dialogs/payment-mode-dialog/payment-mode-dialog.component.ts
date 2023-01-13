import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogConfig, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { RespAck } from 'src/app/models/RespAck';
import { PaymentMode } from 'src/app/models/user';

@Component({
  selector: 'app-payment-mode-dialog',
  templateUrl: './payment-mode-dialog.component.html',
  styleUrls: ['./payment-mode-dialog.component.css']
})
export class PaymentModeDialogComponent implements OnInit {
  fgpayment : FormGroup;
  payment : PaymentMode;
  pay: any;
  flag: boolean = true;
  constructor(private cs: CommonService,private fb: FormBuilder , private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.fgpayment = this.fb.group({
      mode_name: ['', Validators.required],
      p_id : [''],
    })
   }
  
  ngOnInit() {
    if(this.data['action'] =='edit'){
      this.updatevalue();
      this.flag=false;
    } 
  }
  updatevalue(){
    this.payment = this.data['row'];      
    this.fgpayment = this.fb.group({
      mode_name: [this.data['row'].mode_name],
      p_id : [this.data['row'].p_id],
    })
  }

  save(){      
    let obj = this.fgpayment.value;       
    this.cs.add_payment_mode(obj).subscribe((resp:RespAck)=>{
    if(resp.ack){
         this.cs.alert('success','Record Inserted succesfully');
         this.dialog.closeAll();
         window.location.reload();
     }else{
     this.cs.alert('error', resp.discription);
    }
   })
  }

  cancel() {
    this.dialog.closeAll();
  }
  opendialog() {
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = true;
    DialogConfig.autoFocus = true;
    DialogConfig.width = "60%";
    this.dialog.open(PaymentModeDialogComponent)
  }
  update(){
    // let modes = this.fgpayment.value.mode;
    //   this.fgpayment = this.fb.group({
    //   p_id:[this.data['row'].p_id],
    //   mode_name:[modes],
    // })
    let obj = this.fgpayment.value;
    this.cs.update_payment_mode(obj).subscribe((resp: RespAck)=>{
      if(resp.ack){
        this.cs.alert('success','Record Updated succesfully');
        this.dialog.closeAll();
        window.location.reload();
      }else{
        this.cs.alert('error', resp.discription);
      }
      console.log(resp);
    });
  }
}

