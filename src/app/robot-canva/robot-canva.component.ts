import { Component, OnInit,OnDestroy,ViewChild, ElementRef } from '@angular/core';
import { CanvaServiceService } from '../services/canva-service.service';
import { Subscription } from 'rxjs/Subscription';

//interfaces and enums import
import {CanvaPos} from '../interfaces/canva-pos'
import {Canva} from '../interfaces/canva';
import {Move} from '../enums/move.enum';

//monifest import
import {SETTINGS} from '../data/manifest';


@Component({
  selector: 'app-robot-canva',
  templateUrl: './robot-canva.component.html',
  styleUrls: ['./robot-canva.component.css'],
})
export class RobotCanvaComponent implements OnDestroy {

  @ViewChild('myCanvas') myCanvas: ElementRef;
  public canvaObject: Canva;
  private subscription: Subscription;
  private sourceImg;
  private positionHelper;
  
  constructor(private canvaService: CanvaServiceService) { 
    this.handleMoveOnCanva();
  }

  ngAfterViewInit(): void {
    this.canvaObject={
      context:(<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d'),
      width:500,
      height:500
    }
    //load Img
    this.sourceImg= new Image();
    this.sourceImg.src = SETTINGS.spriteSRC; 
    this.sourceImg.onload = ()=>
    {
         this.canvaObject.context.drawImage(this.sourceImg, 0, 0,25,25);
    }
  }

  private handleMoveOnCanva(){
    this.subscription = this.canvaService.observableCanva().subscribe(data => {
      this.positionHelper=data.position;
      this.animateMove();
      console.log('canva component',data);    
     });
  }


  private animateMove(){
      this.canvaObject.context.clearRect(0, 0, this.canvaObject.width, this.canvaObject.height);  // clear canvas      
      this.canvaObject.context.drawImage(this.sourceImg, this.positionHelper.oldX, this.positionHelper.oldY,25,25);// draw image at current position
      if(this.positionHelper.oldX != this.canvaService.getActualPoistion().currentX || 
          this.positionHelper.oldY != this.canvaService.getActualPoistion().currentY){
            if(this.positionHelper.XPosChange!= Move.NOCHANGE){
              this.positionHelper.oldX=(this.positionHelper.XPosChange==Move.INCREASE) ? 
                this.positionHelper.oldX+SETTINGS.animateStep : this.positionHelper.oldX-SETTINGS.animateStep;
            } else if(this.positionHelper.YPosChange!= Move.NOCHANGE){
              this.positionHelper.oldY=(this.positionHelper.YPosChange==Move.INCREASE) ? 
                this.positionHelper.oldY+SETTINGS.animateStep : this.positionHelper.oldY-SETTINGS.animateStep;        
            }
            requestAnimationFrame(this.animateMove.bind(this));
      }  
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
}

}
