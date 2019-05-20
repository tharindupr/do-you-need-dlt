import { Component, OnInit, Input, Inject } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ResultComponent} from '../result/result.component';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {

  //animal
  animal: string;
  name: string;

  @Input() wizardConfig: object;
  options: FormGroup;
  questions =[];
  answers = [];

  constructor(fb: FormBuilder, public dialog: MatDialog) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
      
  }


  generateNextQuestion = function(json){

     if(json['question']){
      this.questions.push(json);
      //console.log(json['question']);
     }

     else{
        //console.log(json['result']);
        this.openDialog(json['result']);
      
     }
  
  }

  newValue = function(json) {
    //this.answers.push(value);
    this.generateNextQuestion(json);
  } 

 
  ngOnInit() {

  }

  openDialog(descriptionData): void {
    console.log(descriptionData)
    const dialogRef = this.dialog.open(ResultComponent, {data: {description: descriptionData.description, type: descriptionData.type}});
  }

}




