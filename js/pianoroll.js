var currentScale;
function run(){
    if(screen == "Piano"){
        Rect(0,0,canvas.width,canvas.height, "base", false);
        for(var i = 0; i < canvas.height; i += canvas.height/50){
            Rect(0,i,canvas.width*0.05,canvas.height*0.02, "#000000", true, false);
        }
    }
}

var interval = setInterval(run,10);