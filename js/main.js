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
var auctx = new window.AudioContext();

var mouseX, mouseY;
var clicking;
var rClicking;
var scroll = 0;
var scrollLimit = 0;

var screen = "Home";

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

function mScroll(event){
  scroll += event.wheelDelta * canvas.width / 3840;
  if(scroll > 0 || scrollLimit >= 0){scroll = 0;}
  if(scroll < scrollLimit && scrollLimit < 0){scroll = scrollLimit;}
}

function Rect(x, y, w, h, col, selectable, dds){
  if(mouseX < x+w && mouseX > x && mouseY < y+h && mouseY > y && selectable == true && !(!dds && dropDownSelected != -1) && !(!dds && scaleDropDownSelected != -1)){
    if(col == "base"){
      ctx.fillStyle = baseSelected;
    }
    else if(col == "second"){
      ctx.fillStyle = secondSelected;
    }
    else if(col == "third"){
      ctx.fillStyle = thirdSelected;
    }
    else{
      ctx.fillStyle = col;
    }
  }
  else{
    if(col == "base"){
      ctx.fillStyle = baseColor;
    }
    else if(col == "second"){
      ctx.fillStyle = secondColor;
    }
    else if(col == "third"){
      ctx.fillStyle = thirdColor;
    }
    else{
      ctx.fillStyle = col;
    }
  }
  ctx.fillRect(x, y, w, h);
  return(mouseX < x+w && mouseX > x && mouseY < y+h && mouseY > y && !(!dds && dropDownSelected != -1) && !(!dds && scaleDropDownSelected != -1));
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
  names = [];
  name;

  constructor(bs, sz, qu, wg, cl, ns, nm){
    this.baseNote = bs;
    this.size = sz;
    this.quantity = qu;
    for(var i = 0; i < wg.length; i++){
      this.weights.push(wg[i]);
      this.colors.push(cl[i]);
      this.names.push(ns[i]);
    }
    this.name = nm;
  }
}

var scales = [];

scales.push(new scale(440, 2, 12, [1,1,1,1,1,1,1,1,1,1,1,1], [1,0,1,1,0,1,0,1,1,0,1,0],["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"],"Western"));