import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import {CanvaPos} from '../interfaces/canva-pos'
import {Move} from '../enums/move.enum';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'


import {SETTINGS} from '../data/manifest';

@Injectable()
export class CanvaServiceService {
  private canvaObservable;
  private canvaPosObj:CanvaPos;
  private moveList:string[];
  
      constructor( private http: Http){
        this.canvaObservable= new Subject<any>(); 
        this.canvaPosObj={
          oldX:-1,
          oldY:-1,
          currentX:0,
          currentY:0,
          XPosChange:Move.NOCHANGE,
          YPosChange:Move.NOCHANGE
        };
        this.moveList=[];
      }

      public move(dir: string) {
        this.prepareObjForMove();
        this.moveList.push(dir);
        switch(dir){
          case 'FWD':
            this.canvaPosObj.currentY=(this.canvaPosObj.currentY-SETTINGS.onCanvaStep > 0)?
              this.canvaPosObj.currentY-SETTINGS.onCanvaStep :0;
            this.canvaPosObj.YPosChange=Move.DECREASE;       
          break;      
          case 'LEFT':
            this.canvaPosObj.currentX=(this.canvaPosObj.currentX-SETTINGS.onCanvaStep > 0)?
              this.canvaPosObj.currentX-SETTINGS.onCanvaStep :0;  
            this.canvaPosObj.XPosChange=Move.DECREASE        
          break;      
          case 'RIGHT':
            this.canvaPosObj.currentX=(this.canvaPosObj.currentX+SETTINGS.onCanvaStep > 0)?
              this.canvaPosObj.currentX+SETTINGS.onCanvaStep :0;      
            this.canvaPosObj.XPosChange=Move.INCREASE;            
          break;      
          case 'REV':
            this.canvaPosObj.currentY=(this.canvaPosObj.currentY+SETTINGS.onCanvaStep > 0)
              ?this.canvaPosObj.currentY+SETTINGS.onCanvaStep :0;  
            this.canvaPosObj.YPosChange=Move.INCREASE;                   
          break;
        }
          this.canvaObservable.next({clearFlag:false, direction: dir,position:this.canvaPosObj });
      }

      private prepareObjForMove(){
        this.canvaPosObj.oldX=this.canvaPosObj.currentX;
        this.canvaPosObj.oldY=this.canvaPosObj.currentY;
        this.canvaPosObj.XPosChange=Move.NOCHANGE;
        this.canvaPosObj.YPosChange=Move.NOCHANGE;   
      }
    
      public observableCanva(): Observable<any> {
          return this.canvaObservable.asObservable();
      }

      public clearBoard(){
        this.canvaObservable.next({clearFlag:true, direction: null,position:null });
      }

      public getActualPoistion(){
        return this.canvaPosObj;
      }
      public setActualPoistion(pos: CanvaPos){
        this.canvaPosObj=pos;
      }

      public getMoveList():string[]{
        return this.moveList;
      }

      public sendRequest(code) {
        const formData: FormData = new FormData();
        formData.append('code', code);

        return this.http.post(`https://tools.tutorialspoint.com/format_c.php`,formData)
            .map((res:Response) => res);
      }
}
