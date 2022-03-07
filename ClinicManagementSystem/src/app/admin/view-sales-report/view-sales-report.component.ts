import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StaffService } from 'src/app/shared/services/staff.service';

@Component({
  selector: 'app-view-sales-report',
  templateUrl: './view-sales-report.component.html',
  styleUrls: ['./view-sales-report.component.scss']
})
export class ViewSalesReportComponent implements OnInit {

  page:number =1;
  filter:string;
  loggedUser:string;
  constructor(private authService: AuthService,public staffService: StaffService,private router: Router) { }

  ngOnInit(): void {
    this.loggedUser = localStorage.getItem("userName");
    console.log("welcome to medicine stock report page");
    this.staffService.bindListSalesReport();
  }

  //logout
  logOut(){
    this.authService.logout();
    this.router.navigateByUrl('login');
  }
}
