import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { PatientService } from '../shared/services/patient.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LabtTestService } from '../shared/services/labt-test.service';

@Component({
  selector: 'app-lab-technician',
  templateUrl: './lab-technician.component.html',
  styleUrls: ['./lab-technician.component.scss'],
})
export class LabTechnicianComponent implements OnInit {
  username = sessionStorage.getItem('userName');
  staffId = sessionStorage.getItem('staffId');
  // loggedUser: string;
  page: number = 1;
  filter: string;
  tID: number;
  constructor(
    private authService: AuthService,
    public labtestService: LabtTestService,
    private router: Router,
    private toasterService: ToastrService
  ) {}

  ngOnInit(): void {
    // this.username = sessionStorage.getItem('userName');
    // this.loggedUser = localStorage.getItem('userName');
    window.location.hash = 'no-back-button';

    window.location.hash = 'Again-No-back-button'; //again because google chrome don't insert first hash into history

    window.onhashchange = function () {

      window.location.hash = 'no-back-button';

    };
    //this.labtestService.bindListReports();
this.labtestService.bindListReportsforPharm(+this.staffId);

  }

  //Edit test Report
  updateTestReport(tID: number) {
    console.log(' going to update this ' + tID);
    //navigate to edit form with selected test details
    this.router.navigate(['update-testreport', tID]);
  }
  addTest() {
    this.router.navigateByUrl('/add-test');
  }

  //logout
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }
}
