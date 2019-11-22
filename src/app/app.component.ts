import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material";
import { NewNoteComponent } from "./new-note/new-note.component";
import { NotesService } from "./notes.service";
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.autoAuthUser();
  }

}
