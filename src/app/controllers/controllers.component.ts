import { Component, OnInit } from '@angular/core';
import { CanvaServiceService } from '../services/canva-service.service';

import {CodeGenerationLogic} from '../data/CodeGenerationLogic';
import {SETTINGS} from '../data/manifest';


@Component({
  selector: 'app-controllers',
  templateUrl: './controllers.component.html',
  styleUrls: ['./controllers.component.css'],
})
export class ControllersComponent {

  constructor(private canvaService: CanvaServiceService) { 
  }

  ngOnInit() {
  }

  public move = (moveType)=> {  
    this.canvaService.move(moveType);
  }

  public generateCode(){
    
    let settings=this.canvaService.getSettings();
    let cGL = new CodeGenerationLogic(this.canvaService.getMoveList(),settings.lEngine,settings.rEngine);
    console.log(cGL);
    cGL.analyzeDirections(settings.dir);
    
    this.canvaService.sendRequest(cGL.generateOutputCode()).
        subscribe((data)=>{
          this.canvaService.resetMoves();
          console.log(data.json().code);
          alert(data.json().code);
          this.canvaService.resetMoves();
        });
  }

}
