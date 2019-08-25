var dropDownSelected = -1;

function run(){
  if(screen == "Home"){
    canvas.width=window.innerWidth-3;
    canvas.height=window.innerHeight-4;
    Rect(0,0,canvas.width,canvas.height, "base", false);
    scroll *= (window.innerWidth-3) / canvas.width;
    scrollLimit = canvas.height * 0.9 - (threads.length+1) * canvas.height*0.11;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = Math.min(canvas.width, canvas.height*1.9)*0.01 + "px Arial";

    for(var indexOfThreads = 0; indexOfThreads < threads.length+1; indexOfThreads++){
      if(indexOfThreads == threads.length){
        // box with + sign / data
        if(Rect(canvas.width*0.01,canvas.height*0.1+canvas.height*0.11*indexOfThreads + scroll,canvas.width*0.08,canvas.height*0.1, "second", true, false) && clicking){
          var s = window.prompt("What do you want to call your new thread?","Thread "+(threads.length+1));
          if(s != null){
            threads.push(new thread([],"Western", s));
          }
        }
        
        ctx.font = Math.min(canvas.width, canvas.height*1.9)*0.07 + "px Arial";
        ctx.fillStyle = textColor;
        
        //add new thread
        ctx.fillText('+', canvas.width*0.05, canvas.height*0.159+canvas.height*0.11*indexOfThreads + scroll);
        
      }
      else{

        // box with data
        if(Rect(canvas.width*0.01,canvas.height*0.1+canvas.height*0.11*indexOfThreads + scroll,canvas.width*0.08,canvas.height*0.1, "second", true, false) && rClicking){
          mouseXTemp = mouseX;
          mouseYTemp = mouseY;
          dropDownSelected = indexOfThreads;
        }

        
        // main box to show music
        Rect(canvas.width*0.1,canvas.height*0.1+canvas.height*0.11*indexOfThreads + scroll,canvas.width*0.89,canvas.height*0.1, "second", true, false);
        for(var indexOfTimes = 0; indexOfTimes < threads[indexOfThreads].times.length+1; indexOfTimes++){
          
          if(indexOfTimes == threads[indexOfThreads].times.length){
            if(threads[indexOfThreads].times.length < 4){
              //box with sub-division
              if(Rect(canvas.width*0.0125+indexOfTimes*canvas.width*0.02, canvas.height*0.135+canvas.height*0.11*indexOfThreads + scroll, canvas.width*0.015, canvas.height*0.025, "base", true, false) && clicking){
                var n = window.prompt("How many subdivisions do you want to have?","4");
                if(n != null){
                  threads[indexOfThreads].times.push(n);
                }
              }
              ctx.fillStyle = textColor;
              ctx.fillText('+', canvas.width*0.02+indexOfTimes*canvas.width*0.02, canvas.height*0.1475+canvas.height*0.11*indexOfThreads + scroll);
            }
          }
          else{
            if(Rect(canvas.width*0.0125+indexOfTimes*canvas.width*0.02, canvas.height*0.135+canvas.height*0.11*indexOfThreads, canvas.width*0.015, canvas.height*0.025 + scroll, "base", true, false) && clicking){
              var n = window.prompt("What would you like to change this sub-division to?",threads[indexOfThreads].times[indexOfTimes]);
              if(n != null){
                threads[indexOfThreads].times[indexOfTimes] = n;
              }
            }
            ctx.fillStyle = textColor;
            ctx.fillText(threads[indexOfThreads].times[indexOfTimes], canvas.width*0.02+indexOfTimes*canvas.width*0.02, canvas.height*0.1475+canvas.height*0.11*indexOfThreads + scroll);
          }
        }
        
        if(Rect(canvas.width*0.015, canvas.height*0.105+canvas.height*0.11*indexOfThreads + scroll, canvas.width*0.07, canvas.height*0.025, "base", true, false) && clicking){
          var s = window.prompt("What would you like to change this name to?", threads[indexOfThreads].name);
          if(s != null){
            threads[indexOfThreads].name = s;
          }
        }
        ctx.fillStyle = textColor;
        ctx.fillText(threads[indexOfThreads].name, canvas.width*0.05, canvas.height*0.1175+canvas.height*0.11*indexOfThreads + scroll);

        if(Rect(canvas.width*0.015, canvas.height*0.17+canvas.height*0.11*indexOfThreads + scroll, canvas.width*0.0325, canvas.height*0.025, "base", true, false)){
          Rect(mouseX, canvas.height*0.17+canvas.height*0.11*indexOfThreads + scroll, canvas.width*0.001, canvas.height*0.025, "second", false, false);
          if(clicking){
            threads[indexOfThreads].volume = ((mouseX - canvas.width*0.015) / canvas.width / 0.0325) * 200;
          }
        }
        Rect(threads[indexOfThreads].volume * canvas.width * 0.0325 / 200 + canvas.width*0.015, canvas.height*0.17+canvas.height*0.11*indexOfThreads + scroll, canvas.width*0.001, canvas.height*0.025, "second", false, false);
        
        if(Rect(canvas.width*0.0525, canvas.height*0.17+canvas.height*0.11*indexOfThreads + scroll, canvas.width*0.0325, canvas.height*0.025, "base", true, false)){
          Rect(mouseX, canvas.height*0.17+canvas.height*0.11*indexOfThreads + scroll, canvas.width*0.001, canvas.height*0.025, "second", false, false);
          if(clicking){
            threads[indexOfThreads].pan = ((mouseX - canvas.width*0.06875) / canvas.width / 0.0325) * 360;
          }
        }
        Rect(threads[indexOfThreads].pan * 0.0375 * canvas.width / 410 + canvas.width*0.06875, canvas.height*0.17+canvas.height*0.11*indexOfThreads + scroll, canvas.width*0.001, canvas.height*0.025, "second", false, false);

        ctx.fillStyle = textColor2;
        ctx.fillText("v "+Math.round(threads[indexOfThreads].volume), canvas.width*0.03125, canvas.height*0.1825+canvas.height*0.11*indexOfThreads + scroll);
        ctx.fillText("p "+Math.round(threads[indexOfThreads].pan), canvas.width*0.06875, canvas.height*0.1825+canvas.height*0.11*indexOfThreads + scroll);
      }
    }
    if(dropDownSelected != -1){
      if(!Rect(mouseXTemp-canvas.width*0.0006, mouseYTemp-canvas.height*0.001, canvas.width*0.1+canvas.width*0.0012, canvas.height*0.14+canvas.height*0.002, "base", true, true)){
        dropDownSelected = -1;
      }
      
      if(Rect(mouseXTemp, mouseYTemp, canvas.width*0.1, canvas.height*0.035, "third", true, true) && clicking){
        screen = "ScaleBuild";
        dropDownSelected = -1;
      }
      if(Rect(mouseXTemp, mouseYTemp+canvas.height*0.036, canvas.width*0.1, canvas.height*0.035, "third", true, true) && clicking){
        threads.push(new thread(threads[threads.length-1].times, threads[threads.length-1].scale, threads[threads.length-1].name));
        for(var i = threads.length-2; i >= dropDownSelected; i--){
          if(i == dropDownSelected){
            threads[i+1] = new thread(threads[i].times, threads[i].scale, "Copy Of "+threads[i].name);
          }
          else{
            threads[i+1] = new thread(threads[i].times, threads[i].scale, threads[i].name);
          }
          threads[i+1].volume = threads[i].volume;
          threads[i+1].pan = threads[i].pan;
        }
        dropDownSelected = -1;
      }
      if(Rect(mouseXTemp, mouseYTemp+canvas.height*0.072, canvas.width*0.1, canvas.height*0.035, "third", true, true) && clicking){
        
        for(var i = dropDownSelected; i < threads.length-1; i++){
          threads[i] = threads[i+1];
        }
        threads.pop();
        dropDownSelected = -1;
      }
      if(Rect(mouseXTemp, mouseYTemp+canvas.height*0.108, canvas.width*0.1, canvas.height*0.035, "third", true, true) && clicking){
        //cancel
        dropDownSelected = -1;
      }

      ctx.fillStyle = textColor3;
      ctx.font = Math.min(canvas.width, canvas.height*1.9)*0.01 + "px Arial";
      ctx.fillText("Scale", mouseXTemp + canvas.width*0.05, mouseYTemp + canvas.height*0.0175);
      ctx.fillText("Duplicate", mouseXTemp + canvas.width*0.05, mouseYTemp + canvas.height*0.0535);
      ctx.fillText("Delete", mouseXTemp + canvas.width*0.05, mouseYTemp + canvas.height*0.0895);
      ctx.fillText("Cancel", mouseXTemp + canvas.width*0.05, mouseYTemp + canvas.height*0.1265);
      
    }
    clicking = false;
    rClicking = false;
  }
}

var interval = setInterval(run,10);



