import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpEventType } from '@angular/common/http';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    private objservableUser = new Subject<any>();

    constructor(
        private http: HttpClient,
    ) { }


    setObjservableUser(objLoggedInUser) {
        // this.objservableUser.next(objLoggedInUser);
        localStorage.setItem("LoggedInUser", objLoggedInUser);
    }

    removeObjservableUser() {
        this.objservableUser.next();
        localStorage.removeItem("LoggedInUser");
    }

    geObjservableUser(): Observable<any> {
        return this.objservableUser.asObservable();
    }

    getUserLoggedIn() {
        return localStorage.getItem('LoggedInUser');
    }

    login_with_email(data): Observable<any> {
        const url = environment.apiUrl + 'Services/login_with_otp';
        let body = new HttpParams();
        body = body.append('mobile', data.mobile);
        body = body.append('dial_code', "91");

        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        return this.http.post(url, body, { headers: httpHeaders });
    }

    create_user(data): Observable<any> {
        if (data.id) {
            const url = environment.apiUrl_2 + 'api/users';
            let body = new HttpParams();
            body = body.append('id', data.id);
            body = body.append('name', data.name);
            body = body.append('job', data.job);

            let httpHeaders = new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            });
            return this.http.post(url, body, { headers: httpHeaders });
        } else {
            const url = environment.apiUrl_2 + 'api/users';
            let body = new HttpParams();
            body = body.append('name', data.name);
            body = body.append('job', data.job);

            let httpHeaders = new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            });
            return this.http.post(url, body, { headers: httpHeaders });
        }
    }

    get_single_user(id) {
        const url = environment.apiUrl_2 + 'api/users/' + id;
        return this.http.get(url);
    }

    userListing(page, limit) {
        const url = environment.apiUrl_2 + 'api/users?page=' + page + '&per_page=' + limit;
        return this.http.get(url);
    }

    deleteuser(id) {
        const url = environment.apiUrl_2 + 'api/users/' + id;
        return this.http.get(url);
    }
}