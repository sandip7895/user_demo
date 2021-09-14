import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    data: Observable<any>;
    login_user: any;
    constructor(
        private UserService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private _snackBar: MatSnackBar

    ) { }

    profileObj: any = {
        email: ""
    }

    ngOnInit() {
        this.UserService.cast.subscribe(val => this.login_user = val);

    }
    editTheUser() {
        this.UserService.editUser(this.profileObj.email)
    }


    isSubmitted = false;
    SubmitProfile(form: NgForm) {
        this.isSubmitted = true;
        if (!form.valid) {
            this.isSubmitted = false;
            return false;
        } else {
            if ((this.profileObj.email != "")) {
                localStorage.setItem("email", this.profileObj.email);
                localStorage.setItem("email", this.profileObj.email);
                this.router.navigateByUrl("user-list");
            } else {
            }
        }
    }
}
