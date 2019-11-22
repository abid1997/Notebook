import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotesListComponent } from "./notes-list/notes-list.component";
import { EditNoteComponent } from './note/edit-note/edit-note.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { NotesMainComponent } from './notes-main/notes-main.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  // { path: "", component: NotesListComponent },
  { path: "", component: WelcomeComponent },
  { path: "myNotes", component: NotesMainComponent, canActivate: [AuthGuard] },
  { path: 'editNote', component: EditNoteComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
