import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from 'src/app/shared/services/patient.service';
import { ReceptionistService } from 'src/app/shared/services/receptionist.service';

@Component({
  selector: 'app-addappointment',
  templateUrl: './addappointment.component.html',
  styleUrls: ['./addappointment.component.scss'],
})
export class AddappointmentComponent implements OnInit {
  dates = <HTMLInputElement>document.getElementById('date');
  dmin;
  frame;
  newdate;
  constructor(
    public receptionservice: ReceptionistService,
    public patientservice: PatientService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let todayDate = new Date();
    let h = todayDate.getHours();
    let m = todayDate.getMinutes();
    this.dmin = new Date().toISOString().slice(0, 10) + 'T' + h + ':' + m;
    this.receptionservice.bindTodayAppointmentCount();
    this.receptionservice.bindDoctorList();

    this.patientservice.bindListPatients();
    this.receptionservice.appFormData.AppointmentDate = this.dmin;
  }

  OnSubmit(form: NgForm) {
    form.value.DoctorId = +form.value.DoctorId;
    form.value.PatientId = +form.value.PatientId;
    form.value.Status = +1;
    form.value.ReceptionistId = +sessionStorage.getItem('staffId');
    this.addAppointment(form);
    console.log(form.value);
  }
  addPatients() {
    console.log('Clicked');
    this.router.navigateByUrl('/add-patient');
  }
  addAppointment(form: NgForm) {
    console.log('Adding Appointment');
    this.receptionservice.AddAppointment(form.value).subscribe(
      (result) => {
        console.log(form.value);
        console.log(result);
        this.toaster.success('Sucessfully Added', 'Appointment');
        // setTimeout(() => {
        //   this.frame = <HTMLIFrameElement>document.getElementById('frame');
        //   this.frame.src = 'receptionist';
        // }, 2000);
      },
      (error) => {
        console.log(error);
      }
    );
    form.resetForm();
    this.receptionservice.bindTodayAppointmentCount();
    this.frame = <HTMLIFrameElement>document.getElementById('frame');
    this.frame.src = 'receptionist/addappointment';
  }
  isDateBeforeToday() {
    // console.log(todayDate);

    let todayDate = new Date();
    let h = todayDate.getHours();
    let m = todayDate.getMinutes();
    console.log('Hour:' + h);
    if (h > 9 && m > 9)
      this.dmin = new Date().toISOString().slice(0, 10) + 'T' + h + ':' + m;
    else if (h > 9 && m < 9)
      this.dmin = new Date().toISOString().slice(0, 10) + 'T' + h + ':' + 0 + m;
    else if (h < 9 && m > 9)
      this.dmin = new Date().toISOString().slice(0, 10) + 'T' + 0 + h + ':' + m;
    else
      this.dmin =
        new Date().toISOString().slice(0, 10) + 'T' + 0 + h + ':' + 0 + m;

    console.log(this.dmin + 'Current Time');
    console.log(this.receptionservice.appFormData.AppointmentDate);
    if (this.receptionservice.appFormData.AppointmentDate < this.dmin) {
      alert("You Can't Book for already past time");
      console.log(this.receptionservice.appFormData.AppointmentDate);
      let todayDate = new Date();
      let h = todayDate.getHours();
      let m = todayDate.getMinutes();
      this.newdate = new Date().toISOString().slice(0, 10) + 'T' + h + ':' + m;
      this.receptionservice.appFormData.AppointmentDate = this.newdate;
    }
  }

  isIdInList() {
    let flg = 0;
    for (let i = 0; i < this.patientservice.patients.length; i++) {
      if (
        this.receptionservice.appFormData.PatientId ==
        this.patientservice.patients[i].PatientId
      ) {
        flg = 1;
      }
    }
    if (flg == 1) console.log('Valid Data');
    else this.receptionservice.appFormData.PatientId = null;
    //this.patientservice.patients
  }
}
