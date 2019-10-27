var currentScale;
function run(){
    if(screen == "Piano"){
        Rect(0,0,canvas.width,canvas.height, "base", false);
        for(var i = scroll*canvas.height/48; i < scroll*canvas.height/48+canvas.height; i += canvas.height/48){
            if (currentScale.colors[(Math.round(48-i/canvas.height*48) % currentScale.colors.length + currentScale.colors.length) % currentScale.colors.length] == 0){
                Rect(0,(i-scroll*canvas.height/48)*0.9+canvas.height*0.1,canvas.width*0.05,canvas.height/48*0.9, "#000000", true, false);
            }
            else{
                Rect(0,(i-scroll*canvas.height/48)*0.9+canvas.height*0.1,canvas.width*0.05,canvas.height/48*0.9, "#FFFFFF", true, false);
            }
            if((Math.round(48-i/canvas.height*48) % currentScale.colors.length + currentScale.colors.length) % currentScale.colors.length == 0){
                ctx.fillStyle = textColor2;
                console.log(Math.round(48-i/canvas.height*48) / currentScale.colors.length);
                ctx.fillText(currentScale.names[0] + " " + Math.round(48-i/canvas.height*48) / currentScale.colors.length,canvas.width*0.025,(i -scroll*canvas.height/48 + canvas.height/96)*0.9+canvas.height*0.1);
            }
            Rect(canvas.width*0.05,(i-scroll*canvas.height/48)*0.9+canvas.height*0.1, canvas.width*0.95, 2, "#000000", false, false);
        }
    }
}

var interval = setInterval(run,10);