var selectedScale = 0;
var Tone = auctx.createOscillator();
var Tone2 = auctx.createOscillator();
var Tone3 = auctx.createOscillator();
var Volume = auctx.createGain();
var Volume2 = auctx.createGain();
var Volume3 = auctx.createGain();
Volume.connect(auctx.destination);
Volume2.connect(auctx.destination);
Volume3.connect(auctx.destination);
var ToneIsPlaying = false;
function run(){
    Tone.type = "sine";
    Tone2.type = "square";
    Tone3.type = "triangle";
    if(screen == "ScaleBuild"){
        if(Volume2.gain.value > 0){
            Volume2.gain.value*=0.982;
        }
        else{
            Volume2.gain.value = 0;
        }
        if(Volume3.gain.value > 0){
            Volume3.gain.value*=0.965;
        }
        else{
            Volume3.gain.value = 0;
        }
        if(Volume.gain.value > 0){
            Volume.gain.value*=0.95;
        }
        else{
            Volume.gain.value = 0;
        }


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
        var col;
        if(current.colors[0] == 0){col = "#000000";}
        else{col = "#FFFFFF";}
        if(Rect(canvas.width*0.07, canvas.height*0.09, canvas.width*0.15, canvas.height*0.03, col, true)){
            if(rClicking){
                current.colors[0] = (current.colors[0] + 1) % 2;
            }
            else if(clicking){
                if(ToneIsPlaying){
                    Tone.stop();
                    Tone2.stop();
                    Tone3.stop();
                }
                Tone = auctx.createOscillator();
                Tone.frequency.setValueAtTime(current.baseNote*2, auctx.currentTime); // value in hertz
                Tone.connect(Volume);
                Tone.start();
                Volume.gain.value = 0.7;

                Tone2 = auctx.createOscillator();
                Tone2.frequency.setValueAtTime(current.baseNote*2, auctx.currentTime); // value in hertz
                Tone2.connect(Volume2);
                Tone2.start();
                Volume2.gain.value = 0.25;

                Tone3 = auctx.createOscillator();
                Tone3.frequency.setValueAtTime(current.baseNote*2, auctx.currentTime); // value in hertz
                Tone3.connect(Volume3);
                Tone3.start();
                Volume3.gain.value = 0.07;

                ToneIsPlaying = true;
            }
        }
        if(Rect(canvas.width*0.065 - canvas.height*0.03, canvas.height*0.09, canvas.height*0.03, canvas.height*0.03, "base", true) && clicking){
            var s = window.prompt("What would you like to rename this note to?");
            if(s != null){
                current.names[0] = s;
            }
        }
        ctx.fillStyle = textColor;
        ctx.fillText(current.names[0], canvas.width*0.065 - canvas.height*0.015, canvas.height*0.105);
        for(var i = 0; i < current.colors.length; i++){
            if(current.colors[i] == 0){col = "#000000";}
            else{col = "#FFFFFF";}
            if(Rect(canvas.width*0.07, canvas.height*0.09+canvas.height*0.03*current.colors.length-canvas.height*i*0.03, canvas.width*0.15, canvas.height*0.03, col, true)){
                if(rClicking){
                    current.colors[i] = (current.colors[i] + 1) % 2;
                }
                else if(clicking){
                    if(ToneIsPlaying){
                        Tone.stop();
                        Tone2.stop();
                        Tone3.stop();
                    }
                    Tone = auctx.createOscillator();
                    Tone.frequency.setValueAtTime(Math.pow(Math.pow(current.size,1/current.weights.length),i)*current.baseNote, auctx.currentTime); // value in hertz
                    Tone.connect(Volume);
                    Tone.start();
                    ToneIsPlaying = true;
                    Volume.gain.value = 0.7;

                    Tone2 = auctx.createOscillator();
                    Tone2.frequency.setValueAtTime(Math.pow(Math.pow(current.size,1/current.weights.length),i)*current.baseNote, auctx.currentTime); // value in hertz
                    Tone2.connect(Volume2);
                    Tone2.start();
                    Volume2.gain.value = 0.25;

                    Tone3 = auctx.createOscillator();
                    Tone3.frequency.setValueAtTime(Math.pow(Math.pow(current.size,1/current.weights.length),i)*current.baseNote, auctx.currentTime); // value in hertz
                    Tone3.connect(Volume3);
                    Tone3.start();
                    Volume3.gain.value = 0.07;
                }
            }
            
            if(Rect(canvas.width*0.065 - canvas.height*0.03, canvas.height*0.09+canvas.height*0.03*current.colors.length-canvas.height*i*0.03, canvas.height*0.03, canvas.height*0.03, "base", true) && clicking){
                var s = window.prompt("What would you like to rename this note to?");
                if(s != null){
                    current.names[i] = s;
                }
            }
            if(Rect(canvas.width*0.225, canvas.height*0.075+canvas.height*0.03*current.colors.length-canvas.height*i*0.03, canvas.height*0.03, canvas.height*0.03, "base", true) && clicking){
                var n = window.prompt("What would you like to change this weight to?");
                if(n != null){
                    current.weights[i] = n;
                }
            }
            ctx.fillStyle = textColor;
            ctx.fillText(current.names[i], canvas.width*0.065 - canvas.height*0.015, canvas.height*0.105 + canvas.height*0.03*current.colors.length-canvas.height*i*0.03);
            ctx.fillText(current.weights[i], canvas.width*0.225 + canvas.height*0.015, canvas.height*0.09 + canvas.height*0.03*current.colors.length-canvas.height*i*0.03);
        }
        if(Rect(canvas.width*0.07, canvas.height*0.09 + canvas.height*0.03 * (current.colors.length + 1), canvas.width*0.15, canvas.height*0.03, "base", true) && clicking){
            var n = window.prompt("What would you like to change the number of notes to?");
            if(n != null){
                if(current.names.length > n){
                    while(current.names.length > n){
                        current.names.pop();
                        current.colors.pop();
                        current.weights.pop();
                    }
                }
                else{
                    while(current.names.length < n){
                        current.names.push("X");
                        current.colors.push(1);
                        current.weights.push(1);
                    }
                }
            }
        }
        ctx.fillStyle = textColor;
        ctx.fillText("Change number of notes", canvas.width*0.145, canvas.height*0.105 + canvas.height*0.03*(current.colors.length+1));

        ctx.fillText(current.names[0] + "0 Frequency:", canvas.width*0.4, canvas.height*0.07);
        Rect(canvas.width*0.44, canvas.height*0.05, canvas.width*0.04, canvas.height*0.04, "base", true);
        
        ctx.fillStyle = textColor;
        ctx.fillText(current.baseNote, canvas.width*0.46, canvas.height*0.07);
        ctx.fillText("hz", canvas.width*0.493, canvas.height*0.07);
        if(rClicking){
            if(ToneIsPlaying){
                Tone.stop();
            }
            ToneIsPlaying = false;
        }
        clicking = false;
        rClicking = false;
    }
}

var interval = setInterval(run,10);