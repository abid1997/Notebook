import { NgModule } from "@angular/core";
import {
  MatExpansionModule,
  MatButtonModule,
  MatDialogModule,
  MatSnackBarModule
} from "@angular/material";

@NgModule({
  imports: [MatExpansionModule, MatButtonModule, MatDialogModule, MatSnackBarModule],
  exports: [MatExpansionModule, MatButtonModule, MatDialogModule, MatSnackBarModule]
})
export class MaterialModule { }
