import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";
import { NoteComponent } from "./note/note.component";
import { NotesListComponent } from "./notes-list/notes-list.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material.module";
import { AppRoutingModule } from "./app-routing.module";
import { NewNoteComponent } from "./new-note/new-note.component";
import { EditNoteComponent } from "./note/edit-note/edit-note.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderComponent } from './shared/loader/loader.component';
import { HeaderComponent } from './header/header.component';
import { NotesMainComponent } from './notes-main/notes-main.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    NoteComponent,
    NotesListComponent,
    NewNoteComponent,
    EditNoteComponent,
    LoaderComponent,
    HeaderComponent,
    NotesMainComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [NewNoteComponent]
})
export class AppModule { }
