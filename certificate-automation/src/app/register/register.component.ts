import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!:FormGroup;
  programs=['B.Tech','M.Tech'];
  semesters=['S1','S2','S3','S4','S5','S6','S7','S8'];
  branches=['CSE','Mechanical','EEE','Civil','EC'];
  userTypes=['Student','Faculty','HOD','Dean','Principal'];
  showError=false;
  constructor(private fb:FormBuilder,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.registerForm=this.fb.group({
      admissionNo:new FormControl('',Validators.required),
      password:new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
      name: new FormControl('',Validators.required),
      program: new FormControl('',Validators.required),
      semester:new FormControl('',Validators.required),
      branch: new FormControl('',Validators.required),
      department:new FormControl('',Validators.required),
      twelfthPercentage:new FormControl('',Validators.required),
      userType:new FormControl('',Validators.required),
      dateOfJoining:new FormControl('',Validators.required)
    })
  }

  get admissionNo(){
    return this.registerForm.get('admissionNo');
  }
  get password(){
    return this.registerForm.get('password');
  }
  get name(){
    return this.registerForm.get('name');
  }
  get program(){
    return this.registerForm.get('program');
  }
  get semester(){
    return this.registerForm.get('semester');
  }
  get branch(){
    return this.registerForm.get('branch');
  }
  get department(){
    return this.registerForm.get('department');
  }
  get twelfthPercentage(){
    return this.registerForm.get('twelfthPercentage');
  }
  get role(){
    return this.registerForm.get('userType');
  }
  get dateOfJoining(){
    return this.registerForm.get('dateOfJoining');
  }

  login(){

    if(this.role?.value=='Student'){
      let d={
        admissionNo:this.admissionNo?.value,
        password:this.password?.value,
        name: this.name?.value,
        program: this.program?.value,
        semester:this.semester?.value,
        branch: this.department?.value,
        department:this.department?.value,
        twelfthPercentage:this.twelfthPercentage?.value,
      }
      console.log(d);
      this.http.post('http://localhost:3000/register/Student',d).subscribe((res)=>{
        console.log(res);
        this.router.navigateByUrl("/login");
      })
    }
    else if(this.role?.value=='Faculty' || this.role?.value=='HOD'){
      let d={
        employeeNo:this.admissionNo?.value,
        role:this.role.value=='Faculty'?0:1,
        name:this.name?.value,
        password:this.password?.value,
        dateOfJoining:this.dateOfJoining?.value
      }

      console.log(d);
      this.http.post('http://localhost:3000/register/Faculty',d).subscribe((res)=>{
        console.log(res);
        this.router.navigateByUrl("/login");
      })

    }
    else{
      let d={
        employeeNo:this.admissionNo?.value,
        name:this.name?.value,
        password:this.password?.value,
        dateOfJoining:this.dateOfJoining?.value
      }

      console.log(d);
      this.http.post('http://localhost:3000/register/'+this.role?.value,d).subscribe((res)=>{
        console.log(res);
        this.router.navigateByUrl("/login");
      })
    }
  }
}
