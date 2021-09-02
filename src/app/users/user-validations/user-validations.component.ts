import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';


@Component({
    selector: 'app-user-validations',
    templateUrl: './user-validations.component.html',
    styleUrls: ['./user-validations.component.css']
})
export class UserValidationsComponent implements OnInit {

    constructor(
        private UserService: UserService,
        private router: Router,
        private _snackBar: MatSnackBar
    ) { }


    userObj: any = {
    }

    ngOnInit() {

    }


}

