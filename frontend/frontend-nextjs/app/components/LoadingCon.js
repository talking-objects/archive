import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import gsap from "gsap";
import { loadingState } from "../utils/recoillib/state/state";

const LoadingCon = ({ ready = false }) => {
    const [getLoadingState, setLoadingState] = useRecoilState(loadingState);
    const [ready2, setReady2] = useState(false);
  
    useEffect(() => {
      if (getLoadingState.isLoading && !getLoadingState.hasAnimated) {
        gsap.to(".loadingAniDoorBorder", {
          duration: 0.5,
          ease: "power3.inOut",
          css: {
            width: "100%",
          },
          onComplete: () => {
            gsap.to("#loadingAniDoor1", {
              delay: 0,
              duration: 1,
              ease: "power3.inOut",
              css: {
                opacity: 1,
                transform: "translateY(-100%)",
              },
              onComplete: () => {
                setLoadingState((prev) => ({
                  ...prev,
                  hasAnimated: true,
                }));
              },
            });
            gsap.to("#loadingAniDoor2", {
              delay: 0,
              duration: 1,
              ease: "power3.inOut",
              css: {
                opacity: 1,
                transform: "translateY(100%)",
              },
            });
          },
        });
      }
    }, [getLoadingState]);
  
    useEffect(() => {
      if (!getLoadingState.isLoading && ready && ready2) {
        gsap.to(".loadingTitle", {
        //   delay: 0,
          duration: 1.5,
          ease: "elastic.inOut",
          css: {
            opacity: 1,
            transform: "translateY(200%)",
          },
          stagger: {
            amount: 0.5,
          },
          onComplete: () => {
            setLoadingState((prev) => ({
              ...prev,
              isLoading: true,
            }));
          },
        });
      }
    }, [ready, ready2]);
  
    const textAni = () => {
      gsap.to(".loadingTitle", {
        duration: 2,
        ease: "elastic.out",
        css: {
          opacity: 1,
          transform: "translateY(0)",
        },
        stagger: {
          amount: 1,
        },
        onComplete: () => {
          console.log("Yeah");
          setReady2(true);
        },
      });
    };
    useEffect(() => {
      textAni();
    }, []);
    return (
      <div className="w-screen h-[100svh] bg-opacity-0 flex justify-center items-center fixed top-0 left-0 z-[2000] overflow-hidden">
        <div
          id="loadingAniDoor1"
          className="absolute top-0 left-0 w-full h-1/2 bg-white flex items-end justify-center"
        >
          <div className="loadingAniDoorBorder w-0 h-1 border-b border-black"></div>
        </div>
        <div
          id="loadingAniDoor2"
          className="absolute top-1/2 left-0 w-full h-1/2 bg-white flex items-end justify-center"
        >
          <div className="loadingAniDoorBorder w-0 h-1 border-t border-black"></div>
        </div>
        <div className="flex overflow-hidden">
          {Array.from("Talking Object EVA").map((val, idx) => {
            return (
              <span
                key={idx}
                className="loadingTitle font-eva text-xl lg:text-3xl opacity-0 even:-translate-y-[200%] odd:translate-y-[200%]"
              >
                {val === " " ? "\u00A0" : val}
              </span>
            );
          })}
        </div>
      </div>
    );
  };

export default LoadingCon;