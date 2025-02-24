import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import gsap from "gsap";
import { loadingState } from "../utils/recoillib/state/state";

const LoadingDataCon = ({ ready = false,readyData, comLoader=()=>{} }) => {
    const [ready2, setReady2] = useState(false);
  
  
  
    useEffect(() => {
      if (!ready && ready2 && readyData) {
        gsap.to(".loadingTitle", {
        //   delay: 0,
          duration: 0.7,
          ease: "elastic.inOut",
          css: {
            opacity: 1,
            transform: "translateY(200%)",
          },
          stagger: {
            amount: 0.5,
          },
          onComplete: () => {
            
            comLoader()
          },
        });
      }
    }, [ready2, readyData]);
  
    const textAni = () => {
      gsap.to(".loadingTitle", {
        duration: 0.7,
        ease: "elastic.out",
        css: {
          opacity: 1,
          transform: "translateY(0)",
        },
        stagger: {
          amount: 0.5,
        },
        onComplete: () => {
          
          setReady2(true);
        },
      });
    };
    useEffect(() => {
      textAni();
    }, []);
    return (
      <div className="w-screen h-[100svh] flex justify-center items-center fixed top-0 left-0 z-[5000] overflow-hidden bg-white">
        <div className="flex overflow-hidden">
          {Array.from("Optimizing video quality...").map((val, idx) => {
            return (
              <span
                key={idx}
                className="loadingTitle font-ibm_mono_bold text-sm lg:text-sm opacity-0 even:-translate-y-[200%] odd:translate-y-[200%]"
              >
                {val === " " ? "\u00A0" : val}
              </span>
            );
          })}
        </div>
      </div>
    );
  };

export default LoadingDataCon;