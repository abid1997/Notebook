import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material";
import { NewNoteComponent } from "./new-note/new-note.component";
import { NotesService } from "./notes.service";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  editMode = false;
  editSubs: Subscription;
  loadingSubs: Subscription;
  constructor(public dialog: MatDialog, public notesService: NotesService) { }

  ngOnInit() {
    this.notesService.getNotes();
    this.loadingSubs = this.notesService.loadingStateChanged
      .subscribe(ls => this.isLoading = ls);
  }

  openDialog() {
    let dialogRef = this.dialog.open(NewNoteComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if (result) {
        this.notesService.addNote(result);
      }
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }
}
