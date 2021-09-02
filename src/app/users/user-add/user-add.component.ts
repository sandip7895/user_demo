import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-user-add',
    templateUrl: './user-add.component.html',
    styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

    constructor(
        private UserService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private _snackBar: MatSnackBar
    ) { }


    userObj: any = {
    }

    id;
    ngOnInit() {
        if (this.route.snapshot.params['id']) {
            this.id = this.route.snapshot.params['id'];
            this.UserService.get_single_user(this.id).subscribe(res => {
                var response = JSON.parse(JSON.stringify(res));
                if (response.data) {
                    this.userObj.id = response.data.id;
                    this.userObj.name = response.data.first_name + ' ' + response.data.last_name;
                    this.userObj.job = "test";
                }
            });
        }
    }

    isSubmitted = false;
    SaveUser(form: NgForm) {
        this.isSubmitted = true;

        if (!form.valid) {
            return false;
        } else {
            this.UserService.create_user(this.userObj).subscribe(res => {
                var response = JSON.parse(JSON.stringify(res));
                if (response.data || response.id) {
                    this.isSubmitted = false;
                    this._snackBar.open("User successfully saved", "", { duration: 1000 });
                    this.router.navigateByUrl("user-list");
                }
                else {
                    this.isSubmitted = false;
                }

            }, error => { this.isSubmitted = false; })
        }
    }

}
