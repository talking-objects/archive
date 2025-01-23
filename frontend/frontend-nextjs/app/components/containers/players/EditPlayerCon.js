import { BASE_URL } from "@/app/utils/constant/etc"
import { useEffect, useRef, useState } from "react"
import { VideoNavigation } from "../../elements/Elements"
import { formatTime } from "@/app/utils/hooks/etc"
import DiagramaticView from "./views/DiagramaticView"
import EntangledView from "./views/EntangledView"
import OverviewView from "./views/OverviewView"
import Image from "next/image"

const EditPlayerCon = ({data, metaData}) => {
    const videoRef = useRef(null)
    const [playToggle, setPlayToggle] = useState(false)
    const [playToggleReal, setPlayToggleReal] = useState(false)
    const [toggleLegend, setToggleLegend] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [currentVideo, setCurrentVideo] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(null)
    
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
    const findCurrentVideo = (currentTime) => {
       
       let getCurrentVideo;
 
       for(let i =0; i < data.length; i++){
          if(data[i].newIn <= currentTime && data[i].newOut >= currentTime){
             getCurrentVideo = data[i]
             setCurrentIndex(i)
             
             break;
          }
       }
       
       if(getCurrentVideo){
          // videoRef.current.src = `${BASE_URL}/${getCurrentVideo.id}/480p1.mp4`
          videoRef.current.currentTime = getCurrentVideo.in
          
          setCurrentVideo(getCurrentVideo)
    
          return getCurrentVideo
       }
     
    }
    useEffect(() => {
        
       findCurrentVideo(currentTime)
    },[])
 
    // update video progress bar
 
       useEffect(() => {
          const videoElement = videoRef.current;
          let isUpdating = false; // 중복 방지 플래그 추가
    
          if (playToggle && videoElement) {
             const handleTimeUpdate = (e) => {
                if (isUpdating) return; // 이미 업데이트 중이라면 실행하지 않음
    
                const getCurrentTime = videoElement?.currentTime;
    
                if (Math.round(getCurrentTime) > currentVideo.out) {
                   // 중복 실행 방지를 위해 플래그 설정
                   isUpdating = true;
                   
                   // 다음 비디오로 전환
                   videoElement.pause();
                   setPlayToggle(false);
                   
                   
    
                   const getNextVideo = data[currentIndex + 1];
                   if (data[currentIndex + 1]) {
                      setCurrentIndex((prev) => prev + 1);
                      videoRef.current.currentTime = getNextVideo.in;
                      setCurrentVideo(getNextVideo);
                      setCurrentTime(getNextVideo.newIn);
 
                   // 0.5초 후 플래그 해제
                   if(playToggleReal){
                      setTimeout(() => {
                         isUpdating = false;
                         videoElement.play();
                         setPlayToggle(true);
                      }, 500);
                   }
                      
                   }else {
                      setPlayToggleReal(false)
                      const fristVideo = data[0];
                      setCurrentIndex(0);
                      
                      setCurrentVideo(fristVideo);
                      setCurrentTime(fristVideo.newIn);
 
                      // 0.5초 후 플래그 해제
                      setTimeout(() => {
                         isUpdating = false;
                         videoRef.current.currentTime = fristVideo.in;
                         // videoElement.play();
                         // setPlayToggle(true);
                      }, 500);
                   }
    
    
                } else {
                   // Update the video current time
                   setCurrentTime(currentVideo.newIn + (getCurrentTime - currentVideo.in));
                   // currentTimeR.current = currentVideo.newIn + (getCurrentTime - currentVideo.in);
                }
             };
    
             videoElement.ontimeupdate = handleTimeUpdate;
    
             return () => {
                videoElement.ontimeupdate = null;
             };
          }
       }, [playToggle]);
    
  
       const onClickProgressBar = (e, edit) => {
          if (videoRef.current) {
             // 클릭한 위치의 진행 시간 계산
             const targetTime = parseFloat(edit ? e : e.target.value);
             const getVideo = findCurrentVideo(targetTime);
          
       
             if (getVideo) {
                // Pause the video
                if(playToggleReal){
                   videoRef.current.pause();
                   setPlayToggle(false);
                   
                   // Set currentTime based on the progress bar position
                   const newCurrentTime = getVideo.in + (targetTime - getVideo.newIn);
                   videoRef.current.currentTime = newCurrentTime;
                   
                   // Update the state
                   setCurrentTime(targetTime);
                   // currentTimeR.current = targetTime;
                   
                   // Play the video
                   setTimeout(() => {
                      videoRef.current.play();
                      setPlayToggle(true);
                   }, 100); // Resume playback after a short delay
                }else{
                   videoRef.current.pause();
                   setPlayToggle(false);
                   
       
                   // Set currentTime based on the progress bar position
                   const newCurrentTime = getVideo.in + (targetTime - getVideo.newIn);
                   videoRef.current.currentTime = newCurrentTime;
                   
                   // Update the state
                   setCurrentTime(targetTime);
                   // currentTimeR.current = targetTime;
                   
                   // 비디오 재생
                   setTimeout(() => {
                      // videoRef.current.play();
                      // setPlayToggle(true);
                    
                   }, 100); // Resume playback after a short delay
                }
                
             }
          }
       };
    const togglePlay = () => {
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
    const onToggleLegend = (value) => {
       if(value){
          window.scrollTo(0, 0)
          document.body.style.overflow = "hidden"
       }else{
          document.body.style.overflow = "auto"
       }
       setToggleLegend(value)
    }
  
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
         
       }
 
       // event = keyup & keydown
       document.addEventListener('keyup',onKeyController)
       document.addEventListener('keydown',onSpaceScroll)
 
       return () => {
          document.removeEventListener("keyup", onKeyController)
          document.removeEventListener("keydown", onSpaceScroll)
       }
    },[])
    return (<div className="w-full h-[calc(100svh-56px)] relative">
       <div className="w-full h-[calc(100svh-56px)] overflow-hidden flex flex-col">
          {/* Video Container */}
          <div className="w-full h-full flex flex-col overflow-hidden relative">
             {/* Video */}
             {<video ref={videoRef} src={`${BASE_URL}/${currentVideo && currentVideo.id}/480p1.mp4`} className={`${(toggleShow.view === "overview" && (playToggleReal)) ? "w-[calc(100vw-660px)]" : "w-full"} h-full bg-black transition-all duration-1000`} controls={false} aria-label="video player" preload="auto">
               <source type="video/mp4" />
               Your browser does not support the video tag.
             </video>}
             {/* Video Info */}
             {
                <div className={`absolute z-[40] top-0 left-0 w-full h-full ${!playToggleReal ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"} transition-all duration-1000 flex flex-col`}>
                   <div className="w-full lg:w-2/3 text-black px-2 py-1 bg-[#8BA5F8] text-4xl font-bold italic">{metaData.title}</div>
                   <div className="bg-white text-black w-fit px-2 py-1 mt-4">
                      <div>Author: {Boolean(metaData.director) && Boolean(metaData.director.length > 0) && metaData.director.map((v) => `${v},`)} {metaData.user}</div>
                         <div className="flex items-center gap-2">
                            <div>Created:</div>
                            <div>{metaData.created}</div>
                         </div>
                         <div className="flex items-center gap-2">
                            <div>Modified:</div>
                            <div>{metaData.modified}</div>
                         </div>
                      </div>
                </div>
                }
             <div className={`absolute top-0 left-0 z-[20] overflow-hidden w-full h-full bg-white flex pointer-events-none ${playToggleReal ? "opacity-0" : "opacity-100"} transition-all duration-1000`}>
                {
                   data.map((v, idx) => {
                      return <div 
                      key={idx} 
                      className="w-full h-full relative">
                        <Image
                           src={`${BASE_URL}/${data[idx].id}/480p${data[idx].in}.jpg`}
                           fill
                           alt=""
                           style={{objectFit: "cover"}}
                        />

                      </div>
                   })
                }
             </div>
             {/* Video Data Visualization */}
             {/* - Diagramatic View */}
             {(videoRef && data) && <DiagramaticView onClickProgressBar={onClickProgressBar} edit={true} data={data} toggleShow={toggleShow} setCurrentTime={setCurrentTime} videoRef={videoRef} playToggle={playToggleReal} duration={data.totalDuration} annotationData={data} annotationLoading={!Boolean(data)} />}
             {/* - Entangled View */}
             {(videoRef && data) && <EntangledView edit={true} toggleShow={toggleShow} playToggle={playToggleReal} currentTime={currentTime} annotationData={data} />}
             {/* - Overview View */}
             {(videoRef && data) && <OverviewView onClickProgressBar={onClickProgressBar} currentTime={currentTime} videoRef={videoRef} setCurrentTime={setCurrentTime} toggleShow={toggleShow} playToggle={playToggleReal} annotationData={data} edit={true} />}
          </div>
          {/* video controller */}
          {(videoRef && currentVideo) && <div className="w-full h-[40px] bg-black border-t-[0.5px] border-neutral-500 text-white flex justify-between items-center">
             <div onClick={togglePlay} className="cursor-pointer px-2">
                {!playToggle && <div>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                   </svg>
                </div>}
                {playToggle && <div>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                   </svg>
                </div>}
             </div>
             <div className="w-full px-2">
                <div className="w-full h-1 rounded-full relative">
                   <input  onChange={(e) => onClickProgressBar(e)} step={0.1} min={0} max={data.totalDuration} defaultValue={0} type="range" className="w-full bg-red-400 range-custom" />
                   <progress value={currentTime} max={data.totalDuration} className="absolute bg-red-400 w-full h-full select-none pointer-events-none"></progress>
                </div>
             </div>
             <div className="w-fit text-center text-[12px] whitespace-nowrap font-ibm_mono_regular px-2">{formatTime(currentTime)} / {formatTime(data.totalDuration)}</div>
          </div>}
          {/* video navigation */}
          <VideoNavigation onToggleShow={onToggleShow} toggleShow={toggleShow} onToggleLegend={onToggleLegend} />
       </div>
      
        {/* video Legend */}
        {toggleLegend && <LegendContainer onToggleLegend={onToggleLegend} />}
    </div>
 
    )
 }
export default EditPlayerCon;