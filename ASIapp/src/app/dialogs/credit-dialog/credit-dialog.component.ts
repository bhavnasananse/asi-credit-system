import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogConfig, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RespAck } from 'src/app/models/RespAck';
import { CustomerType, Customer } from 'src/app/models/user';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-credit-dialog',
  templateUrl: './credit-dialog.component.html',
  styleUrls: ['./credit-dialog.component.css'],
  providers:[DatePipe]

})

export class CreditDialogComponent implements OnInit {
  fgCredit : FormGroup;
  cust: any = [];  
  custs: any = [];
  customer: any;
  advisor: any[];
  flag :boolean=true;  
  constructor(public datepipe: DatePipe,private fb: FormBuilder,private cs: CommonService, private dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.fgCredit = this.fb.group({
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
    this.advisor_list();
    if(this.data['action'] =='edit'){
      this.updatevalue();
      this.flag=false;
    }  
  }
  updatevalue(){
    this.customer = this.data['row'];      
    this.fgCredit = this.fb.group({
      credit_id:[this.data['row'].credit_id],
      c_id:[this.data['row'].c_id],
      cl_id:[this.data['row'].cl_id],
      car_no:[this.data['row'].car_no],
      require_credit:[this.data['row'].require_credit],
      invoice_no:[this.data['row'].invoice_no],
      invoice_amount:[this.data['row'].invoice_amount],
      approver_name:[this.data['row'].approver_name],
      due_date:[this.data['row'].due_date],
      comment:[this.data['row'].comment]
    })
  }
  putcust(){
  this.cs.get_cname().subscribe((obj: any[])=>{
    this.cust = obj; 
  })
}
putctype(){
  this.cs.get_ctype().subscribe((obj:any[])=>{
    this.custs = obj;
    console.log(this.custs);
  })
}
advisor_list(){
  this.cs.get_advisor().subscribe((obj:any[])=>{
    this.advisor = obj;
  console.log(this.advisor);
  })
}  
  cancel(){
     this.dialog.closeAll();
  }
  
  save(){
    let obj= this.fgCredit.value
    obj.due_date = this.datepipe.transform(obj.due_date, 'yyyy-dd-MM');    
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
  
  update(){
    // let credit = this.fgCredit.value;
    //     this.fgCredit = this.fb.group({
    //       credit_id:[this.data['row'].credit_id],
    //       c_id:[credit.c_id],
    //       cl_id:[credit.cl_id],
    //       car_no:[credit.car_no],
    //       require_credit:[credit.require_credit],
    //       invoice_no:[credit.invoice_no],
    //       invoice_amount:[credit.invoice_amount],
    //       approver_name:[credit.approver_name],
    //       due_date:[credit.due_date],
    //       comment:[credit.comment]
    //   })
        let obj = this.fgCredit.value; 
          this.cs.update_credit(obj).subscribe((resp:RespAck)=>{
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
