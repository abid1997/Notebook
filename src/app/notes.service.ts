import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { Note } from "./model/note.model";
import { HttpClient } from '@angular/common/http';
import { UIService } from './shared/ui.service';

@Injectable({ providedIn: "root" })
export class NotesService implements OnInit {
  loadingStateChanged = new Subject<boolean>();
  editModeSubject = new Subject<boolean>();
  notesChanged = new Subject<Note[]>();
  private notes: Note[] = [];

  constructor(private http: HttpClient, private uiService: UIService) { }

  ngOnInit() { }

  getNotes() {
    this.loadingStateChanged.next(true);
    this.http.get('http://localhost:8080/feed/notes')
      .subscribe((postData: any) => {
        this.loadingStateChanged.next(false);
        this.notes = postData.notes;
        this.notesChanged.next([...this.notes]);
      }, err => {
        this.loadingStateChanged.next(false);
        console.log(err);
        this.uiService.showSnackBar('Something went wrong, try again after sometime :(', null, 'error', 5000);
      })
  }

  // getNoteById(noteId: any) {
  //   this.http.get('http://localhost:8080/feed/note/' + noteId)
  //     .subscribe((result: { message: string, note: Note }) => {
  //       console.log(result);
  //       this.selectedNote = result.note;
  //       this.noteChanged.next(this.selectedNote);
  //     }, err => {
  //       console.log(err);
  //     })
  // }

  addNote(note: Note) {
    this.loadingStateChanged.next(true);
    this.http.post('http://localhost:8080/feed/note', {
      title: note.title,
      content: note.content
    })
      .subscribe(
        (result: { message: string; result: {}; notes: Note[] }) => {
          this.loadingStateChanged.next(false);
          console.log(result);
          this.notes = result.notes;
          this.notesChanged.next([...this.notes]);
          this.uiService.showSnackBar(result.message, null, 'success', 5000);
        },
        err => {
          this.loadingStateChanged.next(false);
          console.log(err);
          this.uiService.showSnackBar('Something went wrong, try again after sometime :(', null, 'error', 5000);
        }
      )
  }

  updateNote(noteId: any, title: string, content: string) {
    this.loadingStateChanged.next(true);
    this.http.put('http://localhost:8080/feed/note/' + noteId,
      {
        title: title,
        content: content
      }
    )
      .subscribe(
        (res: any) => {
          this.loadingStateChanged.next(false);
          console.log(res);
          this.notes = res.notes;
          this.notesChanged.next([...this.notes]);
          this.uiService.showSnackBar(res.message, null, 'success', 5000);
        },
        err => {
          this.loadingStateChanged.next(false);
          console.log(err);
          this.uiService.showSnackBar('Something went wrong, try again after sometime :(', null, 'error', 5000);
        }
      );
  }

  deleteNote(noteId: any) {
    this.loadingStateChanged.next(true);
    this.http.delete('http://localhost:8080/feed/note/' + noteId)
      .subscribe((result: { message: string; notes: Note[] }) => {
        this.loadingStateChanged.next(false);
        console.log(result);
        this.notes = result.notes;
        this.notesChanged.next([...this.notes]);
        this.uiService.showSnackBar(result.message, null, 'success', 5000);
      }, err => {
        this.loadingStateChanged.next(false);
        this.uiService.showSnackBar('Something went wrong, try again after sometime :(', null, 'error', 5000);
        console.log(err);
      });
  }
}
