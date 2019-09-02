import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {WizardComponent} from './wizard/wizard.component';
import { MatStepper } from '@angular/material/stepper';
import * as d3 from 'd3';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { state } from '@angular/animations';

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
    {"name" : "DLT configuration ?", "config" : json2, "id":"two" }];

    // {"name" : "Type of DLT ?", "config" : json2, "id":"three" }, 
    // {"name" : "Summary", "config" : json2, "id":"four" }

  user_response = 0;
  private loadWizard = false;
  loadNext = 0;
  user_platform = "";
  done = 0;

  //mandotray for catching the component state
  setLoadNext(event){
    this.loadNext = event;
  }

  setUserPlatform(event){
    this.user_platform = event;
  }

  loadMyWizard(){
     this.loadWizard = true;
     this.isButtonVisible = false;
     
  }

  ngAfterContentInit() {

    //this.loadMyWizard();
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

  public onStepChanged(event: any): void {
    console.log(event.selectedIndex);
    if(event.selectedIndex==3){
        console.log("Last");
        this.done =1;
    }
    else{
        this.done = 0;
    }
  }

  next(stepper: MatStepper){
    if(this.loadNext != 0){
      this.user_response = this.loadNext;
      stepper.selected.completed = true;
      stepper.next();
      this.loadNext = 0;
    }
    else if(this.user_platform !=""){
      stepper.selected.completed = true;
      stepper.next();
    }
    else{
    //   stepper.selected.completed = true;
    //   stepper.next();
      //comment above
    }
  }
}

var core = {
    "label":"Are multiple parties involved in writing data?",
    "info":"Are there more than one parties who are producing data that needed to be stored, traceback, or audited",
    "type":"split",
    "children":[
                {
                    "label":"Yes",
                    "type":"split",
                    "children":[
                        {
                            "label":"Do you need to change/delete the original data once written ? ",
                            "info":"Due to the immutability, it is not possible to delete or change the original data. But it is possible to append the changes or invalidate.",
                            "type":"split",
                            "children":[
                                {
                                    "label":"Yes",
                                    "type":"split",
                                    "children":[
                                            {
                                                "label":"DLT might not be a solution",
                                                "type":"leaf",
                                                "info":"Click on your decision again to go back"
                                            }
                                    ]
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
                                                    "type":"split",
                                                    "children":[
                                                            {
                                                                "label":"DLT might not be a solution",
                                                                "type":"leaf",
                                                                "info":"Click on your decision again to go back"
                                                            }
                                                    ]
                                                },
                                                {
                                                    "label":"No",
                                                    "type":"split",
                                                    "children":[
                                                        {
                                                            "label":"There's a potential use case for DLT",
                                                            "type":"end",
                                                            "info":"Click on the arrow button to proceed",
                                                            "output" : 1
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
                    "type":"split",
                    "children":[
                            {
                                "label":"DLT might not be a solution",
                                "type":"leaf",
                                "info":"Click on your decision again to go back"
                            }
                    ]
                }
                
    ]
};

var json1 =
{
    "label":"Do you need a shared data storage ? ",
    "info":"Do they need to share data in order to coordinate with the entities (could be people, companies, devices or software)  participating in the business scenario?",
    "type":"split",
    "children":[
       {
          "label":"Yes",
          "type":"split",
          "children":[
             {
                "label":"Do you want a tamper proof log of all actions happening in the data store ? ",
                "info" : "Need for maintaining an immutable log of actions performed on data stored.",
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
                              "info" : "Are there mutual predefined policies and guidelines, enforceable by law, between two or more parties that needed to be followed on performing actions on data?",
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
                                                      "info" : "Do the actions performed needed to be traced back to the actor and all the other relevant information.",
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
                                                                    "label":"Do you need visibility of the transactions across all parties? ",
                                                                    "info":"Every action performed on the data needed to be transparent across all the readers and writers.",
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
                                                                                  "type":"leaf",
                                                                                  "info":"Click on your decision again to go back"
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
        "type":"split",
        "children":[
                {
                    "label":"DLT might not be a solution",
                    "type":"leaf",
                    "info":"Click on your decision again to go back"
                }
            ]
        }
    ]
};


var json2 =  
 {
    "label": "Do you need public verifialbility?", 
    "type" : "split",
    "info" : "The choice between the public and private version of the DLT depends on whether we need public verifiability or public read access.",
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
                                    "type" : "end",
                                    "output" : 2,
                                    "info":"Click on the arrow button to proceed",
                                }
                            ]    
                        },
                        {
                            "label": "No", 
                            "type" : "split",
                            "children" : [
                                {
                                    "label": "Use a Public Permissioned DLT", 
                                    "type" : "end",
                                    "output" : 3,
                                    "info":"Click on the arrow button to proceed",   
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
                  "type" : "end",
                  "output" : 4,
                  "info":"Click on the arrow button to proceed",   
              }
          ]    
        }
        
    ]     
  }


  
