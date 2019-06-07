import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit{
  config1 = json1;
  config2 = json2;
  private loadWizard = false;
  loadMyWizard(){
     this.loadWizard = true;
  }

  ngAfterContentInit() {
  }

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['']
    });
  }
  
}


var json1 =
{
  "label":"Do you need a shared data storage ? ",
  "type":"split",
  "children":[
     {
        "label":"Yes",
        "type":"split",
        "children":[
           {
              "label":"Are multiple parties involved in writing data? ",
              "type":"split",
              "children":[
                  {
                     "label":"Yes",
                     "type":"split",
                     "children":[
                          {
                          "label":"Do you need to change/delete the original data once written ? ",
                          "type":"split",
                          "children":[
                              {
                              "label":"Yes",
                              "type":"leaf"
                              },
                              {
                                  "label":"No",
                                  "type":"split",
                                   "children":[
                                      {
                                          "label":"Do you worry about the time taken to commit data  ?",
                                          "type":"split",
                                          "children":[
                                              {
                                                  "label":"Yes",
                                                  "type":"leaf"
                                              },
                                              {
                                                  "label":"No",
                                                  "type":"split",
                                                  "children":[
                                                      {
                                                          "label":"Do you want a tamper proof log of all actions happening in the data store ?",
                                                          "type":"split",
                                                          "children":[
                                                              {
                                                                  "label":"Yes",
                                                                  "type":"split",
                                                                  "children":[
                                                                      {
                                                                          "label":"Do you want to eliminate entities controlling the data store ?",
                                                                          "type":"split",
                                                                          "children":[
                                                                              {
                                                                                  "label":"Yes",
                                                                                  "type":"split",
                                                                                  "children":[
                                                                                      {
                                                                                          "label":"There's a potential use case for DLT",
                                                                                          "type":"end"
                                                                            
                                                                                      }
                                                                                  ]
                                                                              },
                                                                              {
                                                                                  "label":"No",
                                                                                  "type":"leaf"
                                                                              }
                                                                          ]
                                                                      }

                                                                  ]
                                                              },
                                                              {
                                                                  "label":"No",
                                                                  "type":"leaf"
                                                              }

                                                          ]
                                                      }
                                                      
                                                  ]  
                                              }
                                              
                                          ]  
                                      }
                                   ]
                              }
                          ]
                          }
                      ]
                  },
                  {
                      "label":"No",
                      "type":"leaf"
                  }
                  
               ]
           }
        ]
     },
     {
      "label":"No",
      "type":"leaf"
     }
  ]
};


var json2 =  
 {
    "label": "Does everyone need to have equal rights?", 
    "type" : "split",
    "children":[
        {
          "label": "Yes", 
          "type" : "split",
          "children" : [
              {
                  "label": "Use a Private Permissioned DLT", 
                  "type" : "end"   
              }
          ]    
        },
        {
          "label": "No", 
          "type" : "split",
          "children":[
              {
                  "label": "Allow everyone to write data ?", 
                  "type" : "split",
                  "children":[
                      {
                          "label": "Yes", 
                          "type" : "split",
                          "children" : [
                              {
                                  "label": "Use a Public Permission-less DLT", 
                                  "type" : "end"   
                              }
                          ]    
                      },
                      {
                          "label": "No", 
                          "type" : "split",
                          "children" : [
                              {
                                  "label": "Use a Public Permissioned DLT", 
                                  "type" : "end"   
                              }
                          ]    
                      }
                  ]
              }
          ]   
        }
    ]     
  }

