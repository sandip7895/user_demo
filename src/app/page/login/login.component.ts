import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(
        private UserService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private _snackBar: MatSnackBar

    ) { }

    public queryParams: any = {};

    objlogin: any = {
    }

    private login_id = "";
    ngOnInit() {

        this.route.queryParams.subscribe(params => {
            this.queryParams = params;
        });

        if (this.UserService.getUserLoggedIn()) {
            this.router.navigateByUrl("");
            return;
        }

        this.login_id = localStorage.getItem("login_id");
        if (this.login_id != "") {
            this.objlogin.login_id = this.login_id;
        }

    }


    isSubmitted = false;
    SubmitLogin(form: NgForm) {

        this.isSubmitted = true;
        if (!form.valid) {
            this.isSubmitted = false;
            return false;
        } else {
            if (this.objlogin) {
                localStorage.setItem("login_id", this.objlogin.email);
                this.router.navigate(['/user-list'], { queryParams: this.queryParams });
            }
        }
    }
}
