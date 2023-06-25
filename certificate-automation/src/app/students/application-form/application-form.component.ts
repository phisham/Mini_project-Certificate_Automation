import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { EmailValidator, FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {AlertComponent} from '../../alert/alert.component';
@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit {
  inputValue: string | undefined;
  applicationForm!:FormGroup;
  certificates:any=[];
  userData:any;
  userId:any;
  constructor(private fb:FormBuilder,private http:HttpClient,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.applicationForm=this.fb.group({
      name:new FormControl('',Validators.required),
      admissionNo:new FormControl('',Validators.required),
      regNo:new FormControl('',Validators.required),
      program:new FormControl('',Validators.required),
      semester:new FormControl('',Validators.required),
      scholarship:new FormControl('',Validators.required),
      otherScholarship:new FormControl(''),
      bonaFide:new FormControl(false),
      feeStructure:new FormControl(false),
      gpaToPercentage:new FormControl(false),
      promotion:new FormControl(false),
      mediumOfInstruction:new FormControl(false),
      otherCertificates:new FormControl(''),
      specificFormat:new FormControl(false),
      photoInFormat:new FormControl(''),
      phoneNumber:new FormControl('',Validators.required),
      email:new FormControl('',Validators.required),
      signature:new FormControl('',Validators.required),
    })

    const token =localStorage.getItem("userToken");
    console.log(token);
    if (token) {
      this.userData = token.split(".")[1];
      this.userData = window.atob(this.userData);
      this.userData=JSON.parse(this.userData);

    }
    this.userData=this.userData.user;
    this.userId=this.userData._id;

    if(this.userData){
      this.applicationForm.get('name')?.setValue(this.userData.name);
      this.applicationForm.get('program')?.setValue(this.userData.program);
      this.applicationForm.get('semester')?.setValue(this.userData.semester);
      this.applicationForm.get('scholarship')?.setValue(this.userData.scholarship);
    }
  }

  sendForm(){
    if(this.applicationForm.get('bonaFide')?.value)
      this.certificates.push("Bonafide");
    if(this.applicationForm.get('feeStructure')?.value)
      this.certificates.push("Fee Structure");
    if(this.applicationForm.get('promotion')?.value)
      this.certificates.push("Promotion");
    if(this.applicationForm.get('gpaToPercentage')?.value)
      this.certificates.push("GPA to Percentage");
    if(this.applicationForm.get('mediumOfInstruction')?.value)
      this.certificates.push("Medium Of Instruction");
    if(this.applicationForm.get('otherCertificates')?.value){
      this.certificates.push(this.applicationForm.get('otherCertificates')?.value);
    }

    let data={
      ...this.applicationForm.value,
      certificateType:this.certificates,
      status:"Under Review by Staff Advisor",
      from:this.userId,
      to:this.userData.staffAdvisor,
      studentId:this.userId
    }

    this.http.post('http://localhost:3000/apply',data).subscribe((res)=>{
      console.log(res);
      this.dialog.open(AlertComponent,{
        width: '250px',
        data: {
          title: 'Alert',
          message: 'Success!'
        }
      })
    })
    console.log(this.certificates);
  }

}
