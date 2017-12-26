import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import {CanvaPos} from '../interfaces/canva-pos'

@Injectable()
export class CanvaServiceService {
  private canvaObservable;
  private canvaContex;
  private canvaPosObj:CanvaPos;
  
      constructor(){
        this.canvaObservable= new Subject<any>(); 
        this.canvaContex=null;
        this.canvaPosObj={oldX:-1,oldY:-1,currentX:0,currentY:0}
      }

      move(dir: string) {
        switch(dir){
          case 'f':
          break;      
          case 'l':
          break;      
          case 'r':
          break;      
          case 'b':
          break;
        }
          this.canvaObservable.next({ direction: dir,position:this.canvaPosObj });
      }
    
      observableCanva(): Observable<any> {
          return this.canvaObservable.asObservable();
      }

      getActualPoistion(){
        return this.canvaPosObj;
      }
      setActualPoistion(pos: CanvaPos){
        this.canvaPosObj=pos;
      }
      
      setCanvaContext(context){
        this.canvaContex=context;
      }

}
