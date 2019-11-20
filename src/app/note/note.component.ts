import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material";
import { NotesService } from "../notes.service";
import { EditNoteComponent } from "./edit-note/edit-note.component";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Note } from '../model/note.model';

@Component({
  selector: "app-note",
  templateUrl: "./note.component.html",
  styleUrls: ["./note.component.css"]
})
export class NoteComponent implements OnInit, OnDestroy {
  @Input() note: { _id: any; title: string; content: string };
  editSubs: Subscription;
  constructor(public router: Router, public notesService: NotesService) { }

  ngOnInit() {

  }

  onEdit(note: Note) {
    this.notesService.selectedNote = note;
    this.router.navigate(['/editNote']);
    this.notesService.editting = true;
  }

  onDelete(noteId: any) {
    this.notesService.deleteNote(noteId);
  }

  ngOnDestroy() {
    //this.editSubs.unsubscribe();
  }
}
