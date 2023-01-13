import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-manager-add-payment-dialog',
  templateUrl: './manager-add-payment-dialog.component.html',
  styleUrls: ['./manager-add-payment-dialog.component.css']
})
export class ManagerAddPaymentDialogComponent implements OnInit {
  fgadd_payment: FormGroup;
  obj : any[];
  constructor(private fb: FormBuilder, private cs : CommonService, @Inject(MAT_DIALOG_DATA) private data: any, private dialog: MatDialog) {
    this.fgadd_payment = this.fb.group({
      credit_id:[this.data['row'].credit_id],
      cl_id:[''],
      pay_amount:[''],   
      c_name:[this.data['row'].c_name],
      advisor_comment:['']
    })
   }

  ngOnInit() {  
    
  } 

  add_payment(){
    let obj = this.fgadd_payment.value;
    this.cs.manager_add_payment(obj).subscribe((resp:any)=>{    
      this.cs.alert('success','amount paid succesfully');
      this.dialog.closeAll();
      window.location.reload();
    })  
  }

  cancel(){
    this.dialog.closeAll();
  }
}
