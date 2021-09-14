import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpEventType } from '@angular/common/http';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Thumbs } from 'swiper';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    private objservableUser = new Subject<any>();
    private UserName = new BehaviorSubject<string>(localStorage.getItem('email'));
    cast = this.objservableUser.asObservable();

    constructor(
        private http: HttpClient,
    ) { }


    setObjservableUser(objLoggedInUser) {
        // this.objservableUser.next(objLoggedInUser);
        localStorage.setItem("LoggedInUser", objLoggedInUser);
    }

    get currentUserName() {
        return this.UserName.asObservable();
    }

    removeObjservableUser() {
        this.objservableUser.next();
        localStorage.removeItem("LoggedInUser");
    }

    geObjservableUser(): Observable<any> {
        return this.objservableUser.asObservable();
    }

    editUser(newuser) {
        this.objservableUser.next(newuser)
    }

    getUserLoggedIn() {
        return localStorage.getItem('LoggedInUser');
    }

    login_with_email(data): Observable<any> {
        const url = environment.apiUrl + 'Services/login_with_otp';
        let body = new HttpParams();
        body = body.append('mobile', data.mobile);

        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        return this.http.post(url, body, { headers: httpHeaders });
    }

    create_user(data): Observable<any> {
        if (data.id) {

            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Referrer-Policy': 'origin-when-cross-origin',
                    'Referer': 'http://dummy.restapiexample.com/',
                    'Access-Control-Allow-Origin': 'http://localhost:4200'
                    // "Access-Control-Allow-Origin": "*",
                    // "Access-Control-Allow-Methods": "GET , PUT , POST , DELETE",
                    // "Access-Control-Allow-Headers": "Content-Type, x-requested-with"
                })
            };
            return this.http.put<any>(environment.apiUrl + 'update', JSON.stringify(data), httpOptions).pipe(
                tap((update) => console.log()),
            );
        } else {
            const url = environment.apiUrl + 'create';
            let body = new HttpParams();
            body = body.append('employee_name', data.employee_name);
            body = body.append('employee_salary', data.employee_salary);
            body = body.append('employee_age', data.employee_age);

            let httpHeaders = new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            });
            return this.http.post(url, body, { headers: httpHeaders });
        }
    }

    get_single_user(id) {
        const url = environment.apiUrl + 'employee/' + id;
        return this.http.get(url);
    }

    userListing() {
        const url = environment.apiUrl + 'employees';
        return this.http.get(url);
    }

    deleteuser(id) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET , PUT , POST , DELETE",
                "Access-Control-Allow-Headers": "Content-Type, x-requested-with"
            })
        };
        return this.http.put<any>(environment.apiUrl + 'delete', JSON.stringify(id = id), httpOptions).pipe(
            tap((update) => console.log()),
        );
    }
}