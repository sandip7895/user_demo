import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
// import { PagerService } from 'src/app/_services/pager.service';


@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private UserService: UserService,
        private state: TransferState,
        private _snackBar: MatSnackBar
        // private pagerService: PagerService,
    ) { }

    ngOnInit() {
        this.getUsers();
    }
    public isLoading: boolean = false;

    public users = [];

    // public page = 1;
    // public limit = 50;

    PageIndex: number = 1;
    PageSize: number = 10;
    flag: number = 1;
    pager: any = {};

    public firstLoading = true;
    getUsers() {
        if (!this.isLoading) {
            this.isLoading = true;

            this.UserService.userListing(this.PageIndex, this.PageSize).subscribe((response: any) => {
                if (response.data != "") {
                    this.users = response.data;
                }
                else {
                }
                this.isLoading = false;
            });
        }
    }
    logout() {
        localStorage.setItem("login_id", "");
        this.router.navigate(['']);
    }

    Deletedealer(id) {
        if (confirm("Are you sure want to delete this record?")) {
            this.UserService.deleteuser(id).subscribe((response: any) => {
                if (response.data) {
                    this._snackBar.open("Deleted successfully.", "", { duration: 100000 });
                }
                else {
                    this._snackBar.open("Somthing went wrong! please try again!", "", { duration: 1000 });
                }
            });
        }
    }
}
