import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  

  user:any
  acno:any

  
//depositForm Model
  depositForm =this.fb.group({
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]]
  })
 
  
// withdrawForm Model
  withdrawForm =this.fb.group({
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]]
  })

loginDate:any

  constructor(private ds:DataService,private fb:FormBuilder, private router:Router) {
    this.user=this.ds.currentUser
    this.loginDate=new Date()
   }


   // constructor kazhinj next wrk avunnath
  ngOnInit(): void {
    if(!localStorage.getItem("currentAcno")){
      alert("Please Log In....")
      this.router.navigateByUrl("")
    }
  }

  deposit(){
    var acno = this.depositForm.value.acno
    var password = this.depositForm.value.password
    var amount= this.depositForm.value.amount
   if(this.depositForm.valid){
     //calling deposit in dataservice
    const result = this.ds.deposit(acno,password,amount)
    if(result){
      alert(amount + "successfully deposited.. And new balance is :" + result)
    }
     
   }else{
     alert("invalid Form")
   }
        
  

  }

  withdraw(){
    var acno = this.withdrawForm.value.acno
    var password = this.withdrawForm.value.password
    var amount= this.withdrawForm.value.amount
    if(this.withdrawForm.valid){
       //calling withdraw in dataservice
       const result = this.ds.withdraw(acno,password,amount)
       if(result){
         alert(amount + "successfully debitted.. And new balance is :" + result)
       }
    }
     
   
  }

  //deletefromParent()
  deletefromParent(){
    this.acno = JSON.parse(localStorage.getItem("currentAcno")||'')
  }

  //logout
  logout(){
    localStorage.removeItem("currentUser")
    localStorage.removeItem("currentAcno")
    this.router.navigateByUrl("")
  }

  //onCancel()
  onCancel(){
    this.acno=""
  }

  onDelete(event:any){
    alert("delete account "+event)
  }
 
}
