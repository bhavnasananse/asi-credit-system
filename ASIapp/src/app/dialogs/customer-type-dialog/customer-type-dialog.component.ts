import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogConfig, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { RespAck } from 'src/app/models/RespAck';
import { CommonService } from 'src/app/services/common.service';
import { CustomerType } from 'src/app/models/user';

@Component({
  selector: 'app-customer-type-dialog',
  templateUrl: './customer-type-dialog.component.html',
  styleUrls: ['./customer-type-dialog.component.css']
})
export class CustomerTypeDialogComponent implements OnInit {
  fgaddcustomer : FormGroup;
  cust: CustomerType;
  flag :boolean=true;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private cs: CommonService,@Inject(MAT_DIALOG_DATA) public data: any) {
    this.fgaddcustomer = this.fb.group({
      c_id:[''],
      c_type:['', Validators.required]
    })
   }

  ngOnInit() {
    // console.log(this.data['row']);
    if(this.data['action'] =='edit'){
      this.updatevalue();
      this.flag=false;
  }
}
  updatevalue(){
    this.cust = this.data['row'];      
    this.fgaddcustomer = this.fb.group({
      c_id:[this.data['row'].c_id],
      c_type:[this.data['row'].c_type]
    })
  }
  
  cancel(){
    this.dialog.closeAll();
  }
 save(){
  let obj= this.fgaddcustomer.value;       
       this.cs.add_customer(obj).subscribe((resp:RespAck)=>{
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
  // let c_type = this.fgaddcustomer.value.c_type;
  //     this.fgaddcustomer = this.fb.group({
  //     c_id:[this.data['row'].c_id],
  //     c_type:[c_type],
  //   })
    let obj = this.fgaddcustomer.value; 
      this.cs.update_customer_type(obj).subscribe((resp:RespAck)=>{
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

