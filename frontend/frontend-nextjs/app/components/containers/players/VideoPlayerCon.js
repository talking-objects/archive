import { BASE_URL } from "@/app/utils/constant/etc"
import { formatTime } from "@/app/utils/hooks/etc"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { LegendContainer, VideoNavigation } from "../../elements/Elements"
import DiagramaticView from "./views/DiagramaticView"
import EntangledView from "./views/EntangledView"
import OverviewView from "./views/OverviewView"
import VideoTitle from "./elements/VideoTitle"
import VideoMeta from "./elements/VideoMeta"
import VideoController from "./elements/VideoController"
import VideoPlayerContainer from "./elements/VideoPlayerContainer"



const VideoPlayerCon = ({data, clip=false, showContentVideo=false, setCurrentTimeForMini}) => {
    const [toggleLegend, setToggleLegend] = useState(false)
    const videoRef = useRef(null)
    const [playToggle, setPlayToggle] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [getNAnnotations, setNAnnotations] = useState(null)
    const route = useRouter()

    const [toggleShow, setToggleShow] = useState({
       category: true,
       tag: true,
       reference: true,
       narration: true,
       data: true,
       event: true,
       place: true,
       view: "diagramatic",
      
    })
  
   
    
    const onToggleShow = (key, view=false) => {
       if(!view){
          setToggleShow((prev) => ({
             ...prev,
             [key]: !prev[key], 
           }));
       }else{
          setToggleShow((prev) => ({
             ...prev,
             ["view"]: key, 
           }));
       }
       
     };
    const onToggleLegend = (value) => {
       if(value){
          window.scrollTo(0, 0)
          document.body.style.overflow = "hidden"
       }else{
          document.body.style.overflow = "auto"
       }
       setToggleLegend(value)
    }
 
    const togglePlay = () => {
       if(videoRef){
          if(videoRef.current.paused){
             videoRef.current.play()
             setPlayToggle(true)
          }else{
             videoRef.current.pause()
             setPlayToggle(false)
          }
          
       }
    }
    const onClickProgressBar = (e) => {
 
       if(videoRef){
          if(!clip){
             videoRef.current.currentTime = parseFloat(e.target.value)
             setCurrentTime(e.target.value)
          }else{
             
             videoRef.current.currentTime = parseFloat(e.target.value) + data.in
             setCurrentTime(e.target.value)
          }
       }
          
      
       
    }
 
    useEffect(() => {
       if(clip){
          if(videoRef){
             videoRef.current.currentTime = data.in
          }
       }
    },[])
 
    useEffect(() => {
       setNAnnotations(data.nAnnotations)
    },[])

   //  For MiniVideo Player
    useEffect(() => {
      if(showContentVideo){
         videoRef.current.pause()
         setPlayToggle(false)
         setCurrentTimeForMini(videoRef.current.currentTime)
      }
    },[showContentVideo])
 
    // video keyboard controller
    useEffect(() => {
       const onSpaceScroll = (event) => {
       
          if (event.code === 'Space') {
             event.preventDefault(); 
           }
          if (event.code === 'ArrowDown') {
             event.preventDefault(); 
           }
          if (event.code === 'ArrowLeft') {
             event.preventDefault(); 
           }
         
       }
       const onKeyController = (event) => {
          event.preventDefault(); 
          if (event.code === 'Space') {
             if(videoRef && !showContentVideo){
                if(videoRef.current.paused){
                   
                   videoRef.current.play()
                   setPlayToggle(true)
                }else{
                   videoRef.current.pause()
                   setPlayToggle(false)
                }
             }
           }
       
          // diagramatic
          if(event.which === 81){
             onToggleShow("diagramatic", true)
          }
          // entangled
          if(event.which === 87){
             onToggleShow("entangled", true)
          }
          // overview
          if(event.which === 69){
             onToggleShow("overview", true)
          }
          // show : categories
          if(event.which === 49){
             onToggleShow("category")
          }
          // show : tag
          if(event.which === 50){
             onToggleShow("tag")
          }
          // show : reference
          if(event.which === 51){
             onToggleShow("reference")
          }
          // show : narration
          if(event.which === 52){
             onToggleShow("narration")
          }
          // show : data
          if(event.which === 53){
             onToggleShow("data")
          }
          // show : event
          if(event.which === 54){
             onToggleShow("event")
          }
          // show: place
          if(event.which === 55){
             onToggleShow("place")
          }
          // // +10s
          // if(event.key === "ArrowRight"){
          //    event.preventDefault()
          //    if (videoRef.current) {
          //       // 비디오가 있을 때만 실행
          //       videoRef.current.currentTime = Math.min(
          //          videoRef.current.currentTime + 20,
          //          videoRef.current.duration
          //      );
            
          //       setCurrentTime(videoRef.current.currentTime);
          //   }
             
          // }
         
       }
 
       // event = keyup & keydown
       document.addEventListener('keyup',onKeyController)
       document.addEventListener('keydown',onSpaceScroll)
 
       return () => {
          document.removeEventListener("keyup", onKeyController)
          document.removeEventListener("keydown", onSpaceScroll)
       }
    },[showContentVideo])
 
    // update video progress bar
    useEffect(() => {
       const videoElement = videoRef.current
       if (playToggle && videoElement) {
          const handleTimeUpdate = () => {
             if(!clip){
                const newCurrentTime = videoElement?.currentTime
                // 
                setCurrentTime(newCurrentTime)
                if(videoElement.ended){
                   // video ended
                   // - update play icon
                   // - update progress bar
                   
                   setPlayToggle(false)
                   setCurrentTime(0)
                }
             }
             if(clip){
                const newCurrentTime = videoElement?.currentTime
                // 
                setCurrentTime(newCurrentTime - data.in)
                // end
                if(Math.round(newCurrentTime) > data.out){
                   videoElement.pause()
                   videoElement.currentTime = data.in
                   setCurrentTime(0)
                   setPlayToggle(false)
                }
             }
             
            
          };
          videoElement.ontimeupdate = handleTimeUpdate
       
          return () => {
             videoElement.ontimeupdate = null
          };
       }
    },[playToggle])
    return <VideoPlayerContainer toggleLegend={toggleLegend} onToggleLegend={onToggleLegend}>
         <div className="w-full h-full flex flex-col overflow-hidden relative group">
             <video ref={videoRef} src={`${BASE_URL}/${data.id}/480p1.mp4`} className={`${(toggleShow.view === "overview" && playToggle) ? "w-[calc(100vw-660px)]" : "w-full"} h-full bg-black transition-all duration-1000`} controls={false} aria-label="video player" preload="auto">
               <source type="video/mp4" />
               Your browser does not support the video tag.
             </video>
             {/* video info */}
             {!playToggle && <div
               onClick={togglePlay}
               className="absolute z-[45] w-[180px] aspect-square top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center cursor-pointer opacity-0 group-hover:opacity-100 bg-black bg-opacity-0 rounded-full text-white transition-all duration-300"
               >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-32 translate-x-[2px] opacity-90"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                      clipRule="evenodd"
                    />
                  </svg>
             </div>}
             <div className={`${playToggle ? "bg-opacity-0" : "bg-opacity-30"} w-full h-full absolute top-0 left-0 bg-black duration-300 pointer-events-none select-none flex justify-center items-center`}>
             </div>
             <div className={`absolute top-0 left-0 z-[40] overflow-hidden w-full h-fit flex flex-col gap-4`}>
                <div onClick={togglePlay} className={`${playToggle ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 -translate-x-full pointer-events-none"} cursor-pointer w-[76px] absolute top-0 left-0 flex justify-center items-center aspect-square text-black bg-[#8BA5F8] transition-all duration-1000`}>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                   </svg>
                </div>

                {clip && <div className={`${!playToggle ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"} w-fit text-black px-2 py-1 bg-[#9E21E8] text-4xl font-bold italic transition-all duration-1000`}>Clip</div>}
                <div className={`${(!playToggle) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"} duration-1000 flex`}>
                  <VideoTitle text={data.title} />
                </div>
                <VideoMeta playToggle={playToggle} currentVideo={data} />
                
                {clip && <div onClick={() => route.push(`/video/${data.id}`)} className={`text-black bg-white w-fit px-2 py-2 cursor-pointer ${!playToggle ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"} transition-all duration-1000`}>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 19.5-15-15m0 0v11.25m0-11.25h11.25" />
                   </svg>
                </div>}
             </div>
               {/* Video Data Visualization : Diagramatic View */}
               {(videoRef && getNAnnotations) && <DiagramaticView data={data} clip={clip} toggleShow={toggleShow} setCurrentTime={setCurrentTime} videoRef={videoRef} playToggle={playToggle} duration={data.duration} annotationData={getNAnnotations} annotationLoading={!Boolean(getNAnnotations)} />}
               {/* Video Data Visualization : Entangled View */}
               {(videoRef && getNAnnotations) && <EntangledView clip={clip} toggleShow={toggleShow} playToggle={playToggle} currentTime={currentTime} annotationData={getNAnnotations} />}
               {/* Video Data Visualization : Overview View */}
               {(videoRef && getNAnnotations) && <OverviewView data={data} clip={clip} currentTime={currentTime} videoRef={videoRef} setCurrentTime={setCurrentTime} toggleShow={toggleShow} playToggle={playToggle} annotationData={getNAnnotations} />}
            </div>

            {/* video controller */}
            {videoRef && <VideoController togglePlay={togglePlay} playToggle={playToggle} currentTime={currentTime} maxDuration={data.duration} clip={clip} onClickProgressBar={onClickProgressBar} />}
            {/* video navigation */}
            <VideoNavigation onToggleShow={onToggleShow} toggleShow={toggleShow} onToggleLegend={onToggleLegend} />
         </VideoPlayerContainer>
    
 }

export default VideoPlayerCon