import { Component, OnInit, Input, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})



export class SummaryComponent implements OnInit {

  private _user_platform: object;
  private _user_config:String;
  private _jsonURL = 'assets/json/consensus.json';
  private consensus_json: object;
  private _selected_consensus:object;
  

   @Input() 
   set user_platform(value) {
      this._user_platform = value;
      if(this._user_platform){
        this._selected_consensus = this.consensus_json[value["consensus"]];
        console.log(this.consensus_json)
        console.log(this._user_platform);
      }
      
      //console.log(this.consensus_json[this._user_platform.consensus])
   }

   @Input() 
   set user_config(value) {
      if(value==4)
        this._user_config = "Private Permissioned";
      else if(value==3)
        this._user_config = "Public Permissioned";
      else if(value==2)
        this._user_config = "Public Permissionless";
      console.log(this._user_config);
   }

   public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

  constructor(private http: HttpClient) {
      this.getJSON().subscribe(data => {
         this.consensus_json = data;
      });
  }

  ngOnInit() {
    console.log(this._user_platform);
  }

}
