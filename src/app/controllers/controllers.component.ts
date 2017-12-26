import { Component, OnInit } from '@angular/core';
import { CanvaServiceService } from '../services/canva-service.service';


@Component({
  selector: 'app-controllers',
  templateUrl: './controllers.component.html',
  styleUrls: ['./controllers.component.css'],
})
export class ControllersComponent implements OnInit {

  constructor(private canvaService: CanvaServiceService) { 

  }

  ngOnInit() {
  }

  public move = (moveType)=> {  
    this.canvaService.move(moveType);
  }

}
