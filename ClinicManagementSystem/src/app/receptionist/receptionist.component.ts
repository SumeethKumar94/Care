import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-receptionist',
  templateUrl: './receptionist.component.html',
  styleUrls: ['./receptionist.component.scss']
})
export class ReceptionistComponent implements OnInit {
   frame;
  username = sessionStorage.getItem('userName');
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.frame=<HTMLIFrameElement> document.getElementById("frame");
    this.frame.src="receptionist/dashboard";
    window.location.hash = 'no-back-button';

    window.location.hash = 'Again-No-back-button'; //again because google chrome don't insert first hash into history

    window.onhashchange = function () {

      window.location.hash = 'no-back-button';

    };
  }
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
  addPatients()
  {
    this.frame.src="/add-patient";
  }
  viewPatients()
  {
    this.frame.src="/patient-list/dashboard";
  }
  viewAppoint()
  {
    this.frame.src="receptionist/viewappointment";
  }
  addAppoint()
  {
    this.frame.src="receptionist/addappointment";
  }
  addConsult()
  {
    this.frame.src="receptionist/addconsultation";
  }
  viewConsult()
  {
    this.frame.src="receptionist/viewconsultation";
  }
  viewInvoice()
  {
    this.frame.src="receptionist/viewinvoice";
  }
  addInvoice()
  {
    this.frame.src="receptionist/addinvoice";
  }
  home()
  {
    window.location.reload();
  }
}
