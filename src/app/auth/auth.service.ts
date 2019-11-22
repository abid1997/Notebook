import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UIService } from '../shared/ui.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private isAuthenticated: boolean;
    private token: string;
    private fullName: string;
    private tokenTimer: any;
    public fullNameListener = new Subject<string>();
    private authStatusListener = new Subject<boolean>();
    public loadingStateChanged = new Subject<boolean>();
    constructor(private http: HttpClient, private router: Router, private uiService: UIService) { }

    getToken() {
        return this.token;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getFullName() {
        return this.fullName;
    }

    signup(fullName, email, password) {
        this.loadingStateChanged.next(true);
        const user: User = { fullName: fullName, email: email, password: password };
        this.http.post<{ message: string, res: any }>('http://localhost:8080/user/signup', user)
            .subscribe(result => {
                this.loadingStateChanged.next(false);
                console.log(result);
                this.router.navigate(['/login']);
                this.uiService.showSnackBar(result.message, null, 'success', 2000);
            }, err => {
                this.loadingStateChanged.next(false);
                console.log(err);
                this.uiService.showSnackBar(err.error.message, null, 'error', 5000);
            })
    }

    autoAuthUser() {
        const authInfo = this.getAuthData();
        if (!authInfo) {
            return;
        }
        const now = new Date();
        const timeDiff = authInfo.expirationDate.getTime() - now.getTime();
        if (timeDiff > 0) {
            this.token = authInfo.token;
            this.fullName = authInfo.fullName;
            this.fullNameListener.next(this.fullName);
            this.authStatusListener.next(true);
            this.isAuthenticated = true;
            this.setAuthTimer(timeDiff / 1000);
        }
    }

    private setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }

    login(email, password) {
        this.loadingStateChanged.next(true);
        const user: User = { email: email, password: password };
        this.http.post<{ message: string, token: string, expiresIn: number, fullName: string }>('http://localhost:8080/user/login', user)
            .subscribe(result => {
                this.loadingStateChanged.next(false);
                console.log(result);
                const fullName = result.fullName;
                this.fullName = fullName;
                this.fullNameListener.next(fullName);
                const token = result.token;
                this.token = token;
                if (token) {
                    const expiresInDuration = result.expiresIn;
                    this.setAuthTimer(expiresInDuration);
                    this.authStatusListener.next(true);
                    this.isAuthenticated = true;
                    const now = new Date();

                    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                    this.saveAuthData(token, expirationDate, fullName);

                    this.router.navigate(['/myNotes']);
                    this.uiService.showSnackBar(result.message, null, 'success', 2000);
                } else {
                    alert('Token error!!');
                }
            }, err => {
                this.loadingStateChanged.next(false);
                console.log(err);
                this.uiService.showSnackBar(err.error.message, null, 'error', 5000);
            })
    }

    logout() {
        this.token = null;
        this.fullName = '';
        this.fullNameListener.next('');
        this.authStatusListener.next(false);
        this.isAuthenticated = false;
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/login']);
        this.uiService.showSnackBar('You are Logged Out', null, 'success', 800);
    }

    private saveAuthData(token: string, expirationDate: Date, fullName: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
        localStorage.setItem('fullName', fullName);
    }

    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('fullName');
    }

    private getAuthData() {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration');
        const fullName = localStorage.getItem('fullName');
        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate),
            fullName: fullName
        }
    }
}