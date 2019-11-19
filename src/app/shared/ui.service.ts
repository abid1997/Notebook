import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({ providedIn: 'root' })
export class UIService {
    constructor(private snackbar: MatSnackBar) { }

    showSnackBar(message, action, myclass, duration) {
        this.snackbar.open(message, action, {
            duration: duration,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: [myclass]
        })
    }
}