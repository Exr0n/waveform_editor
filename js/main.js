const baseColor = "#364248";
const baseSelected = "#263238";
const secondColor = "#506069";
const secondSelected = "#607079";
const textColor = "#D6F4FF";

var canvas = document.getElementById("Editor");
var ctx = canvas.getContext("2d");

var mouseX, mouseY;
var clicking

function setMouseCoords(event){
  mouseX = event.clientX;
  mouseY = event.clientY;
}
function mUp(event){
  clicking = true;
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
threads.push(new thread([],"Western", "Thread 1"));

class scale {
  baseNote;
  size;
  quantity;
  weights = [];
  colors = [];
  name;

  constructor(bs, sz, qu, wg, cl, nm){
    this.baseNote = bs;
    this.size = sz;
    this.quantity = qu;
    for(var i = 0; i < wg.length; i++){
      this.weights.push(wg[i]);
      this.colors.push(cl[i]);
    }
    this.name = nm;
  }
}

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
      // box with + sign / data
      if(Rect(canvas.width*0.01,canvas.height*0.1+canvas.height*0.11*indexOfThreads,canvas.width*0.08,canvas.height*0.1, "second", true) && clicking){
        var s = window.prompt("What do you want to call your new thread?","Thread "+(threads.length+1));
        if(s != null){
          threads.push(new thread([],"Western", s));
        }
      }
      
      //main box to show music
      Rect(canvas.width*0.1,canvas.height*0.1+canvas.height*0.11*indexOfThreads,canvas.width*0.89,canvas.height*0.1, "second", false);
      ctx.font = Math.min(canvas.width, canvas.height*1.9)*0.07 + "px Arial";
      ctx.fillStyle = textColor;
      
      //add new thread
      ctx.fillText('+', canvas.width*0.05, canvas.height*0.159+canvas.height*0.11*indexOfThreads);
      
    }
    else{

      // box with data
      Rect(canvas.width*0.01,canvas.height*0.1+canvas.height*0.11*indexOfThreads,canvas.width*0.08,canvas.height*0.1, "second", false);
      
      // main box to show music
      Rect(canvas.width*0.1,canvas.height*0.1+canvas.height*0.11*indexOfThreads,canvas.width*0.89,canvas.height*0.1, "second", true);
      for(var indexOfTimes = 0; indexOfTimes < threads[indexOfThreads].times.length+1; indexOfTimes++){
        
        if(indexOfTimes == threads[indexOfThreads].times.length){
          if(threads[indexOfThreads].times.length < 4){
            //box with sub-division
            if(Rect(canvas.width*0.0125+indexOfTimes*canvas.width*0.02, canvas.height*0.135+canvas.height*0.11*indexOfThreads, canvas.width*0.015, canvas.height*0.025, "base", true) && clicking){
              var n = window.prompt("How many subdivisions do you want to have?","4");
              if(n != null){
                threads[indexOfThreads].times.push(n);
              }
            }
            ctx.fillStyle = textColor;
            ctx.fillText('+', canvas.width*0.02+indexOfTimes*canvas.width*0.02, canvas.height*0.1475+canvas.height*0.11*indexOfThreads);
          }
        }
        else{
          if(Rect(canvas.width*0.0125+indexOfTimes*canvas.width*0.02, canvas.height*0.135+canvas.height*0.11*indexOfThreads, canvas.width*0.015, canvas.height*0.025, "base", true) && clicking){
            var n = window.prompt("What would you like to change this sub-division to?",threads[indexOfThreads].times[indexOfTimes]);
            if(n != null){
              threads[indexOfThreads].times[indexOfTimes] = n;
            }
          }
          ctx.fillStyle = textColor;
          ctx.fillText(threads[indexOfThreads].times[indexOfTimes], canvas.width*0.02+indexOfTimes*canvas.width*0.02, canvas.height*0.1475+canvas.height*0.11*indexOfThreads);
        }
      }
      
      if(Rect(canvas.width*0.015, canvas.height*0.105+canvas.height*0.11*indexOfThreads, canvas.width*0.07, canvas.height*0.025, "base", true) && clicking){
        var s = window.prompt("What would you like to change this name to?", threads[indexOfThreads].name);
        if(s != null){
          threads[indexOfThreads].name = s;
        }
      }
      ctx.fillStyle = textColor;
      ctx.fillText(threads[indexOfThreads].name, canvas.width*0.05, canvas.height*0.1175+canvas.height*0.11*indexOfThreads);
    }
  }
  clicking = false;
}

var interval = setInterval(run,30);



