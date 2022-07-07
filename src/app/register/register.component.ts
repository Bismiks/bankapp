import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 


  // registerForm Model
  registerForm =this.fb.group({
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]]
  })

  constructor(private db:DataService,private router:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  register(){
   
    var acno =this.registerForm.value.acno
    var password = this.registerForm.value.password
    var uname = this.registerForm.value.uname
    if(this.registerForm.valid){
      
          const result = this.db.register(uname, acno, password)
          if(result)
          {
            alert("Successfully registered")
            this.router.navigateByUrl("")
          }else{
            alert("account already exist.. Please Log In")
          }
    }else{
      alert("Invalid Form!!!")
    }
   
  }

}
