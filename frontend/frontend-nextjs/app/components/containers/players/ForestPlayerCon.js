import { BASE_URL } from "@/app/utils/constant/etc"
import { useEffect, useRef, useState } from "react"


const ForestPlayerCon = ({data, metaData}) => {
   const videoRef = useRef(null)
   const [playToggle, setPlayToggle] = useState(false)
   const [playToggleReal, setPlayToggleReal] = useState(false)
   const [currentTime, setCurrentTime] = useState(0)
   const [currentIndex, setCurrentIndex] = useState(0)


   // change Current Time and Next Video
   useEffect(() => {
      const videoElement = videoRef.current;
      let isUpdating = false; // 중복 방지 플래그 추가

      if (playToggle && videoElement) {
         const handleTimeUpdate = (e) => {
            if (isUpdating) return; // 이미 업데이트 중이라면 실행하지 않음

            const getCurrentTime = videoElement?.currentTime - data[currentIndex].in;

            if (Math.round(getCurrentTime) > (data[currentIndex].out - data[currentIndex].in)) {
               // 중복 실행 방지를 위해 플래그 설정
               isUpdating = true;
               
               // 다음 비디오로 전환
               videoElement.pause();
               setPlayToggle(false);
               
               console.log("next");

               const getNextVideo = data[currentIndex + 1];
               if (data[currentIndex + 1]) {
                  videoRef.current.src = `${BASE_URL}/${data[currentIndex + 1].videoId}/480p1.mp4`
                  videoRef.current.currentTime = getNextVideo.in
                  setCurrentIndex((prev) => prev + 1);
                  // videoRef.current.currentTime = getNextVideo.in;
                  setCurrentTime(getNextVideo.newIn);

                  // 0.5초 후 플래그 해제
                  if(playToggle){
                     setTimeout(() => {
                        isUpdating = false;
                        videoElement.play();
                        setPlayToggle(true);
                     }, 500);
                  }
                  
               }else{
                  videoRef.current.src = `${BASE_URL}/${data[0].videoId}/480p1.mp4`
                  videoRef.current.currentTime = data[0].in
                  setCurrentIndex(0);
                  setCurrentTime(0);
                      // 0.5초 후 플래그 해제
               if(playToggle){
                  setTimeout(() => {
                     isUpdating = false;
                     setPlayToggle(false);
                     setPlayToggleReal(false)
                  }, 500);
               }
               }

            } else {
               // Update the video current time
               const newCurrentTime = videoElement?.currentTime - data[currentIndex].in
               setCurrentTime(data[currentIndex].newIn + (newCurrentTime));
           
            }
         };

         videoElement.ontimeupdate = handleTimeUpdate;

         return () => {
            videoElement.ontimeupdate = null;
         };

      }
   },[playToggle])
  
    // video keyboard controller
    useEffect(() => {
      const onSpaceScroll = (event) => {
         if (event.code === 'Space') {
            event.preventDefault(); 
          }
        
      }
      const onKeyController = (event) => {
         event.preventDefault(); 
         if (event.code === 'Space') {
            if(videoRef){
               if(videoRef.current.paused){
                  
                  videoRef.current.play()
                  setPlayToggle(true)
                  setPlayToggleReal(true)
           
               }else{
                  videoRef.current.pause()
                  setPlayToggle(false)
                  setPlayToggleReal(false)
      
               }
            }
          }
      
     
      }

      // event = keyup & keydown
      document.addEventListener('keyup',onKeyController)
      document.addEventListener('keydown',onSpaceScroll)

      return () => {
         document.removeEventListener("keyup", onKeyController)
         document.removeEventListener("keydown", onSpaceScroll)
      }
   },[])

   const onPlay = (toggle) => {
      if(videoRef){
         if(toggle){
            
            videoRef.current.play()
            setPlayToggle(true)
            setPlayToggleReal(true)
         }else{
            videoRef.current.pause()
            setPlayToggle(false)
            setPlayToggleReal(false)
         }
      }
   }
   const findCurrentVideo = (data) => {
      if(videoRef){
         videoRef.current.src = `${BASE_URL}/${data[currentIndex].videoId}/480p1.mp4`
         videoRef.current.currentTime = data[currentIndex].in
      }
    }
    useEffect(() => {
   
          findCurrentVideo(data)
       
    },[])
   
   return (<div className="w-full h-[calc(100svh-96px)] relative">
      <div className="w-full h-[calc(100svh-96px)] overflow-hidden flex flex-col">
         {/* Video Container */}
         <div className="w-full h-full flex flex-col overflow-hidden relative">
            {/* Video */}
            <div  className={` bg-opacity-0 ${playToggleReal ? "flex" : "hidden"} absolute top-0 left-0 w-full h-full bg-black z-40 transition-all duration-500 justify-end items-end py-4 px-4`}>
               <div onClick={() => onPlay(false)} className="w-fit h-9 border border-white rounded-full gap-4 flex cursor-pointer justify-center items-center text-white px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor" className="size-7">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                  </svg>
                  Pause Preview
               </div>
            </div>
            {<video ref={videoRef} className={`w-full h-full bg-black transition-all duration-1000`} controls={false} aria-label="video player" preload="auto">
              <source type="video/mp4" />
              Your browser does not support the video tag.
            </video>}
            {/* Video Info */}
            <div onClick={() => onPlay(true)} className={`absolute top-0 left-0 z-[20] overflow-hidden w-full h-full bg-white flex ${playToggleReal ? "opacity-0 pointer-events-none cursor-auto" : "opacity-100 pointer-events-auto cursor-pointer"} transition-all duration-1000`}>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-32 h-32 border border-white rounded-full flex justify-center items-center text-white">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor" className="size-14">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                     </svg>

                  </div>
               </div>
               {
                  data.map((v, idx) => {
                     return <div 
                     key={idx} 
                     style={{
                        backgroundImage: `url(${BASE_URL}/${data[idx].videoId}/480p${data[idx].in}.jpg)`
                     }}
                     className="w-full h-full bg-white bg-cover bg-center bg-no-repeat"></div>
                  })
               }
            </div>
           
         
         </div>
         {/* video controller */}
        
         {/* video navigation */}
      
      </div>
     
       {/* video Legend */}
       
   </div>

   )
}

export default ForestPlayerCon;