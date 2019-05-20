import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  config = json;
  private loadWizard = false;
  loadMyWizard(){
     this.loadWizard = true;
  }
}


var json =
{
  question: "Do you need a shared data storage ?:",
  children: [
    {
      value: "Yes",
      question: "Are multiple parties involved in writing data?:",
      children: [
        {
          value: "Yes",
          question: "Do you need to change/delete the original data once written ?:",
          children: [
            { value: "Yes", result: {  description: "Use a database system", type: "negative" } },
            { 
              value: "No", 
              question: "Do you worry about the time taken to commit data  ?",
              children: [
                { value: "Yes", result: { description: "Use a database system", type: "negative" } },
                { 
                  value: "No", 
                  question: "Do you want a tamper proof log of all actions happening in the data store ?",
                  children:[
                        {
                          value:"Yes",
                          question: "Do you want to eliminate entities controlling the data store ? ",
                          children:[
                            { value: "Yes", result: {description: "There's a potential use case for DLT", type: "positive" } },
                            { value: "No", result: {description: "Use a managed db system", type: "negative" } }
                          ]
                        },
                        {value:"No", result: {description: "Use a database system", type: "negative" }}
                  ]
                }
              ]
            }
          ]
        },
        { value: "No", result: {description: "Use a database system", type: "negative" } }
        
      ]
    },

    { value: "No", result: {description: "Use a spreadsheet", type: "negative"} },
  ]
};
