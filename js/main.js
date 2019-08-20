const baseColor = "#364842";
const secondColor = "#506960";
const textColor = "#D6FFF4"
var canvas = document.getElementById("Editor");
var ctx = canvas.getContext("2d");

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
threads.push(new thread([4,4],"Western", "Thread 1"));
threads.push(new thread([4,4],"Western", "Thread 2"));
canvas.width=window.innerWidth;
canvas.height=window.innerHeight
ctx.fillStyle = baseColor;
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.font = Math.min(canvas.width, canvas.height*1.9)*0.005 + "px Arial";

for(var indexOfThreads = 0; indexOfThreads < threads.length; indexOfThreads++){
  ctx.fillStyle = secondColor;
  ctx.fillRect(canvas.width*0.01,canvas.height*0.1+canvas.height*0.1*indexOfThreads,canvas.width*0.08,canvas.height*0.09);
  ctx.fillRect(canvas.width*0.1,canvas.height*0.1+canvas.height*0.1*indexOfThreads,canvas.width*0.89,canvas.height*0.09);
  
  
  for(var indexOfTimes = 0; indexOfTimes < threads[indexOfThreads].times.length; indexOfTimes++){
    ctx.fillStyle = baseColor;
    ctx.fillRect(canvas.width*0.02+indexOfTimes*canvas.width*0.02, canvas.height*0.125+canvas.height*0.1*indexOfThreads, canvas.width*0.015, canvas.height*0.015);
    ctx.fillStyle = textColor;
    ctx.fillText(threads[indexOfThreads].times[indexOfTimes], canvas.width*0.0275+indexOfTimes*canvas.width*0.02, canvas.height*0.1325+canvas.height*0.1*indexOfThreads);
  }
  
  ctx.fillStyle = baseColor;
  ctx.fillRect(canvas.width*0.02, canvas.height*0.105+canvas.height*0.1*indexOfThreads, canvas.width*0.06, canvas.height*0.015);
  ctx.fillStyle = textColor;
  ctx.fillText(threads[indexOfThreads].name, canvas.width*0.05, canvas.height*0.1125+canvas.height*0.1*indexOfThreads)
}