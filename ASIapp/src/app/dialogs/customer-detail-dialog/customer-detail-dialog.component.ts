import { Component, OnInit, Inject } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Customer, Credit } from 'src/app/models/user';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-detail-dialog',
  templateUrl: './customer-detail-dialog.component.html',
  styleUrls: ['./customer-detail-dialog.component.css']
})
export class CustomerDetailDialogComponent implements OnInit {
  obj: any;
  fg: FormGroup;
  constructor(private cs:CommonService, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data : any,private fb: FormBuilder ) { 
    this.fg = this.fb.group({
      cl_id:[this.data['row'].cl_id]
    })
  }

  ngOnInit() {
    // console.log(this.data['row'].cl_id);
    this.get_credit();
  }
  cancel(){
    this.dialog.closeAll();
  }
  get_credit(){
    let obj = this.fg.value
    this.cs.get_cust_details(obj).subscribe((resp: any)=>{
      this.obj = resp;
      // console.log(this.obj); 
    })
  }
}
