import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material";
import { NotesService } from "../notes.service";
import { EditNoteComponent } from "./edit-note/edit-note.component";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-note",
  templateUrl: "./note.component.html",
  styleUrls: ["./note.component.css"]
})
export class NoteComponent implements OnInit, OnDestroy {
  @Input() note: { _id: any; title: string; content: string };
  editMode = false;
  editSubs: Subscription;
  constructor(public router: Router, public notesService: NotesService) { }

  ngOnInit() {
    console.log(this.note);
    this.editSubs = this.notesService.editModeSubject.subscribe(e => this.editMode = e);
  }

  // onEdit(noteId: any) {
  //   this.router.navigate(['/editNote', noteId]);
  // }

  onDelete(noteId: any) {
    this.notesService.deleteNote(noteId);
  }

  ngOnDestroy() {
    this.editSubs.unsubscribe();
  }
}
