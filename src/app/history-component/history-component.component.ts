import { Component,OnDestroy,ViewChild,ElementRef } from '@angular/core';
import { CanvaServiceService } from '../services/canva-service.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-history-component',
  templateUrl: './history-component.component.html',
  styleUrls: ['./history-component.component.css']
})
export class HistoryComponentComponent implements OnDestroy {

  private subscription: Subscription;
  public moveList:string[];
  @ViewChild('autoScroll') private myScrollContainer: ElementRef;

  constructor(private canvaService: CanvaServiceService) { 
    this.moveList=[];
    this.handleHistory();
  }

  handleHistory(){
    this.subscription = this.canvaService.observableCanva().subscribe(data => {
      this.moveList.push(data.direction);
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight+100;
      console.log('history component called',data);
     });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}
}
