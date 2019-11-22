import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { NotesService } from '../notes.service';
import { NewNoteComponent } from '../new-note/new-note.component';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-notes-main',
  templateUrl: './notes-main.component.html',
  styleUrls: ['./notes-main.component.css']
})
export class NotesMainComponent implements OnInit, OnDestroy {
  //isAuth: boolean;
  isLoading: boolean;
  editMode = false;
  editSubs: Subscription;
  loadingSubs: Subscription;
  //authSubs: Subscription;
  constructor(public dialog: MatDialog, public notesService: NotesService, public authService: AuthService) { }

  ngOnInit() {
    this.notesService.getNotes();
    this.loadingSubs = this.notesService.loadingStateChanged
      .subscribe(ls => this.isLoading = ls);
    // this.authSubs = this.authService.getAuthStatusListener().subscribe(as => this.isAuth = as);
  }

  openDialog() {
    let dialogRef = this.dialog.open(NewNoteComponent, {
      height: '480px',
      width: '600px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if (result) {
        this.notesService.addNote(result);
      }
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
    //this.authSubs.unsubscribe();
  }
}
