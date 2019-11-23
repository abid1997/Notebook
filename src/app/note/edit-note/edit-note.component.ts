import { Component, OnInit, Inject, Input, OnDestroy, ViewChild, AfterViewInit } from "@angular/core";
import { Note } from '../../model/note.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotesService } from '../../notes.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: "app-edit-note",
  templateUrl: "./edit-note.component.html",
  styleUrls: ["./edit-note.component.css"]
})
export class EditNoteComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  loadingSubs: Subscription;
  @ViewChild('f', { static: false }) editForm: NgForm;
  constructor(public notesService: NotesService, private router: Router) { }

  ngOnInit() {
    this.loadingSubs = this.notesService.loadingStateChanged.subscribe(ls => this.isLoading = ls);
  }

  onSubmit(f: NgForm) {
    console.log(f.value);
    this.notesService.updateNote(this.notesService.selectedNote._id, f.value.title, f.value.content);
    this.notesService.editting = false;
  }

  onClose() {
    this.router.navigate(['/myNotes']);
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }
}
