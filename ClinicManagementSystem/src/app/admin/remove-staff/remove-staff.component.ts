import { HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StaffService } from 'src/app/shared/services/staff.service';

@Component({
  selector: 'app-remove-staff',
  templateUrl: './remove-staff.component.html',
  styleUrls: ['./remove-staff.component.scss']
})
export class RemoveStaffComponent implements OnInit {

  page:number =1;
  filter:string;
  loggedUser:string;
  sID:number;
  patch:any;
  
  constructor(private authService: AuthService,public staffService: StaffService,private router: Router, private toasterService: ToastrService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loggedUser = localStorage.getItem("userName");
    console.log("welcome to staff-list");
    this.staffService.bindListEmployees();
  }

   //disable staff
  toDisableStaff(sID:number){
    if(confirm("Do you want to Disable  this Staff ?"))
    { 
    console.log(" Going to disable this staff = " +sID);
    let n=0;
    const otp = Math.floor(1000 + Math.random() * 9000);
  var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), 
    a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); 
    a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), 
    a.onload = function () { var e = a.responseText; null != t && t(e) }, 
    a.send(n) }, ajax: 
    function (e, n) 
    { var t = Email.createCORSRequest("GET", e); t.onload = function () 
    { var e = t.responseText; null != n && n(e) }, t.send() }, 
    createCORSRequest: function (e, n) 
    { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof HttpRequest? (t = new XMLHttpRequest).open(e, n) : t = null, t }
}
  Email.send({
    Host : 'smtp.elasticemail.com',
    Username : 'sumeethexperion@gmail.com',
    Password : '45816B271D21A951B111754AAE40236441F9',
    To : 'sumeethexperion@gmail.com',  //testemailforasite@gmail.com //nikhil.nandagopan@experionglobal.com
    From : 'sumeethexperion@gmail.com',
    Subject : 'Clinic Management System - System Admin',
    Body : `
    <i><h5>Hello Admin,</h5></i> <br/> <br>
    <center><h2> Two Factor Authentication  </h2></center>
    <center><br><b>Please Find your OTP Below to Remove a Staff</b>
     <h3>OTP:${otp} </h3></center>
      <center><b>~Thank you for your patronage and Stay Healthy  .~</b> </center>`
    }).then( (message) => {if(message=='OK'){alert('OTP was sent to your Email'); n=+window.prompt('Enter the recieved OTP:');
  
    if(n>0 && n==otp)
    {
    this.toasterService.success('OTP Matched! Disabled the Staff','Staff Status');
    this.RemoveStaff(sID);
    console.log(n);
    }
    else
      this.toasterService.error('Invalid OTP','Staff Status');

  }else alert('Failed to Send OTP, Try Again')} );
   
    } 
    
  }

     //enable staff
     toEnableStaff(sID:number){
      if(confirm("Do you want to Enable this Staff ?"))
      { 
      console.log(" Going to Enable this staff = " +sID);
      let n=0;
      const otp = Math.floor(1000 + Math.random() * 9000);
    var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), 
      a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); 
      a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), 
      a.onload = function () { var e = a.responseText; null != t && t(e) }, 
      a.send(n) }, ajax: 
      function (e, n) 
      { var t = Email.createCORSRequest("GET", e); t.onload = function () 
      { var e = t.responseText; null != n && n(e) }, t.send() }, 
      createCORSRequest: function (e, n) 
      { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof HttpRequest? (t = new XMLHttpRequest).open(e, n) : t = null, t }
  }
  
    Email.send({
      Host : 'smtp.elasticemail.com',
      Username : 'sumeethexperion@gmail.com',
      Password : '45816B271D21A951B111754AAE40236441F9',
      To : 'sumeethexperion@gmail.com',  //testemailforasite@gmail.com //nikhil.nandagopan@experionglobal.com
      From : 'sumeethexperion@gmail.com',
      Subject : 'Clinic Management System - System Admin',
      Body : `
      <i><h5>Hello Admin,</h5></i> <br/> <br>
      <center><h2> Two Factor Authentication  </h2></center>
      <center><br><b>Please Find your OTP Below  to Enable Staff</b>
        <h3>OTP:${otp} </h3></center>
        <center><b>~Thank you for your patronage and Stay Healthy  .~</b> </center>`
      }).then( (message) => {if(message=='OK'){alert('OTP was sent to your Email'); n=+window.prompt('Enter the recieved OTP:');
    
      if(n>0 && n==otp)
      {
      this.toasterService.success('OTP Matched','Staff Status');
      this.UpdateStaff(sID);
      console.log(n);
      }
      else
        this.toasterService.error('Invalid OTP','Staff Status');

    }else alert('Failed to Send OTP, Try Again')} );
     
      } 
    }

    RemoveStaff(Sid:number)
    {
      this.patch=[{'value':'InActive','path':'status','op':'replace'}];
      this.staffService.updateStaffStats(Sid,this.patch).subscribe(
        (result)=>{
          console.log(result);
          this.staffService.bindListEmployees();
        },(error)=>console.log(error));
    }

    UpdateStaff(Sid:number)
    {
      this.patch=[{'value':'Active','path':'status','op':'replace'}];
      this.staffService.updateStaffStats(Sid,this.patch).subscribe(
        (result)=>{
          console.log(result);
          this.staffService.bindListEmployees();
        },(error)=>console.log(error));
    }

  
  //logout
  logOut(){
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

}
