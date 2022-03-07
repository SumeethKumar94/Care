import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReceptionistService } from 'src/app/shared/services/receptionist.service';
import{NgxPrintModule} from 'ngx-print';
import   './../../../assets/js/smtp.js'; //path might change
import { HttpRequest } from '@angular/common/http';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-viewinvoice',
  templateUrl: './viewinvoice.component.html',
  styleUrls: ['./viewinvoice.component.scss']
})
export class ViewinvoiceComponent implements OnInit {
page:number=1;
filter:string;
  constructor(public receptionservice:ReceptionistService) { }

  ngOnInit(): void {
    this.receptionservice.bindListFinalBill();
    this.receptionservice.bills[0].PatientName;
  }

  sendEmail()
  {
    var datePipe = new DatePipe("en-UK");

          let AppointformatedDate:any = datePipe.transform(this.receptionservice.bills[this.page-1].AppointmentDate,'MMM d, y, h:mm:ss a');
          let BillDate:any= datePipe.transform(this.receptionservice.bills[this.page-1].BillDate,'MMM d, y, h:mm:ss a');

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
      To : this.receptionservice.bills[this.page-1].Email,  //testemailforasite@gmail.com //nikhil.nandagopan@experionglobal.com
      From : 'sumeethexperion@gmail.com',
      Subject : 'Clinic Management System - Final Invoice',
      Body : `
      <i>Hello ${this.receptionservice.bills[this.page-1].PatientName},</i> <br/> Please Find your Invoice Copy below <br>
      <center><h2> Final Invoice </h2></center>
      <b>Invoice No: ${this.receptionservice.bills[this.page-1].BillId}</b><br/>
      <div align="right"><b >Bill Date: ${BillDate}</b><br/></div>
       <b> Patient Name: ${this.receptionservice.bills[this.page-1].PatientName}</b> <br/>
       <b>Blood Group:${this.receptionservice.bills[this.page-1].BloodGroup} </b> <br/>
       <div align="right"><b>Phone no:${this.receptionservice.bills[this.page-1].Phone} </b> <br/></div>
       <b>Receptionist Name:  ${this.receptionservice.bills[this.page-1].ReceptionistName}</b> 
       <div align="right"> <b>Appointment Date: ${AppointformatedDate}</b></div>
       <b>Consulted Doctor Name:  ${this.receptionservice.bills[this.page-1].DoctorName} </b><br />
        <center> <br /> 
        <table  cellspacing="2" bgcolor="#1aff8c" style="width:100%">
        <tbody >
        <tr colspan="2"><h4 align="center">Services</h4></tr>
        <tr bgcolor="#4dffa6">
        <th> Consultation Fee:</th>
        <td > ${this.receptionservice.bills[this.page-1].ConsultationFee}</td>
        </tr>
        <tr>
        <th colspacing="10" bgcolor="#80ffbf"> Medicines Fee :</th>
        <td border=0 bgcolor="#80ffbf"> ${this.receptionservice.bills[this.page-1].MedicinesFee}</td>
        </tr>
        <tr bgcolor="#4dffa6">
        <th border=0>Lab Tests Fee :</th>
        <td border=0> ${this.receptionservice.bills[this.page-1].LabTestsFee}</td>
        </tr>
        <tr bgcolor="#80ffbf">
        <th border=0> Total Amount </th>
        <td border=0> <b> ${this.receptionservice.bills[this.page-1].TotalAmount} </b></td>
        </tr>
        </tbody>
        </table>
        <br></center>
        <center><b>~Thank you for your patronage and Stay Healthy  .~</b> </center>`
      }).then( (message) => { if(message=='OK')alert('Billwas sent to Patients Email'); else alert('Email Sending Failed...'); } );


  }
 

}
