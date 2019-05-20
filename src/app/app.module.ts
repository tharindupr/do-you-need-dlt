import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule, MatInputModule, MatIconModule, MatSidenavModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatStepperModule, 
  MatSelectModule, MatRadioModule, MatDialogModule, MatChipsModule} from '@angular/material';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { WizardComponent } from './wizard/wizard.component';
import { ResultComponent } from './result/result.component'

@NgModule({
  declarations: [
    AppComponent,
    WizardComponent,
    ResultComponent
  ],
  entryComponents: [ResultComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
    //Material modules
    MatButtonModule, 
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    MatChipsModule,

    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
