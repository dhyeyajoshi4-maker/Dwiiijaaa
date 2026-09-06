const pages=[...document.querySelectorAll(".page")];
const start=Date.now();
const counter=document.getElementById("counter");
setInterval(()=>counter.textContent=Math.floor((Date.now()-start)/1000),1000);

function show(id){
  pages.forEach(p=>p.classList.toggle("active",p.id===id));
  window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll("[data-next]").forEach(b=>b.addEventListener("click",()=>show(b.dataset.next)));
document.getElementById("restart").onclick=()=>show("page1");

const music=document.getElementById("music"), musicBtn=document.getElementById("musicBtn");
musicBtn.onclick=async()=>{
  try{
    if(music.paused){await music.play();musicBtn.textContent="❚❚";}
    else{music.pause();musicBtn.textContent="♫";}
  }catch(e){alert("Put your own music.mp3 inside the assets folder first.");}
};

document.getElementById("calculateBtn").onclick=()=>{
  const n=document.getElementById("meterNumber"), fill=document.getElementById("barFill"), status=document.getElementById("meterStatus");
  n.textContent="???%"; fill.style.width="0%"; status.textContent="⚡ CALCULATING...";
  setTimeout(()=>{n.textContent="120%";fill.style.width="100%";status.textContent="💥 ERROR: TOO MUCH CUTENESS DETECTED";},900);
};
