import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RobotCanvaComponent } from './robot-canva/robot-canva.component';
import { HistoryComponentComponent } from './history-component/history-component.component';
import { SettingsComponent } from './settings/settings.component';
import { ControllersComponent } from './controllers/controllers.component';

import {SelectModule} from 'angular2-select';
import { FormsModule } from '@angular/forms';

import { CanvaServiceService } from './services/canva-service.service';


@NgModule({
  declarations: [
    AppComponent,
    RobotCanvaComponent,
    HistoryComponentComponent,
    SettingsComponent,
    ControllersComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SelectModule,
    FormsModule
  ],
  providers: [CanvaServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
