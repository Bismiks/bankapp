import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentUser:any
  currentAcno:any

   //database
   database:any={
    1000:{acno:1000,uname:"Manu",password:1000,balance:5000,transaction:[]},
    1001:{acno:1001,uname:"Madhav",password:1001,balance:3000,transaction:[]},
    1002:{acno:1002,uname:"Rins",password:1002,balance:4000,transaction:[]},
  }

  constructor() { 
this.getDetails()
  }



  //to store data in local Storage
  saveDetails(){
    localStorage.setItem("database",JSON.stringify(this.database))
    if(this.currentAcno){
      localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
    }
    if(this.currentUser){
      localStorage.setItem("currentUser",JSON.stringify(this.currentUser))
    }
  } 


  // to get data from localstorage

  getDetails(){ 
    if(localStorage.getItem("database")){
      this.database = JSON.parse(localStorage.getItem("database")||'')
    }
    if(localStorage.getItem("currentAcno")){
      this.currentAcno = JSON.parse(localStorage.getItem("currentAcno")||'')
    }
    if(localStorage.getItem("currentUser")){
      this.currentUser = JSON.parse(localStorage.getItem("currentUser")||'')
    }
  }


  //register -RrgisterComponent will give uname,accno,pswd
  register(uname:any, acno:any, password:any){

    let database = this.database

    if(acno in database){
      //already exist acno
      return false

    }else{
      // add details into db
      database[acno]={
      
        acno,
        uname,
        password,
        balance:0,
        transaction:[]
      }
      console.log(database)
      this.saveDetails()
      return true
    }
  }

              // login

              login(acno:any,password:any){
                                                                                        
                // user entered acno and pswd
              
                let database = this.database
                if(acno in database){

                    if(password == database[acno]["password"]){  //already exist in db
                      this.currentUser = database[acno]["uname"]
                      this.currentAcno=acno
                      this.saveDetails()

                      // already exist in db
                    return true
                    }
                    else{
                        alert("incorrect passsword !!! ")
                        return false
                        }
                }
                else{
                alert("User does not exist!!! ")
                return false
                }
              }

              //deposit

              deposit(acno:any,password:any,amt:any){
                var amount = parseInt(amt)
                let database= this.database

               

                if(acno in database){
                        if(password==database[acno]["password"]){
                          database[acno]["balance"] +=amount
                          database[acno]["transaction"].push({
                            type:"CREDIT",
                            amount:amount
                          })
                          //console.log(database);
                          this.saveDetails()
                          return database[acno]["balance"]
                        }else{
                          alert("Incorrect  password !!!")
                          return false
                        }

                }       else{
                          alert("User does not exist !!!")
                          return false
                        }
              }


              // withdraw
              withdraw(acno:any,password:any,amt:any){
                var amount = parseInt(amt)
                let database= this.database

               

                if(acno in database){
                  if(password==database[acno]["password"]){
                    if(database[acno]["balance"]>amount){
                                database[acno]["balance"] -=amount
                                database[acno]["transaction"].push({
                                  type:"DEBIT",
                                  amount:amount
                                })
                                this.saveDetails()
                                return database[acno]["balance"]

                    }else{
                          alert("Insufficient Balance!!!")
                          return false
                          }
                      
                    }else{
                          alert("Incorrect  password !!!")
                          return false
                        }

                }else{
                          alert("User does not exist !!!")
                          return false
                        }
              }


              //transaction
              transaction(acno:any){
                return this.database[acno].transaction
              }
}



