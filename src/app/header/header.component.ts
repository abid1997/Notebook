import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  nameSubs: Subscription;
  subs: Subscription;
  isAuth: boolean;
  fullName: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.fullName = this.authService.getFullName();
    this.isAuth = this.authService.getIsAuth();
    this.nameSubs = this.authService.fullNameListener.subscribe(n => this.fullName = n);
    this.subs = this.authService.getAuthStatusListener().subscribe(as => this.isAuth = as);
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
