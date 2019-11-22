import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  loadingSubs: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loadingSubs = this.authService.loadingStateChanged
      .subscribe(ls => this.isLoading = ls);
  }

  onSubmit(f: NgForm) {
    this.authService.signup(f.value.fullName, f.value.email, f.value.password);
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }
}
