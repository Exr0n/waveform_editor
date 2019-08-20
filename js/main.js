const baseColor = "#364842";
const baseSelected = "#465852";
const secondColor = "#506960";
const secondSelected = "#607970";
const textColor = "#D6FFF4";

var canvas = document.getElementById("Editor");
var ctx = canvas.getContext("2d");

var mouseX, mouseY;

function setMouseCoords(event){
  mouseX = event.clientX;
  mouseY = event.clientY;
}


function Rect(x, y, w, h, col, selectable){
  if(mouseX < x+w && mouseX > x && mouseY < y+h && mouseY > y && selectable == true){
    if(col == "base"){
      ctx.fillStyle = baseSelected;
    }
    else if(col == "second"){
      ctx.fillStyle = secondSelected;
    }
  }
  else{
    if(col == "base"){
      ctx.fillStyle = baseColor;
    }
    else if(col == "second"){
      ctx.fillStyle = secondColor;
    }
  }
  ctx.fillRect(x, y, w, h);
  return(mouseX < x+w && mouseX > x && mouseY < y+h && mouseY > y);
}

class thread {
  times = [];
  scale;
  name;
  constructor(tms, scl, nam){
    for(var i = 0; i < tms.length; i++){
      this.times.push(tms[i]);
    }
    this.scale = scl;
    this.name = nam;
  }
}
var threads = [];
threads.push(new thread([4,4,8],"Western", "Thread 1"));
threads.push(new thread([4,4],"Western", "Thread 2"));

function run(){
  canvas.width=window.innerWidth-3;
  canvas.height=window.innerHeight-4;
  console.log(canvas.width);
  Rect(0,0,canvas.width,canvas.height, "base", false);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = Math.min(canvas.width, canvas.height*1.9)*0.01 + "px Arial";

  for(var indexOfThreads = 0; indexOfThreads < threads.length+1; indexOfThreads++){
    if(indexOfThreads == threads.length){
      Rect(canvas.width*0.01,canvas.height*0.1+canvas.height*0.11*indexOfThreads,canvas.width*0.08,canvas.height*0.1, "second", true);
      Rect(canvas.width*0.1,canvas.height*0.1+canvas.height*0.11*indexOfThreads,canvas.width*0.89,canvas.height*0.1, "second", false);
      ctx.font = Math.min(canvas.width, canvas.height*1.9)*0.07 + "px Arial";
      ctx.fillStyle = textColor;
      ctx.fillText('+', canvas.width*0.05, canvas.height*0.159+canvas.height*0.11*indexOfThreads);
      
    }
    else{
      Rect(canvas.width*0.01,canvas.height*0.1+canvas.height*0.11*indexOfThreads,canvas.width*0.08,canvas.height*0.1, "second", false);
      Rect(canvas.width*0.1,canvas.height*0.1+canvas.height*0.11*indexOfThreads,canvas.width*0.89,canvas.height*0.1, "second", true);
      for(var indexOfTimes = 0; indexOfTimes < threads[indexOfThreads].times.length+1; indexOfTimes++){
        Rect(canvas.width*0.0125+indexOfTimes*canvas.width*0.02, canvas.height*0.135+canvas.height*0.11*indexOfThreads, canvas.width*0.015, canvas.height*0.025, "base", true);
        ctx.fillStyle = textColor;
        if(indexOfTimes == threads[indexOfThreads].times.length){
          ctx.fillText('+', canvas.width*0.02+indexOfTimes*canvas.width*0.02, canvas.height*0.1475+canvas.height*0.11*indexOfThreads);
        }
        else{
          ctx.fillText(threads[indexOfThreads].times[indexOfTimes], canvas.width*0.02+indexOfTimes*canvas.width*0.02, canvas.height*0.1475+canvas.height*0.11*indexOfThreads);
        }
      }
      
      Rect(canvas.width*0.02, canvas.height*0.105+canvas.height*0.11*indexOfThreads, canvas.width*0.06, canvas.height*0.025, "base", true);
      ctx.fillStyle = textColor;
      ctx.fillText(threads[indexOfThreads].name, canvas.width*0.05, canvas.height*0.1175+canvas.height*0.11*indexOfThreads);
    }
  }
}

var interval = setInterval(run,30);



