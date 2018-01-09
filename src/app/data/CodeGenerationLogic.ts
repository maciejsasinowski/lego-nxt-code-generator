import {SETTINGS , turnTime, straightTime} from './manifest'; 
import { Http, Response } from '@angular/http';

export class CodeGenerationLogic {

    private directions:string[];
    private lEngine:string;
    private rEngine:string;
    private codeArray=SETTINGS.codeArrayTemplate;
    private directionsAfterAnalyze;
    private initialRobotDir='';
    
      constructor(
          directionsArray,lEngine='A',
           rEngine='B') { 
        this.directions=directionsArray;
        this.lEngine=lEngine;
        this.rEngine=rEngine;
      }

      public analyzeDirections(robotDir:string){
        this.directionsAfterAnalyze=[];
        let lastDirection='';
        let lastDirectionNUmber=0;
        let lastDirectionIndex=-1;
        this.initialRobotDir=robotDir;

        this.directions.forEach((v,i)=> {
            lastDirectionNUmber++;
            try{
                lastDirection=this.directions[i-1];
            }catch(e){
                lastDirection=null;
            }

            if(v!=lastDirection){
                lastDirectionNUmber=1;
                let tempIndex= this.directionsAfterAnalyze.push({
                    changeDirection:true,
                    direction:v,
                    previousDirection:(lastDirection==undefined)? this.initialRobotDir:lastDirection,
                    moveNum:lastDirectionNUmber
                })-1;
                lastDirectionIndex= tempIndex;
            }else {
                this.directionsAfterAnalyze[lastDirectionIndex].moveNum++;
            }
        });
        console.log(this.directionsAfterAnalyze);
      }

      generateOutputCode(){
        this.directionsAfterAnalyze.forEach((o,i)=>{
            let rightMoveNumber=this.computeMoveNumber(o,SETTINGS.rightMoveOptions);
            let leftMoveNumber=this.computeMoveNumber(o,SETTINGS.leftmoveOptions);
            if(rightMoveNumber<leftMoveNumber){
                this.codeArray.push(`//making right ${rightMoveNumber} turn`);
                this.makeTurn(this.lEngine ,rightMoveNumber);
                this.generateMove(o.moveNum);
                debugger;
            }else if(this.initialRobotDir!=o.previousDirection) {
                this.codeArray.push(`//making left ${leftMoveNumber} turn`);                
                this.makeTurn(this.rEngine,leftMoveNumber);
                this.generateMove(o.moveNum);
                debugger;
            }else{
                this.generateMove(o.moveNum);
                debugger;
            }
            
        });
        this.codeArray.push('}');
        return this.codeArray.join('\n');
      }

      private computeMoveNumber(o,moveList){
        let dynamicMovesTable=[];
        let initialDirFound=false;
        //its needed to use raw for , return statements must explict return value;
        for(var i=0, len=moveList.length; i < len; i++){
            if(moveList[i]==o.previousDirection || initialDirFound){
                dynamicMovesTable.push(moveList[i]);
                initialDirFound=true;
                if(moveList[i]==o.direction){
                    return dynamicMovesTable.length-1;
                }
            }
        }
      }

      private generateMove(times=2,fwd=true){
        let enginDirection= (fwd)? 'OnFwd':'OnRev';
        if(times<2){
            this.generateSingleMove();
        }else{
            this.codeArray.push(
                `repeat(${times})`,
                `{`,
                `${enginDirection}(OUT_${this.lEngine}${this.rEngine},${SETTINGS.engineSpeed});`,
                `Wait(MOVE_TIME);`,
                `}`
            );
        }
      }

      private generateSingleMove(fwd=true){
        let enginDirection= (fwd)? 'OnFwd':'OnRev';
        this.codeArray.push(
            `${enginDirection}(OUT_${this.lEngine}${this.rEngine},${SETTINGS.engineSpeed});`,
            `Wait(MOVE_TIME);`,            
        );
      }


      private makeTurn(engine,number){
        if(number<2){
            this.codeArray.push(
                `OnRev(OUT_${this.lEngine},${SETTINGS.engineSpeed});`,
                `Wait(MOVE_TIME);`,            
            );
        }else {
            this.codeArray.push(
                `repeat(${number})`,
                `{`,
                `OnRev(OUT_${engine},${SETTINGS.engineSpeed});`,
                `Wait(MOVE_TIME);`,
                `}`
            );
        }
      }
    }
    