import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  description: string;
  type: string;
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  icon : string;
  constructor(public dialogRef: MatDialogRef<ResultComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    if(data.type=="negative"){
      this.icon = "close";
    }
    else{
      this.icon = "check";
    }
  }

  ngOnInit() {
  }

  onBackClick(): void {
    this.dialogRef.close();
  }


}
