import { HttpClient } from '@angular/common/http';
import { InvokeFunctionExpr } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {Appointments} from '../class/appointments';
import {Consultationbill} from '../class/consultationbill';
import {Invoice} from '../class/invoice';
import {Appoint} from '../class/appoint';
import {FinalBilllist} from '../class/final-billlist';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReceptionistService {
  appointments:Appointments[];
  myappoint:Appoint;
  finalbill:FinalBilllist[];
  appFormData:Appoint=new Appoint();
  conFormData:Consultationbill=new Consultationbill();
  consultationbills:Consultationbill[];
  bills:Invoice[];
  billFormData:Invoice=new Invoice();
  roles:any;
  appointcnt:number;
  constructor(private httpClient:HttpClient) { }



  //-----------------------------GET------------------------------------------------------------------------
  bindListAppointments(){
    this.httpClient.get( environment.apiUrl + '/api/Appointments/ViewAppointments').toPromise().then(response=>{
      console.log("From Receptionist Service\n Fetching View Appointments");
      console.log(response);
      this.appointments=response as Appointments[];
    })
  }
  bindListActiveAppointments(){
    this.httpClient.get( environment.apiUrl + '/api/Appointments/Status/1').toPromise().then(response=>{
      console.log("From Receptionist Service\n Fetching Active Appointments");
      console.log(response);
      this.appointments=response as Appointments[];
    })
  }
  bindTodayAppointmentCount()
  {
    this.httpClient.get( environment.apiUrl + '/api/Appointments/CountAppointments').toPromise().then(response=>{
      console.log("From Receptionist Service\n Fetching Active Appointments Count");
      console.log(response);
      this.appointcnt=response as number+1;
    }) 
  }
  bindAppointmentbyDate(Dates:Date)
  {
   
    this.httpClient.get( environment.apiUrl + '/api/Appointments/Date/'+Dates).toPromise().then(response=>{
      console.log("From Receptionist Service\n Fetching  Appointments by Date");
      console.log(response);
      this.appointments=response as Appointments[];
    })
  }
  bindListTodayAppointments(){
    this.httpClient.get( environment.apiUrl + '/api/Appointments/Today').toPromise().then(response=>{
      console.log("From Receptionist Service\n Fetching Todays Appointments");
      console.log(response);
      this.appointments=response as Appointments[];
    })
  }
  bindListConsultation(){
    this.httpClient.get( environment.apiUrl + '/api/Appointments/Status/3').toPromise().then(response=>{
      console.log("From Receptionist Service\n Fetching Consultation Bill Ready  Patients ");
      console.log(response);
      this.appointments=response as Appointments[];
    })
  }
  bindListConsultancyBill(){
    this.httpClient.get( environment.apiUrl + '/api/ConsultationBill/ViewAllBills').toPromise().then(response=>{
      console.log("From Receptionist Service\n Fetching Consultation Bills");
      console.log(response);
      this.consultationbills=response as Consultationbill[];
    })
}
bindListFinalBill(){
  this.httpClient.get( environment.apiUrl + '/api/Bills/').toPromise().then(response=>{
    console.log("From Receptionist Service \n Fetching Bills");
    console.log(response);
    this.bills=response as Invoice[];
  })
}
bindDoctorList(){
this.httpClient.get( environment.apiUrl + '/api/Role/Staffs/1').toPromise().then(response=>{
  console.log("From Receptionist Service \n Fetching Doctor Lists");
  console.log(response);
  this.roles=response;
})
}
bindFinalInvoiceList(){
  this.httpClient.get( environment.apiUrl + '/api/Bills/UserBills').toPromise().then(response=>{
    console.log("From Receptionist Service \n Fetching Doctor Lists");
    console.log(response);
  this.finalbill =response as FinalBilllist[];
  })
  }
  bindAppointmentByStatus(id:number)
  {
    this.httpClient.get( environment.apiUrl + '/api/Appointments/Status/'+id).toPromise().then(response=>{
      console.log("From Receptionist Service\n Fetching Consultation Bill Ready  Patients ");
      console.log(response);
      this.appointments=response as Appointments[];
    })
  }
  //----------------------------------------------------------
getABill(id:number):Observable<any>
{
  return this.httpClient.get( environment.apiUrl + '/api/Bills/UserBills/'+id);
}
getAppoint(id:number):Observable<any>
{
  return this.httpClient.get( environment.apiUrl + '/api/Appointments/ViewAppointmentById/'+id);
}
//------------------------ POST---------------------------------------------------------
AddAppointment(form:NgForm):Observable<any>
{
  return this.httpClient.post( environment.apiUrl + '/api/Appointments',form);
}
AddConsultationBill(form:NgForm):Observable<any>
{
  return this.httpClient.post( environment.apiUrl + '/api/ConsultationBill',form);
}
AddFinalBill(form:NgForm):Observable<any>
{
  return this.httpClient.post( environment.apiUrl + '/api/Bills',form);
}
//-------------------------Patch-------------------------------------------------
UpdateAppointment(id:number,form:any):Observable<any>
{
  return this.httpClient.patch( environment.apiUrl + '/api/Appointments/'+id,form);
}

//---------------------Delete--------------------------------
DeleteAppointment(aid:number):Observable<any>
{
  return this.httpClient.delete( environment.apiUrl + '/api/Appointments/'+aid);
}


}
