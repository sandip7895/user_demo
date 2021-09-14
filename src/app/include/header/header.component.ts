import { ConstantPool } from '@angular/compiler';
import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy, HostListener, ChangeDetectorRef, EventEmitter, Pipe, PipeTransform, ɵisPromise } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/_services/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(
        private router: Router,
        private _location: Location,
        public route: ActivatedRoute,
        private UserService: UserService,
    ) { }

    UserName$: Observable<string>;

    user_email = localStorage.getItem("email");
    ngOnInit() {
        this.UserName$ = this.UserService.currentUserName;
    }

    logout() {
        localStorage.setItem("login_id", "");
        localStorage.setItem("email", "");
        this.router.navigate(['']);
    }
}
