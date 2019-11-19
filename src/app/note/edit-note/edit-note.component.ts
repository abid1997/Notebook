import { Component, OnInit, Inject, Input, OnDestroy, ViewChild, AfterViewInit } from "@angular/core";
import { Note } from '../../model/note.model';
import { ActivatedRoute, Params } from '@angular/router';
import { NotesService } from '../../notes.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: "app-edit-note",
  templateUrl: "./edit-note.component.html",
  styleUrls: ["./edit-note.component.css"]
})
export class EditNoteComponent implements OnInit, OnDestroy, AfterViewInit {
  show = false;
  noteId: any;
  selectedNote: Note;
  subs: Subscription;
  @ViewChild('f', { static: false }) editForm: NgForm;
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private notesService: NotesService) {
    this.notesService.editModeSubject.next(true);
  }

  ngOnInit() {
    this.subs = this.activatedRoute.params.subscribe((p: Params) => {
      this.noteId = p.noteId;
      this.http.get('http://localhost:8080/feed/note/' + this.noteId)
        .subscribe(
          (result: { message: string, note: Note }) => {
            console.log(result);
            this.selectedNote = result.note;
          }, err => {
            console.log(err);
          })

    });
  }

  ngAfterViewInit() {
    this.show = true;
    setTimeout(() => {
      this.editForm.setValue({
        title: this.selectedNote.title,
        content: this.selectedNote.content
      })
    }, 800)
  }

  onSubmit(f: NgForm) {
    console.log(f.value);
    this.notesService.updateNote(this.noteId, f.value.title, f.value.content);
    setTimeout(() => {
      this.show = false;
    }, 1000);
  }

  ngOnDestroy() {
    this.notesService.editModeSubject.next(false);
    this.subs.unsubscribe();
  }
}
