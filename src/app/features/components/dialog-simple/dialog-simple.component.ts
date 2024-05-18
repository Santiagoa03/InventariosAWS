import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-simple',
  templateUrl: './dialog-simple.component.html',
  styleUrls: ['./dialog-simple.component.css'],
})
export class DialogSimpleComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogSimpleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string; showCloseButton: boolean }
  ) {}

  onClickCancel(): void {
    this.dialogRef.close();
  }
}
