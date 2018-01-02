import { Component, OnInit } from '@angular/core';
import { CanvaServiceService } from '../services/canva-service.service';

import {CodeGenerationLogic} from '../data/CodeGenerationLogic';


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
    
    let cGL = new CodeGenerationLogic(this.canvaService.getMoveList());
    cGL.analyzeDirections('FWD');
    
    this.canvaService.sendRequest(cGL.generateOutputCode()).
        subscribe((data)=>{
          console.log(data.json().code);
        });
  }

}
