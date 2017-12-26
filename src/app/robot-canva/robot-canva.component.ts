import { Component, OnInit,OnDestroy,ViewChild, ElementRef } from '@angular/core';
import { CanvaServiceService } from '../services/canva-service.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-robot-canva',
  templateUrl: './robot-canva.component.html',
  styleUrls: ['./robot-canva.component.css'],
})
export class RobotCanvaComponent implements OnInit, OnDestroy {

  @ViewChild('myCanvas') myCanvas: ElementRef;
  public context: CanvasRenderingContext2D;
  subscription: Subscription;
  
  constructor(private canvaService: CanvaServiceService) { 
    this.subscription = this.canvaService.observableCanva().subscribe(data => {
       this.handleMoveOnCanva(data);
      });
  }

  ngAfterViewInit(): void {
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
    //load Img
    let robotImg= new Image();
    robotImg.src = 'assets/testo.jpg'; 
    robotImg.onload = ()=>
    {
         this.context.drawImage(robotImg, 0, 0,30,30);
         this.canvaService.setCanvaContext(this.context);
    }
  }

  private handleMoveOnCanva(data){
    console.log('canva component',data);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}

}
