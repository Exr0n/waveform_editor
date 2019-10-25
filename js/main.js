const baseColor = "#363C48";
const baseSelected = "#262C38";
const secondColor = "#505969";
const secondSelected = "#606979";
const thirdColor = "#C6D2FF";
const thirdSelected = "#B6C6EF";
const textColor = "#D6E2FF";
const textColor2 = "#7681B5";
const textColor3 = "#101821";

var canvas = document.getElementById("Editor");
var ctx = canvas.getContext("2d");
var auctx = new window.AudioContext();
var key = '';

var mouseX, mouseY;
var clicking;
var rClicking;
var scroll = 0;
var scroll2 = 0;
var zoom = 400;
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
function keyPress(event){
  key = event.key;
}
function keyRelease(event){
  key = "";
}

function mScroll(event){
  if(key == "Shift"){
    zoom *= (event.wheelDelta/960+1);
    scroll2 *= (event.wheelDelta/960+1);
  }
  else if(key == "f"){
    scroll2 += event.wheelDelta * canvas.width / 3840;
    if(scroll2 < 0){
      scroll2 = 0;
    }
  }
  else{
    
    if(screen != "Piano"){
      scroll += event.wheelDelta * canvas.width / 3840;
      if(scroll > 0 || scrollLimit >= 0){scroll = 0;}
      if(scroll < scrollLimit && scrollLimit < 0){scroll = scrollLimit;}
    }
    else{
      scroll += event.wheelDelta/240;
    }
  }
}
function prdct(array){
  var output = 1;
  for(var i = 0; i < array.length; i++){
    output *= array[i];
  }
  return(output);
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
  chunks = [];
  scale;
  name;
  volume;
  pan;
  constructor(tms, scl, nam){
    this.chunks = [];
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

class chunk{
  notes = [];
  start = [];
  length = [];
  loopLength = [];
  constructor(sta, len){
    for(var i = 0; i < len.length; i++){
      this.length.push(len[i]);
      this.loopLength.push(len[i]);
      this.start.push(sta[i]);
    }
  }
}


class note{
  indexOfStart = [];
  indexOfEnd = [];
  pitch;
  volume;
  constructor(p, start, end){
    indexOfStart = start;
    indexOfEnd = end;
    pitch = p;
  }
}