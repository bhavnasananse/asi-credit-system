import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { PaymentMode } from 'src/app/models/user';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrls: ['./account-dialog.component.css']
})
export class AccountDialogComponent implements OnInit {
  fgaccount : FormGroup;
  payments:PaymentMode[];
  constructor(private fb: FormBuilder, private cs: CommonService, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.fgaccount = this.fb.group({
      credit_id:[''],
      cl_id:[this.data['row'].c_name],
      balance_amount:[this.data['row'].balance_amount],
      pay_amount:[''],
      p_id:[''],
      resite_no:[''],
      date:[''],
      short_payment:[''],
      comment:[''],
    })
  }

  ngOnInit() {
    this.get_pay_mode();
  }
get_pay_mode(){
  this.cs.get_payment_mode().subscribe((payments:PaymentMode[])=>{
    this.payments = payments;
    console.log(this.payments);
  })
}
add_payment(){
  let obj = this.fgaccount.value
  this.cs.manager_add_payment(obj).subscribe((resp:any)=>{
    this.cs.alert('success','amount paid succesfully')
    console.log(resp);
  })
}
cancel(){
  this.dialog.closeAll()
}
}
