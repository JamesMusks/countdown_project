/**
 * Created by Administrator on 2016/8/9.
 */
var WINDOW_WIDTH,WINDOW_HEIGHT,RADIUS,MARGIN_TOP,MARGIN_LEFT;
const endtime=new Date(2016,9,14,20,20,20);
var curShowTimeSeconds=0;

var balls=[];
const colors=["#33b5e5","#0099cc","#aa66cc","#9933cc","#669900","#ffbb33","#ff8800","#ff4444","#cc0000"];

window.onload=function(){

    WINDOW_WIDTH=document.body.clientWidth;
    WINDOW_HEIGHT=document.body.clientHeight;
    MARGIN_LEFT=Math.round(WINDOW_WIDTH/10);
    RADIUS=Math.round(WINDOW_WIDTH/5*4/108)-1;

    MARGIN_TOP=Math.round(WINDOW_HEIGHT/5);

    var canvas=document.querySelector("#canvasId");

    var context=canvas.getContext("2d");


    canvas.width=WINDOW_WIDTH;
    canvas.height=WINDOW_HEIGHT;

    curShowTimeSeconds=getCurrentShowTimeSeconds();

    setInterval(
        function(){
            render(context);
            update();
    },50);
}

function getCurrentShowTimeSeconds(){
    var curtime=new Date();
    var ret=endtime.getTime()-curtime.getTime();
    ret=Math.round(ret/1000);

    return ret>=0?ret:0;
}



function update(){

    var nextShowTimeSeconds=getCurrentShowTimeSeconds();

    var nextHours=parseInt(nextShowTimeSeconds/3600);
    var nextMinutes=parseInt((nextShowTimeSeconds-nextHours*3600)/60);
    var nextSeconds= nextShowTimeSeconds%60;

    var curHours=parseInt(curShowTimeSeconds/3600);
    var curMinutes=parseInt((curShowTimeSeconds-curHours*3600)/60);
    var curSeconds= curShowTimeSeconds%60;


    if(nextSeconds!=curSeconds){


        if(parseInt(curHours/10)!=parseInt(nextHours/10)){
            addBalls(MARGIN_LEFT+0,MARGIN_TOP,parseInt(curHours/10));
        }
        if(parseInt(curHours%10)!=parseInt(nextHours%10)){
            addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curHours%10));
        }

        if(parseInt(curMinutes/10)!=parseInt(nextMinutes/10)){
            addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10));
        }
        if(parseInt(curMinutes%10)!=parseInt(nextMinutes%10)){
            addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes%10));
        }

        if(parseInt(curSeconds/10)!=parseInt(nextSeconds/10)){
            addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds/10));
        }
        if(parseInt(curSeconds%10)!=parseInt(nextSeconds%10)){
            addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds%10));
        }
        //重新复制刷新时间
        curShowTimeSeconds=nextShowTimeSeconds;
    }
    updateBalls();
}


function updateBalls(){

    for(var i=0;i<balls.length;i++){
        balls[i].x+=balls[i].vx;
        balls[i].y+=balls[i].vy;
        balls[i].vy+=balls[i].g;

        //碰撞检测
        if(balls[i].y>=WINDOW_HEIGHT-RADIUS){
            balls[i].y=WINDOW_HEIGHT-RADIUS;
            balls[i].vy=-balls[i].vy*0.75;
        }
    }

    var cnt=0;
    for(var i=0;i<balls.length;i++){
        if(balls[i].x+RADIUS>0&&balls[i].x-RADIUS<WINDOW_WIDTH) {
            balls[cnt++] = balls[i];
        }
    }
        while (balls.length > cnt) {
            balls.pop();
        }
}


function addBalls(x,y,num){

    for(var i=0;i<digit[num].length;i++)

        for(var j=0;j<digit[num][i].length;j++)

            if( digit[num][i][j]==1 ){
                var aBall={
                    x: x+j*2*(RADIUS+1)+(RADIUS+1),
                    y: y+i*2*(RADIUS+1)+(RADIUS+1),
                    g: 1.5+Math.random(),
                    vx: Math.pow(-1, Math.ceil( Math.random()*1000) )*4,
                    vy: -5,
                    color: colors[ Math.floor(Math.random()*colors.length) ]
                }
                balls.push(aBall)
            }

}

function render(ctx){

    ctx.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

    var hours=parseInt(curShowTimeSeconds/3600);
    var minutes=parseInt((curShowTimeSeconds-hours*3600)/60);
    var seconds=curShowTimeSeconds%60;

    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),ctx);
    renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),ctx);
    renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,ctx) //10表示digit中的第十位
    renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),ctx)
    renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),ctx)
    renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,ctx) //10表示digit中的第十位
    renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),ctx)
    renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),ctx)

    for(var i=0;i<balls.length;i++){
        ctx.fillStyle=balls[i].color;
        ctx.beginPath();
        ctx.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
        ctx.closePath();
        ctx.fill();
    }
}

function renderDigit(x,y,num,ctx){
    ctx.fillStyle="black";
    for(var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]==1){
                ctx.beginPath();
                ctx.arc(x+j*2*(RADIUS+1)+(RADIUS+1), y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS, 0, 2*Math.PI);
                ctx.closePath();
                ctx.fill();
            }
        }
    }
}


/*百度echarts*/