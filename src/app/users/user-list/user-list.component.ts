import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
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
    ) { }



    ngOnInit() {
        this.getUsers();
    }
    public isLoading: boolean = false;

    public users = [];

    // public page = 1;
    // public limit = 50;
    pager: any = {};

    public firstLoading = true;
    listData: MatTableDataSource<any>;
    displayedColums: string[] = ['employee_name'];
    getUsers() {
        if (!this.isLoading) {
            this.isLoading = true;

            this.UserService.userListing().subscribe((response: any) => {
                if (response.status == "success") {
                    this.users = response.data;
                    this.listData = new MatTableDataSource(this.users);
                }
                else {
                }
                this.isLoading = false;
            });
        }
    }

    Deletedealer(i) {
        if (confirm("Are you sure want to delete this record?")) {
            this.users.splice(i, 1);
            this._snackBar.open("Deleted successfully.", "", { duration: 100000 });
            // this.UserService.deleteuser(id).subscribe((response: any) => {
            //     if (response.data) {
            //         this.users = this.users.splice(i, id);
            //         this._snackBar.open("Deleted successfully.", "", { duration: 100000 });
            //     }
            //     else {
            //         this._snackBar.open("Somthing went wrong! please try again!", "", { duration: 1000 });
            //     }
            // });
        }
    }
}