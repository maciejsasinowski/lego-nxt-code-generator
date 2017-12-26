import { Component, OnInit } from '@angular/core';
import { CanvaServiceService } from '../services/canva-service.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-history-component',
  templateUrl: './history-component.component.html',
  styleUrls: ['./history-component.component.css']
})
export class HistoryComponentComponent implements OnInit {

  subscription: Subscription;

  constructor(private canvaService: CanvaServiceService) { 
    this.subscription = this.canvaService.observableCanva().subscribe(data => {
       this.updateHistory(data);
      });
  }

  ngOnInit() {
  }


  updateHistory(data){
    console.log('history component called',data);
  }
}
