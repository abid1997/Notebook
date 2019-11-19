import { Component, OnInit } from "@angular/core";
import { Note } from "../model/note.model";

@Component({
  selector: "app-new-note",
  templateUrl: "./new-note.component.html",
  styleUrls: ["./new-note.component.css"]
})
export class NewNoteComponent implements OnInit {
  note: Note = { title: "", content: "" };
  constructor() {}

  ngOnInit() {}
}
