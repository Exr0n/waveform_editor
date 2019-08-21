const baseColor = "#364248";
const baseSelected = "#263238";
const secondColor = "#506069";
const secondSelected = "#607079";
const thirdColor = "#C6F0FF";
const thirdSelected = "#B6E0EF";
const textColor = "#D6F4FF";
const textColor2 = "#76A9B5";
const textColor3 = "#102021";

var canvas = document.getElementById("Editor");
var ctx = canvas.getContext("2d");

var mouseX, mouseY;
var clicking;
var rClicking;
var dropDownSelected = -1;

function setMouseCoords(event){
  mouseX = event.clientX;
  mouseY = event.clientY;
}
function mUp(event){
  if(event.button == 2 || event.which == 3){
    rClicking = true;
  }
  else{
    clicking = true;
  }
}

function Rect(x, y, w, h, col, selectable, dds){
  if(mouseX < x+w && mouseX > x && mouseY < y+h && mouseY > y && selectable == true && !(!dds && dropDownSelected != -1)){
    if(col == "base"){
      ctx.fillStyle = baseSelected;
    }
    else if(col == "second"){
      ctx.fillStyle = secondSelected;
    }
    else if(coll = "third"){
      ctx.fillStyle = thirdSelected;
    }
  }
  else{
    if(col == "base"){
      ctx.fillStyle = baseColor;
    }
    else if(col == "second"){
      ctx.fillStyle = secondColor;
    }
    else if(coll = "third"){
      ctx.fillStyle = thirdColor;
    }
  }
  ctx.fillRect(x, y, w, h);
  return(mouseX < x+w && mouseX > x && mouseY < y+h && mouseY > y && !(!dds && dropDownSelected != -1));
}

