import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { RespAck } from 'src/app/models/RespAck';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-m-s-a-add-payment-dialog',
  templateUrl: './m-s-a-add-payment-dialog.component.html',
  styleUrls: ['./m-s-a-add-payment-dialog.component.css']
})
export class MSAAddPaymentDialogComponent implements OnInit {
  fgadd_payment: FormGroup;
  obj : any[];
  constructor(private fb: FormBuilder, private cs : CommonService, @Inject(MAT_DIALOG_DATA) private data: any, private dialog: MatDialog) {
    this.fgadd_payment = this.fb.group({
      s_id:[this.data['row'].s_id],
      cl_id:[''],
      pay_amount:[''],   
      c_name:[this.data['row'].c_name],
      // advisor_comment:['']
    })
   }

  ngOnInit() {
    console.log(this.data['row']);
  }

  // save(){
  //   let obj = this.fgadd_payment.value;
  //   this.cs.add_payment(obj).subscribe((resp:RespAck)=>{
  //     if(resp.ack){
  //       this.cs.alert('success','amount paid succesfully');
  //       this.dialog.closeAll();
  //       window.location.reload();
  //     }else{
  //       this.cs.alert('error', resp.discription);
  //     }
  //   })
  // }

  add_payment(){
    let obj = this.fgadd_payment.value;
    this.cs.add_payment(obj).subscribe((resp:any)=>{    
      this.cs.alert('success','amount paid succesfully');
      this.dialog.closeAll();
      window.location.reload();
      // console.log(resp);           
    })
  }
  cancel(){
    this.dialog.closeAll();
  }
}
