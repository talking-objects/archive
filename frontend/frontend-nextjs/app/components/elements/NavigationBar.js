"use client";
import { loadingState } from "@/app/utils/recoillib/state/state";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import gsap from "gsap"
import { useRouter } from "next/navigation";

const NavigationBar = () => {
  const [getLoadingState, setLoadingState] = useRecoilState(loadingState);
  const router = useRouter()
//   useEffect(() => {
//     if(getLoadingState.isLoading && !getLoadingState.hasAnimated){
//         gsap
//         .to(".navAni", {
//             duration: 2,
//             ease: "expo.inOut",
//             css: {
//                 transform: "translateY(0)"
//             },
//             onComplete: () => {
//                 setLoadingState((prev) => ({
//                     ...prev,
//                     hasAnimated: true
//                 }))
//               }
//         })
//     }
//   },[getLoadingState])
  return (
    <>
      {getLoadingState && (
        <div className={`navAni fixed top-0 left-0 w-full h-[56px] bg-black z-[1000] text-white flex items-center px-4 gap-8`}>
          <div onClick={() => router.push("/")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default NavigationBar;
