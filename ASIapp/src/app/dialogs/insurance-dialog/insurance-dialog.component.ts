import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { RespAck } from 'src/app/models/RespAck';
import { Insurance } from 'src/app/models/user';

@Component({
  selector: 'app-insurance-dialog',
  templateUrl: './insurance-dialog.component.html',
  styleUrls: ['./insurance-dialog.component.css']
})
export class InsuranceDialogComponent implements OnInit {
  fginsurance: FormGroup;
  state : string ='add_new';
  insurance: Insurance;
  flag: boolean=true;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private cs: CommonService ,@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.fginsurance = this.fb.group({
      company_name: ['', Validators.required],
      i_id: ['']
    })
  }

  ngOnInit() {
    if(this.data['action'] =='edit'){
      this.updateValue();
      this.flag=false;
    }  
  }
  
  updateValue(){
    this.insurance = this.data['row'];
    this.fginsurance = this.fb.group({
      company_name: [this.data['row'].company_name],
      i_id: [this.data['row'].i_id]
    });
  }
  
  save(){    
    let obj= this.fginsurance.value;  
    this.cs.add_insurance_company(obj).subscribe((resp:RespAck)=>{
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
  //   let insurance = this.fginsurance.value.company_name;
  //   this.fginsurance = this.fb.group({
  //   i_id:[this.data['row'].i_id],
  //   company_name:[insurance],
  // })
  let obj = this.fginsurance.value; 
    this.cs.update_insurance_company(obj).subscribe((resp:RespAck)=>{
          if(resp.ack){          
            this.cs.alert('success','Record Updated succesfully');
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
  
}
