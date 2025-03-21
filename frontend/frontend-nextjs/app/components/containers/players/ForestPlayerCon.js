import { BASE_URL } from "@/app/utils/constant/etc"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

const ForestPlayerCon = ({data, metaData}) => {
   const videoRef = useRef(null)
   const [playToggle, setPlayToggle] = useState(false)
   const [playToggleReal, setPlayToggleReal] = useState(false)

   const [currentIndex, setCurrentIndex] = useState(0)
   const router = useRouter()

   // change Current Time and Next Video
   useEffect(() => {
      const averageTime = 60 * 2
      const videoElement = videoRef.current;
      let isUpdating = false; // 중복 방지 플래그 추가

      if (playToggle && videoElement) {
         const handleTimeUpdate = (e) => {
            if (isUpdating) return; // 이미 업데이트 중이라면 실행하지 않음

            const getCurrentTime = videoElement?.currentTime
            

            if (Math.round(getCurrentTime) > (data[currentIndex].type === "raw" ? parseFloat(data[currentIndex].end) : parseFloat(data[currentIndex].data.end) - 1)) {
               // 중복 실행 방지를 위해 플래그 설정
               isUpdating = true;
               
               // 다음 비디오로 전환
               videoElement.pause();
               setPlayToggle(false);
               
               

               const getNextVideo = data[currentIndex + 1];
               if (getNextVideo) {
                  videoRef.current.src = `${BASE_URL}/${getNextVideo.type === "raw" ? getNextVideo.pandora_id : getNextVideo.data.pandora_id}/480p1.mp4`
                  videoRef.current.currentTime = getNextVideo.type === "raw" ? parseFloat(getNextVideo.start) : parseFloat(getNextVideo.data.start) // getNextVideo.in
                  setCurrentIndex((prev) => prev + 1);
                  // videoRef.current.currentTime = getNextVideo.in;
               
                  // setCurrentTime(getNextVideo.newIn);

                  // 0.5초 후 플래그 해제
                  if(playToggle){
                     setTimeout(() => {
                        isUpdating = false;
                        videoElement.play();
                        setPlayToggle(true);
                     }, 500);
                  }
                  
               }else{
                  videoRef.current.src = `${BASE_URL}/${data[0].type === "raw" ? data[0].pandora_id : data[0].data.pandora_id}/480p1.mp4`
                  videoRef.current.currentTime = data[0].type === "raw" ? parseFloat(data[0].start) : parseFloat(data[0].data.start)
                  // videoRef.current.currentTime = data[0].in
                  setCurrentIndex(0);
               
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
               const newCurrentTime = videoElement?.currentTime
               // const newCurrentTime = videoElement?.currentTime - data[currentIndex].in
               if (newCurrentTime > (data[currentIndex].type === "raw" ? averageTime : parseFloat(data[currentIndex].data.start) + averageTime)) {
               //   next video
                  // 중복 실행 방지를 위해 플래그 설정
               isUpdating = true;
               
               // 다음 비디오로 전환
               videoElement.pause();
               setPlayToggle(false);
               
               

               const getNextVideo = data[currentIndex + 1];
               if (getNextVideo) {
                  videoRef.current.src = `${BASE_URL}/${getNextVideo.type === "raw" ? getNextVideo.pandora_id : getNextVideo.data.pandora_id}/480p1.mp4`
                  videoRef.current.currentTime = getNextVideo.type === "raw" ? 0 : parseFloat(getNextVideo.data.start) // getNextVideo.in
                  setCurrentIndex((prev) => prev + 1);
                  // videoRef.current.currentTime = getNextVideo.in;
               
                  // setCurrentTime(getNextVideo.newIn);

                  // 0.5초 후 플래그 해제
                  if(playToggle){
                     setTimeout(() => {
                        isUpdating = false;
                        videoElement.play();
                        setPlayToggle(true);
                     }, 500);
                  }
                  
               }else{
                  videoRef.current.src = `${BASE_URL}/${data[0].type === "raw" ? data[0].pandora_id : data[0].data.pandora_id}/480p1.mp4`
                  videoRef.current.currentTime = data[0].type === "raw" ? 0 : parseFloat(data[0].data.start)
                  // videoRef.current.currentTime = data[0].in
                  setCurrentIndex(0);
               
                      // 0.5초 후 플래그 해제
                  if(playToggle){
                     setTimeout(() => {
                        isUpdating = false;
                        setPlayToggle(false);
                        setPlayToggleReal(false)
                     }, 500);
                  }
               }
               }else{
                  // current video
                  // console.log("current video")
               }
           
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
            // event.preventDefault(); 
          }
        
      }
      const onKeyController = (event) => {
         // event.preventDefault(); 
         // if (event.code === 'Space') {
         //    if(videoRef){
         //       if(videoRef.current.paused){
                  
         //          videoRef.current.play()
         //          setPlayToggle(true)
         //          setPlayToggleReal(true)
           
         //       }else{
         //          videoRef.current.pause()
         //          setPlayToggle(false)
         //          setPlayToggleReal(false)
      
         //       }
         //    }
         //  }
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
      if(videoRef && data.length > 0){
         videoRef.current.src = `${BASE_URL}/${data[currentIndex].type === "raw" ? data[currentIndex].pandora_id : data[currentIndex].data.pandora_id}/480p1.mp4`
         videoRef.current.currentTime = data[currentIndex].type === "raw" ? parseFloat(data[currentIndex].start) : parseFloat(data[currentIndex].data.start)
      }
     }
    
    useEffect(() => {
          findCurrentVideo(data)
    },[data])

    const onPush = (v) => {
      if(v.type === "raw"){
        window.open(`/video/${v.pk}`, '_blank');
      }else{
        window.open(`/clip/${v.pk}`, '_blank');
      }
    }
   
   return (<div className="w-full h-[calc(100svh-118px)] relative">
      <div className="w-full h-[calc(100svh-118px)] overflow-hidden flex flex-col">
         {/* Video Container */}
         <div className="w-full h-full flex flex-col overflow-hidden relative">
            {/* Video */}
            <div  className={`bg-opacity-0 ${playToggleReal ? "flex" : "hidden"} absolute top-0 left-0 w-full h-full bg-black z-40 transition-all duration-500 justify-end items-end py-4 px-4`}>
               <div onClick={() => onPlay(false)} className="w-fit h-9 bg-black border border-white rounded-full gap-4 flex cursor-pointer justify-center items-center text-white px-4 font-ibm_mono_semibold">
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
            <div className={`absolute top-0 left-0 z-[20] overflow-hidden w-full h-full bg-white flex ${playToggleReal ? "opacity-0 pointer-events-none cursor-auto" : "opacity-100 pointer-events-auto "} transition-all duration-1000`}>
               
               {
                  data.map((v, idx) => {
                     return <div 
                     key={idx} 
                     className="w-full h-full bg-white relative border-r-2 border-white last:border-r-0">
                        
                        <Image
                           src={`${BASE_URL}/${data[idx].type === "raw" ? data[idx].pandora_id : data[idx].data.pandora_id}/480p${ data[idx].type === "raw" ? data[idx].poster : data[idx].data.start}.jpg`}
                           alt=""
                           fill
                           style={{objectFit: "cover"}}
                        />
                        <div onClick={() => onPush(v)} className="absolute top-0 right-0 bg-white w-[24px] h-[24px] flex justify-center items-center cursor-pointer">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                             <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                           </svg>
                        </div>
                     </div>
                  })
               }
               <div  className={`bg-opacity-0 ${!playToggleReal ? "flex" : "hidden"} pointer-events-none absolute top-0 left-0 w-full h-full bg-black z-40 transition-all duration-500 justify-end items-end py-4 px-4`}>
                  <div onClick={() => onPlay(true)} className="w-fit h-9 bg-black border border-white rounded-full gap-4 flex cursor-pointer justify-center items-center text-white px-4 pointer-events-auto font-ibm_mono_semibold">
                     <svg
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24"
                     fill="currentColor"
                     className="size-7 translate-x-[2px] opacity-90"
                     >
                     <path
                       fillRule="evenodd"
                       d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                       clipRule="evenodd"
                     />
                     </svg>
                     Play Preview
                  </div>
               </div>
            </div>
           
         
         </div>
      
      
      </div>
     
     
       
   </div>

   )
}

export default ForestPlayerCon;