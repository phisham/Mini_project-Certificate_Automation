import { Component, OnInit,Inject } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/api.service';
import { AlertComponent } from '../alert/alert.component';
@Component({
  selector: 'app-view-application-form-dialog',
  templateUrl: './view-application-form-dialog.component.html',
  styleUrls: ['./view-application-form-dialog.component.css']
})
export class ViewApplicationFormDialogComponent implements OnInit {
  applicationForm!:FormGroup;
  certificates:any=[];
  userData:any;
  userId:any;
  userType!:string;
  constructor(private fb:FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any,private apiService:ApiService,private dialog:MatDialog) { }

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

    if(this.data){
      this.applicationForm.get('name')?.setValue(this.data.name);
      this.applicationForm.get('admissionNo')?.setValue(this.data.admissionNo);
      this.applicationForm.get('regNo')?.setValue(this.data.regNo);
      this.applicationForm.get('program')?.setValue(this.data.program);
      this.applicationForm.get('semester')?.setValue(this.data.semester);
      this.applicationForm.get('scholarship')?.setValue(this.data.scholarship);
      this.applicationForm.get('phoneNumber')?.setValue(this.data.phoneNumber);
      this.applicationForm.get('email')?.setValue(this.data.email);
      
      this.certificates=this.data.certificateType;
      console.log(this.certificates);
    }

    const token =localStorage.getItem("userToken");
    console.log(token);
    if (token) {
      this.userData = token.split(".")[1];
      this.userData = window.atob(this.userData);
      this.userData=JSON.parse(this.userData);

    }
    this.userData=this.userData.user;
    console.log(this.userData);
    this.userId=this.userData._id;
    this.userType=this.userData.userType;
  }


  forward(){

    let doneBy:String;
    if(this.userData.hod){
      doneBy="HOD";
    }
    else if(this.userData.dean){
      doneBy="Dean";
    }
    else{
      doneBy="Principal";
    }

    let dataToUpdate={
      to:this.userData.hod || this.userData.dean || this.userData.principal,
      status:"Under review by "+`${doneBy}`
    }
    this.apiService.forward(this.data._id,dataToUpdate).subscribe((result:any)=>{
      console.log(result);
      this.dialog.open(AlertComponent,{
        width: '250px',
        data: {
          title: 'Alert',
          message: 'Success!',
          
        }
      })
      setTimeout(()=>{
        this.dialog.closeAll();
      },500);
    })

  }

  verifyReturn(){
    let dataToUpdate={
      to:this.data.from,
      status:"Completed"
    }
    this.apiService.forward(this.data._id,dataToUpdate).subscribe((result:any)=>{
      console.log(result);
      this.dialog.open(AlertComponent,{
        width: '250px',
        data: {
          title: 'Alert',
          message: 'Success!',
          
        }
      })
      setTimeout(()=>{
        this.dialog.closeAll();
      },500);
      window.location.reload();
    })
  }
}
