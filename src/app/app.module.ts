import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule, MatInputModule, MatIconModule, MatSidenavModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatStepperModule, 
  MatSelectModule, MatRadioModule, MatDialogModule, MatChipsModule, MatListModule, MatTableModule, MatAccordion, MatExpansionModule, MatSortModule, MatPaginatorModule, MatGridListModule} from '@angular/material';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { WizardComponent } from './wizard/wizard.component';
import { ResultComponent } from './result/result.component';
import { TableComponent } from './table/table.component';
import { SummaryComponent } from './summary/summary.component';

import { NgxFabModule } from 'ngx-fab';

@NgModule({
  declarations: [
    AppComponent,
    WizardComponent,
    ResultComponent,
    TableComponent,
    SummaryComponent
  ],
  entryComponents: [ResultComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxFabModule,
    
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
    MatListModule,
    MatTableModule,
    FormsModule, 
    MatExpansionModule, MatSortModule, MatPaginatorModule, MatGridListModule,

    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
