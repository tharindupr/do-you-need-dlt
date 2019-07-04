import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {WizardComponent} from './wizard/wizard.component';
import { MatStepper } from '@angular/material/stepper';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit{
  private isButtonVisible = true;
  config1 = json1;
  config2 = json2;
  configurations = [
    {"name" : "Will DLT suites you ?", "config" : json1, "id":"one" }, 
    {"name" : "DLT configuration ?", "config" : json2, "id":"two" }, 
    {"name" : "Type of DLT ?", "config" : json2, "id":"three" }, 
    {"name" : "Summary", "config" : json2, "id":"four" }];
  private loadWizard = false;
  loadNext = false;

  //mandotray for catching the component state
  setLoadNext(event){
    this.loadNext = event;
  }

  loadMyWizard(){
     this.loadWizard = true;
     this.isButtonVisible = false;
     
  }

  ngAfterContentInit() {
  }

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({

    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['']
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['']
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['']
    });

    
  }


  next(stepper: MatStepper){
    if(this.loadNext){
      stepper.selected.completed = true;
      stepper.next();
    }
    else{
      console.log("hello");
      stepper.selected.completed = true;
      stepper.next();
      //comment above
    }
  }
  
  
}

var core = {
    "label":"Are multiple parties involved in writing data?",
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
                                            "label":"Are all writers trusted ? ",
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
                                                            "label":"There's a potential use case for DLT",
                                                            "type":"end"
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
};


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
                "label":"Do you want a tamper proof log of all actions happening in the data store ? ",
                "type":"split",
                "children":[
                    {
                       "label":"Yes",
                       "type":"split",
                       "children":[core]
  
                    },
                    {
                        "label":"No",
                        "type":"split",
                        "children":[
                          {
                              "label":"Do you  manage contractual agreements on data? ",
                              "type":"split",
                              "children":[
                                          {
                                              "label":"Yes",
                                              "type":"split",
                                              "children":[core]
                                          },
                                          {
                                              "label":"No",
                                              "type":"split",
                                              "children":[
                                                  {
                                                      "label":"Do you need strong audit trails across organizations ?",
                                                      "type":"split",
                                                      "children":[
                                                          {
                                                              "label":"Yes",
                                                              "type":"split",
                                                              "children":[core]
                                                          },
                                                          {
                                                              "label":"No",
                                                              "type":"split",
                                                              "children":[
                                                                  {
                                                                    "label":"Do you need visibility of the across all parties? ",
                                                                    "type":"split",
                                                                    "children":[
                                                                      {
                                                                          "label":"Yes",
                                                                          "type":"split",
                                                                          "children":[core]
                                                                      },
                                                                      {
                                                                          "label":"No",
                                                                          "type":"split",
                                                                          "children":[
                                                                              {
                                                                                  "label":"DLT might not be a solution",
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
};


var json2 =  
 {
    "label": "Do you need public verifialbility?", 
    "type" : "split",
    "children":[
        {
            "label": "Yes", 
            "type" : "split",
            "children":[
                {
                    "label": "Allow everyone to write data?", 
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
        },
        {
          "label": "No", 
          "type" : "split",
          "children" : [
              {
                  "label": "Use a Private Permissioned DLT", 
                  "type" : "end"   
              }
          ]    
        }
        
    ]     
  }


  
