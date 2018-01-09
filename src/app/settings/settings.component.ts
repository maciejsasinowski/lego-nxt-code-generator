import { Component, OnInit } from '@angular/core';
import {SETTINGS} from '../data/manifest';
import { BrowserModule } from '@angular/platform-browser';
import { CanvaServiceService } from '../services/canva-service.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public leftEngine:string;
  public rightEngine:string;
  public direction :string;

  public lEngines= SETTINGS.leftEngine;
  public directions=[
    {data:"FWD"},
    {data:"REV"},
    {data:"LEFT"},
    {data:"RIGHT"},
  ]

  constructor(private canvaService: CanvaServiceService) { }

  ngOnInit() {
  }

  upDate(){
    this.canvaService.updateSettings({
      lEngine:this.leftEngine,
      rEngine:this.rightEngine,
      dir:this.direction,
    });
  }

}
