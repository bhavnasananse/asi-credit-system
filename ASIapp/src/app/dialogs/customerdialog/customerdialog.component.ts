import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogConfig, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { RespAck } from 'src/app/models/RespAck';
import { CommonService } from 'src/app/services/common.service';
import { Customer } from 'src/app/models/user';

@Component({
  selector: 'app-customerdialog',
  templateUrl: './customerdialog.component.html',
  styleUrls: ['./customerdialog.component.css']
})
export class CustomerdialogComponent implements OnInit {
  fgcustomer: FormGroup; 
  // customers: Customer[];
  // customer: Customer;
  custs: any = [];

  flag: boolean =true;
  constructor(private fb: FormBuilder,private cs: CommonService, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.fgcustomer = this.fb.group({
      cl_id:[''],
      c_id:['',Validators.required],
      c_name: ['',Validators.required],
      car_no:['',Validators.required],
      contact_no:['',[Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      contact_person:['',Validators.required],
      contact_person_no:['',[Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      location:['',Validators.required],
      GSTN:['',Validators.required],
      credit_amount:['',Validators.required],
      credit_days:['',Validators.required],
      comment:['']
    })
   }

  ngOnInit() {
    this.putctype();
    if(this.data['action'] =='edit'){
      this.updatevalue();
      this.flag=false;
    } 
  }
  putctype(){
    this.cs.get_ctype().subscribe((obj:any[])=>{
      this.custs = obj;
      console.log(this.custs);
    })
  }
  updatevalue(){
    this.fgcustomer = this.fb.group({
      cl_id:[this.data['row'].cl_id],
      c_id:[this.data['row'].c_id],
      c_name: [this.data['row'].c_name],
      car_no:[this.data['row'].car_no],
      contact_no:[this.data['row'].contact_no],
      contact_person:[this.data['row'].contact_person],
      contact_person_no:[this.data['row'].contact_person_no],
      location:[this.data['row'].location],
      GSTN:[this.data['row'].GSTN],
      credit_amount:[this.data['row'].credit_amount],
      credit_days:[this.data['row'].credit_days],
      comment:[this.data['row'].comment]
    })
  }
  cancel(){
    this.dialog.closeAll();
  }
  save(){
       let obj= this.fgcustomer.value;       
       this.cs.add_customer_list(obj).subscribe((resp:RespAck)=>{
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
    // let cust =  this.fgcustomer.value;
    // this.fgcustomer = this.fb.group({
    //   cl_id:[this.data['row'].cl_id],
    //   c_id:[cust.c_id],
    //   c_name: [cust.c_name],
    //   car_no:[cust.car_no],
    //   contact_no:[cust.contact_no],
    //   contact_person:[cust.contact_person],
    //   contact_person_no:[cust.contact_person_no],
    //   location:[cust.location],
    //   GSTN:[cust.GSTN],
    //   credit_amount:[cust.credit_amount],
    //   credit_days:[cust.credit_days],
    //   comment:[cust.comment]
    // })
    let obj = this.fgcustomer.value;
    this.cs.update_customer_list(obj).subscribe((resp:RespAck)=>{
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
