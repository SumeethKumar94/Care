import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Qualification } from '../class/qualification';
import { Role } from '../class/role';
import { Staff } from '../class/staff';

import { MedicineStock } from '../class/medicine-stock';
import { LabReport } from '../class/lab-report';
import { SalesReport } from '../class/sales-report';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  staffs: Staff[];
  staffFormData: Staff = new Staff();
  qualify: any[];
  qualFormData: Qualification = new Qualification();
  roles: any[];

  medStocks:MedicineStock[];
  sales:SalesReport[];
  labreports:LabReport[];

  constructor(private httpClient: HttpClient) {}

  //get all staffs
  bindListStaffs() {
    this.httpClient
      .get(environment.apiUrl + '/api/Staff')
      .toPromise()
      .then((response) => {
        console.log('from  staff service');
        console.log(response);
        this.staffs = response as Staff[];
      });
  }
  bindListEmployees() {
    this.httpClient
      .get(environment.apiUrl + '/api/Staff/Employees')
      .toPromise()
      .then((response) => {
        console.log('from  staff service');
        console.log(response);
        this.staffs = response as Staff[];
      });
  }

  //get  qualifications
  bindListQualifications() {
    this.httpClient
      .get(environment.apiUrl + '/api/Qualifications')
      .toPromise()
      .then((response) => {
        console.log('from qualification  service');

        this.qualify = response as any[];
        console.log(this.qualify);
      });
  }

  //get  roles
  bindListRoles() {
    this.httpClient
      .get(environment.apiUrl + '/api/Role')
      .toPromise()
      .then((response) => {
        console.log('from role  service');
        console.log(response);
        this.roles = response as any[];
       
      });
  }
  //get staff by id
  getStaff(id: number): Observable<any> {
    console.log(id);
    return this.httpClient.get(environment.apiUrl + '/api/Staff/' + id);
  }

  //insert staff
  insertStaff(staffs: Staff): Observable<any> {
    

    let temp = staffs.Status;
    if(temp){      
      staffs.Status = "Active";
    }else{
      staffs.Status = "InActive";
    }
    console.log(' status: ' + staffs.Status);
    
    return this.httpClient.post(environment.apiUrl + '/api/Staff', staffs);
  }

  insertLogins(log:any):Observable<any>{
    return this.httpClient.post(environment.apiUrl + '/api/Login',log);
  }
  //update staff
  updateStaff(staffs: Staff): Observable<any> {
    
    let temp = staffs.Status;
    if(temp){      
      staffs.Status = "Active";
    }else{
      staffs.Status = "InActive";
    }
    return this.httpClient.put(environment.apiUrl + '/api/Staff', staffs);
  }
//---------------------Patch-------------------------------
  updateStaffStats(id:number,patch:any):Observable<any>
  {
    return this.httpClient.patch( environment.apiUrl + '/api/Staff/'+id,patch);
  }

  insertQualification(qualify: Qualification): Observable<any> {
 
    return this.httpClient.post(
      environment.apiUrl + '/api/Qualifications',
      qualify
    );
  }


  //getting medicine stock report
  bindListMedStockReport() {
    this.httpClient
      .get(environment.apiUrl + '/api/Report/GetStockReports')
      .toPromise()
      .then((response) => {
        console.log('from stock report  service');

        this.medStocks = response as any[];
        
      });
  }

  //getting  sales report(profit per month)
  bindListSalesReport() {
    this.httpClient
      .get(environment.apiUrl + '/api/Report/GetSalesReports')
      .toPromise()
      .then((response) => {
        console.log('from sales report  service');

        this.sales = response as any[];
        
      });
  }

  //getting report of lab 
  bindListLabReport() {
    this.httpClient
      .get(environment.apiUrl + '/api/Report/GetLabTestReports')
      .toPromise()
      .then((response) => {
        console.log('from lab report  service');

        this.labreports = response as any[];
        
      });
  }


  resetForm(form?: NgForm) {
    this.staffFormData = null;
    console.log('reseting');
    form.resetForm();
    console.log('reset done');
  }
}
