
export const turnTime='360';
export const straightTime='500';

export const SETTINGS={
    spriteSRC:'assets/robot-silhouette-image-3.png',
    animateStep:1,
    onCanvaStep:10,
    engineOutput:[
        {},
        {},
        {},
        {}
    ],


    leftEngine:[
        {name:'OUT_A',data:'A'},
        {name:'OUT_B',data:'B'},
        {name:'OUT_C',data:'C'},
        {name:'OUT_D',data:'D'},
    ],

    rightEngine:[
        {name:'OUT_A',data:'A'},
        {name:'OUT_B',data:'B'},
        {name:'OUT_C',data:'C'},
        {name:'OUT_D',data:'D'},
    ],

    codeArrayTemplate:[
        `#define MOVE_TIME ${straightTime}`,
        `#define TURN_TIME ${turnTime}`,
        'task main()',
        '{'
    ],

    leftmoveOptions:['FWD','LEFT','REV','RIGHT','FWD','LEFT','REV','RIGHT'],
    rightMoveOptions:['FWD','RIGHT','REV','LEFT','FWD','RIGHT','REV','LEFT'],
    
    engineSpeed:'50'

}