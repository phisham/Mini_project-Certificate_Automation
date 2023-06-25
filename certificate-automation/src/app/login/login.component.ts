import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  showError:any;
  constructor(private fb:FormBuilder,private router:Router,private http:HttpClient) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      employeeNo:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])
    })
  }

  login(){

    this.http.post('http://localhost:3000/login',this.loginForm.value).subscribe((data:any)=>{
      console.log(data);
      localStorage.setItem("userToken",data.token);
      switch(data.userType){
        case "student":{
          if(data.approved){
            this.router.navigateByUrl("/student");
          }
          else{
            this.router.navigateByUrl("/approval-failed");
          }
          break;
        }
        case "dean":{
          if(data.approved){
            this.router.navigateByUrl("/dean");
          }
          else{
            this.router.navigateByUrl("/approval-failed");
          }
          break;
        }
        case "principal":{

          this.router.navigateByUrl("/principal");

          break;
        }
        case "faculty":{
          if(data.approved){
            if(data.role==1){
              this.router.navigateByUrl("/hod");
            }
            else
              this.router.navigateByUrl("/staff-advisor");
          }
          else{
            this.router.navigateByUrl("/approval-failed");
          }
          

          break;
        }
      }
    },(err:any)=>{
      this.showError=true;
    })
  }
}
