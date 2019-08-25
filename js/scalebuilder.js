var selectedScale = 0;
function run(){
    if(screen == "ScaleBuild"){
        canvas.width=window.innerWidth-3;
        canvas.height=window.innerHeight-4;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = Math.min(canvas.width, canvas.height*1.9)*0.01 + "px Arial";
        Rect(0,0,canvas.width,canvas.height, "base", false);
        Rect(canvas.width*0.01, canvas.height*0.02, canvas.width*0.88, canvas.height*0.96, "second", false);
        Rect(canvas.width*0.9, canvas.height*0.02, canvas.width*0.09, canvas.height*0.96, "second", false);
        for(var i = 0; i < scales.length; i++){
            if(selectedScale == i){
                Rect(canvas.width*0.9, canvas.height*0.02+canvas.height*i*0.05, canvas.width*0.09, canvas.height*0.05, "third", false);
                ctx.fillStyle = textColor3;
            }
            else{
                if(Rect(canvas.width*0.9, canvas.height*0.02+canvas.height*i*0.05, canvas.width*0.09, canvas.height*0.05, "second", true) && clicking){
                    selectedScale = i;
                }
                ctx.fillStyle = textColor;
            }
            ctx.fillText(scales[i].name, canvas.width*0.945, canvas.height*0.045+canvas.height*i*0.05);
        }
        var current = scales[selectedScale];
        if(current.colors[0] == 0){
            Rect(canvas.width*0.07, canvas.height*0.09, canvas.width*0.15, canvas.height*0.03, "black", false);
        }
        else{
            Rect(canvas.width*0.07, canvas.height*0.09, canvas.width*0.15, canvas.height*0.03, "white", false);
        }
        Rect(canvas.width*0.065 - canvas.height*0.03, canvas.height*0.09, canvas.height*0.03, canvas.height*0.03, "base", true);
        ctx.fillStyle = textColor;
        ctx.fillText(current.names[0], canvas.width*0.065 - canvas.height*0.015, canvas.height*0.105);
        for(var i = 0; i < current.colors.length; i++){
            if(current.colors[i] == 0){
                Rect(canvas.width*0.07, canvas.height*0.09+canvas.height*0.03*current.colors.length-canvas.height*i*0.03, canvas.width*0.15, canvas.height*0.03, "black", false);
            }
            else if(current.colors[i] == 1){
                Rect(canvas.width*0.07, canvas.height*0.09+canvas.height*0.03*current.colors.length-canvas.height*i*0.03, canvas.width*0.15, canvas.height*0.03, "white", false);
            }
            Rect(canvas.width*0.065 - canvas.height*0.03, canvas.height*0.09+canvas.height*0.03*current.colors.length-canvas.height*i*0.03, canvas.height*0.03, canvas.height*0.03, "base", true);
            ctx.fillStyle = textColor;
            ctx.fillText(current.names[i], canvas.width*0.065 - canvas.height*0.015, canvas.height*0.105 + canvas.height*0.03*current.colors.length-canvas.height*i*0.03);
        }
    }
}

var interval = setInterval(run,10);