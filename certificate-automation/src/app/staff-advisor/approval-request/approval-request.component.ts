import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/api.service';
import {AlertComponent} from '../../alert/alert.component';

@Component({
  selector: 'app-approval-request',
  templateUrl: './approval-request.component.html',
  styleUrls: ['./approval-request.component.css']
})
export class ApprovalRequestComponent implements OnInit {
  request:any=[];
  userId:any;
  userData:any;
  constructor(private apiService:ApiService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.apiService.getUser('student').subscribe((data:any)=>{
      console.log(data);
      this.request=data;
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
  }

  accept(id:string){
    let data={
      approved:true,
      staffAdvisor:this.userId
    }

    this.apiService.acceptUser(id,data).subscribe((res:any)=>{
      console.log(res);
      this.dialog.open(AlertComponent,{
        width: '250px',
        data: {
          title: 'Alert',
          message: 'Success!'
        }
      })

      this.apiService.getUser('student').subscribe((data:any)=>{
        console.log(data);
        this.request=data;
      })

    })
  }

}