class thread {
  times = [];
  scale;
  name;
  volume;
  pan;
  constructor(tms, scl, nam){
    for(var i = 0; i < tms.length; i++){
      this.times.push(tms[i]);
    }
    this.scale = scl;
    this.name = nam;
    this.volume = 100;
    this.pan = 0;
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
  Rect(0,0,canvas.width,canvas.height, "base", false);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = Math.min(canvas.width, canvas.height*1.9)*0.01 + "px Arial";

  for(var indexOfThreads = 0; indexOfThreads < threads.length+1; indexOfThreads++){
    if(indexOfThreads == threads.length){
      // box with + sign / data
      if(Rect(canvas.width*0.01,canvas.height*0.1+canvas.height*0.11*indexOfThreads,canvas.width*0.08,canvas.height*0.1, "second", true, false) && clicking){
        var s = window.prompt("What do you want to call your new thread?","Thread "+(threads.length+1));
        if(s != null){
          threads.push(new thread([],"Western", s));
        }
      }
      
      //main box to show music
      Rect(canvas.width*0.1,canvas.height*0.1+canvas.height*0.11*indexOfThreads,canvas.width*0.89,canvas.height*0.1, "second", false, false);
      ctx.font = Math.min(canvas.width, canvas.height*1.9)*0.07 + "px Arial";
      ctx.fillStyle = textColor;
      
      //add new thread
      ctx.fillText('+', canvas.width*0.05, canvas.height*0.159+canvas.height*0.11*indexOfThreads);
      
    }
    else{

      // box with data
      if(Rect(canvas.width*0.01,canvas.height*0.1+canvas.height*0.11*indexOfThreads,canvas.width*0.08,canvas.height*0.1, "second", true, false) && rClicking){
        mouseXTemp = mouseX;
        mouseYTemp = mouseY;
        dropDownSelected = indexOfThreads;
      }

      
      // main box to show music
      Rect(canvas.width*0.1,canvas.height*0.1+canvas.height*0.11*indexOfThreads,canvas.width*0.89,canvas.height*0.1, "second", true, false);
      for(var indexOfTimes = 0; indexOfTimes < threads[indexOfThreads].times.length+1; indexOfTimes++){
        
        if(indexOfTimes == threads[indexOfThreads].times.length){
          if(threads[indexOfThreads].times.length < 4){
            //box with sub-division
            if(Rect(canvas.width*0.0125+indexOfTimes*canvas.width*0.02, canvas.height*0.135+canvas.height*0.11*indexOfThreads, canvas.width*0.015, canvas.height*0.025, "base", true, false) && clicking){
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
          if(Rect(canvas.width*0.0125+indexOfTimes*canvas.width*0.02, canvas.height*0.135+canvas.height*0.11*indexOfThreads, canvas.width*0.015, canvas.height*0.025, "base", true, false) && clicking){
            var n = window.prompt("What would you like to change this sub-division to?",threads[indexOfThreads].times[indexOfTimes]);
            if(n != null){
              threads[indexOfThreads].times[indexOfTimes] = n;
            }
          }
          ctx.fillStyle = textColor;
          ctx.fillText(threads[indexOfThreads].times[indexOfTimes], canvas.width*0.02+indexOfTimes*canvas.width*0.02, canvas.height*0.1475+canvas.height*0.11*indexOfThreads);
        }
      }
      
      if(Rect(canvas.width*0.015, canvas.height*0.105+canvas.height*0.11*indexOfThreads, canvas.width*0.07, canvas.height*0.025, "base", true, false) && clicking){
        var s = window.prompt("What would you like to change this name to?", threads[indexOfThreads].name);
        if(s != null){
          threads[indexOfThreads].name = s;
        }
      }
      ctx.fillStyle = textColor;
      ctx.fillText(threads[indexOfThreads].name, canvas.width*0.05, canvas.height*0.1175+canvas.height*0.11*indexOfThreads);

      if(Rect(canvas.width*0.015, canvas.height*0.17+canvas.height*0.11*indexOfThreads, canvas.width*0.0325, canvas.height*0.025, "base", true, false)){
        Rect(mouseX, canvas.height*0.17+canvas.height*0.11*indexOfThreads, canvas.width*0.001, canvas.height*0.025, "second", false, false);
        if(clicking){
          threads[indexOfThreads].volume = ((mouseX - canvas.width*0.015) / canvas.width / 0.0325) * 200;
        }
      }
      Rect(threads[indexOfThreads].volume / 0.0325 / 100 + canvas.width*0.015, canvas.height*0.17+canvas.height*0.11*indexOfThreads, canvas.width*0.001, canvas.height*0.025, "second", false, false);
      
      if(Rect(canvas.width*0.0525, canvas.height*0.17+canvas.height*0.11*indexOfThreads, canvas.width*0.0325, canvas.height*0.025, "base", true, false)){
        Rect(mouseX, canvas.height*0.17+canvas.height*0.11*indexOfThreads, canvas.width*0.001, canvas.height*0.025, "second", false, false);
        if(clicking){
          threads[indexOfThreads].pan = ((mouseX - canvas.width*0.06875) / canvas.width / 0.0325) * 360;
        }
      }
      Rect(threads[indexOfThreads].pan / 0.0325 / 180 + canvas.width*0.06875, canvas.height*0.17+canvas.height*0.11*indexOfThreads, canvas.width*0.001, canvas.height*0.025, "second", false, false);

      ctx.fillStyle = textColor2;
      ctx.fillText("v "+Math.round(threads[indexOfThreads].volume), canvas.width*0.03125, canvas.height*0.1825+canvas.height*0.11*indexOfThreads);
      ctx.fillText("p "+Math.round(threads[indexOfThreads].pan), canvas.width*0.06875, canvas.height*0.1825+canvas.height*0.11*indexOfThreads);
    }
  }
  if(dropDownSelected != -1){
    if(!Rect(mouseXTemp-canvas.width*0.0006, mouseYTemp-canvas.height*0.001, canvas.width*0.1+canvas.width*0.0012, canvas.height*0.14+canvas.height*0.002, "base", true, true)){
      dropDownSelected = -1;
    }
    
    Rect(mouseXTemp, mouseYTemp, canvas.width*0.1, canvas.height*0.035, "third", true, true);
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

var interval = setInterval(run,30);



