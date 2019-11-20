import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotesListComponent } from "./notes-list/notes-list.component";
import { EditNoteComponent } from './note/edit-note/edit-note.component';

const appRoutes: Routes = [{ path: "", component: NotesListComponent },
{ path: 'editNote', component: EditNoteComponent }];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
