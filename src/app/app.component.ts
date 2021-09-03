import { ConstantPool } from '@angular/compiler';
import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'user-demo';

    constructor(
        private router: Router,
        private _location: Location,
        public route: ActivatedRoute,
    ) {
        router.events.subscribe(event => {
        });
    }

    ngOnInit() {
    }

    getTitle(state, parent) {
        var data = [];
        if (parent && parent.snapshot.data && parent.snapshot.data.title) {

            var title = parent.snapshot.data.title;
            if (title != "") {
                data.push(parent.snapshot.data.title);
            }
        }

        if (state && parent) {
            var title1 = this.getTitle(state, state.firstChild(parent));

            if (title1.length > 0) {
                title1.forEach(element => {
                    data.push(element);
                });
            }
        }

        return data;
    }

}


