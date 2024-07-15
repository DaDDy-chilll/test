import { useEffect, useState } from "react";

const S3TestingScreen = ()=>{
  const center = {
    x: window.innerWidth/2,
    y: window.innerHeight/2,
  }

  const [x,setx] = useState<number>(500);
  const [y,sety] = useState<number>(300);

  const [moonX,setMoonX] = useState<number>(0);
  const [moonY,setMoonY] = useState<number>(0);

  const radius = 200;


  const sleep = (ms:number)=>new Promise((_)=>setInterval(_,ms));

  const start = async()=>{
    for(let i=1;true;i++){
      await sleep(200);
      const x = center.x + radius * Math.cos( (i/30 * Math.PI) );
      const y = center.y + radius * Math.sin( (i/30 * Math.PI) );

      const mx = x + 50 * Math.cos( (i*3/60 * Math.PI) );
      const my = y + 50 * Math.sin( (i*3/60 * Math.PI) );

      setMoonX(mx);
      setMoonY(my);
      // const x = center.x + i
      // const y = center.y + i
      setx(x);
      sety(y);
    }
  }

  useEffect(()=>{
    start();
  },[])
  return <div className=" relative">
    <div style={{left: moonX-10,top: moonY-10}} className="w-[20px] h-[20px] bg-black rounded-full absolute"></div>
    <div style={{left: x-25,top: y-25}} className="w-[50px] h-[50px] bg-black rounded-full absolute"></div>

    <div style={{left: center.x-10,top: center.y-10}} className="w-[20px] h-[20px] bg-black rounded-full absolute"></div>
  </div>
}

export default S3TestingScreen;