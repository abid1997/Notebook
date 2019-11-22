import { Component, OnInit, OnDestroy } from "@angular/core";
import { NotesService } from "../notes.service";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-notes-list",
  templateUrl: "./notes-list.component.html",
  styleUrls: ["./notes-list.component.css"]
})
export class NotesListComponent implements OnInit, OnDestroy {
  notesSubs: Subscription;
  notes = [];
  isLoading: boolean;

  constructor(private notesService: NotesService) { }

  ngOnInit() {
    this.notesSubs = this.notesService.notesChanged.subscribe(notes => {
      this.notes = notes;
    });
  }

  ngOnDestroy() {
    this.notesSubs.unsubscribe();
  }
}
