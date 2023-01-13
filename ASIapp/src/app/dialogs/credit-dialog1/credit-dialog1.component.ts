import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { RespAck } from 'src/app/models/RespAck';
import { getLocaleDateTimeFormat } from '@angular/common';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-credit-dialog1',
  templateUrl: './credit-dialog1.component.html',
  styleUrls: ['./credit-dialog1.component.css'],
  providers:[DatePipe]
})
export class CreditDialog1Component implements OnInit {
  fgfollowup: FormGroup;
  time : any;
  constructor(public datepipe: DatePipe,private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private cs : CommonService) {
    this.fgfollowup = this.fb.group({
      f_id:[''],
      cl_id:[this.data['row'].cl_id],
      date:[''],
      time:[''],
      next_date:[''],
      comment:[''],
    })
   }

  ngOnInit() {    
   }

  getDatetime = function() {
    return (new Date);   
  }; 

cancel(){
  this.dialog.closeAll();
}
save(){
  let obj = this.fgfollowup.value;
  obj.date = this.datepipe.transform(obj.date, 'yyyy-dd-MM');
  obj.next_date = this.datepipe.transform(obj.next_date, 'yyyy-dd-MM');
  this.cs.add_followup(obj).subscribe((resp: RespAck)=>{
    if(resp.ack){
      this.cs.alert('success','Follow Up Inserted succesfully');
      this.dialog.closeAll();
    }else{
      this.cs.alert('error', resp.discription);
    }
  })
}
}
