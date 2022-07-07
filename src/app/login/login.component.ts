import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
//varable declaration bfr constr
   
print="hello welcome"

accnm="Account number please!!!"


//loginForm Model
loginForm =this.fb.group({
  acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]]
})
 
  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { } //dependency injection for data sharing

  ngOnInit(): void {
  }

  

  //login using event binding/ two way binding
   login(){
                                                                            
         // user entered acno and pswd
        var acno = this.loginForm.value.acno
        var password = this.loginForm.value.password
      
if(this.loginForm.valid){
  //call login in dataService
  const result = this.ds.login(acno,password)
  if(result){

     alert("Login successfull!!! ")
     this.router.navigateByUrl("home")
    }
  
}else
{
  alert("Invalid Form!!!")
}
       

       
     }
 
}

// "this" indicate - class details point cheyyan  - call by reference