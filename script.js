function createMonth(year, name, index){
  const month=document.createElement("div");
  month.className="month";

  const title=document.createElement("h3");
  title.innerText=name+" "+year;

  const week=document.createElement("div");
  week.className="weekdays";

  ["Min","Sen","Sel","Rab","Kam","Jum","Sab"].forEach(d=>{
    const el=document.createElement("div");
    el.innerText=d;
    week.appendChild(el);
  });

  const days=document.createElement("div");
  days.className="days";

  const first=new Date(year,index,1).getDay();
  const total=new Date(year,index+1,0).getDate();

  for(let i=0;i<first;i++)days.appendChild(document.createElement("div"));

  for(let d=1;d<=total;d++){
    const box=document.createElement("div");
    box.innerText=d;
    days.appendChild(box);
  }

  month.appendChild(title);
  month.appendChild(week);
  month.appendChild(days);

  return month;
}

function generate(year,id){
  const el=document.getElementById(id);

  const months=[
    "Januari","Februari","Maret","April","Mei","Juni",
    "Juli","Agustus","September","Oktober","November","Desember"
  ];

  months.forEach((m,i)=>{
    el.appendChild(createMonth(year,m,i));
  });
}

window.addEventListener("DOMContentLoaded",()=>{
  generate(2026,"cal2026");
  generate(2027,"cal2027");
});

const music = document.getElementById("musik");

function toggleMusic(){
  if(music.paused){
    music.play();
  }else{
    music.pause();
  }
}

let scrollMode = "down";

function toggleScroll(){

  if(scrollMode === "down"){

    window.scrollTo({
      top:document.body.scrollHeight,
      behavior:'smooth'
    });

    scrollMode = "up";

    document.querySelector(".scroll-top").innerHTML = "↑";

  }else{

    window.scrollTo({
      top:0,
      behavior:'smooth'
    });

    scrollMode = "down";

    document.querySelector(".scroll-top").innerHTML = "↓";

  }

}