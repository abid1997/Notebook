import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  loadingSubs: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loadingSubs = this.authService.loadingStateChanged
      .subscribe(ls => this.isLoading = ls);
  }

  onSubmit(f: NgForm) {
    this.authService.login(f.value.email, f.value.password);
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }
}
