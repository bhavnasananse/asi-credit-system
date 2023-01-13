import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RespAck } from 'src/app/models/RespAck';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  fglogin: FormGroup;
  constructor(private fb: FormBuilder, private cs:CommonService, private http:HttpClient, private router:Router) { 
    this.fglogin = this.fb.group({
      username:['',Validators.required],
      password:['',[Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {  
  }

  login(){
    this.cs.user_login(this.fglogin.value.username, this.fglogin.value.password).subscribe((user:User)=>{
      if(user.id != null){
        this.cs.alert('success','Sign Up Successfully');
        this.cs.setUser(user);
        // sessionStorage.setItem("user",JSON.stringify(user));
        this.router.navigate(['/dashboard']);
      }else{
        this.cs.alert('Error','Invalid Login Details');
      }
    });
  }
  

}
