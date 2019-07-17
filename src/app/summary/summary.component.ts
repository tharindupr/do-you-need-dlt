import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  private _user_platform: object;
  private _user_config:String;
   
   @Input() 
   set user_platform(value) {
      this._user_platform = value;
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


  constructor() { }

  ngOnInit() {
    console.log(this._user_platform);
  }

}
