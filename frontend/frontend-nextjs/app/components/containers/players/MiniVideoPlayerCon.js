import { BASE_URL } from "@/app/utils/constant/etc";
import { formatTime } from "@/app/utils/hooks/etc";
import { useEffect, useRef, useState } from "react";

const MiniVideoPlayerCon = ({getCurrentItem, currentBox, getItemTime, getCurrentTimeForMini, getVideoData, showContentVideo}) => {
    const videoRef = useRef();
    const [playing, setPlaying] = useState(false)
    const [currentData, setCurrentData] = useState(null)
    const [currentTime, setCurrentTime] = useState(0)
    const boxes = {
        contextBox: {
            name: "contextBox",
            annotationName: ""
        },
        placeBox: {
            name: "placeBox",
            annotationName: "placeList"
        },
        eventBox: {
            name: "eventBox",
            annotationName: "eventList"
        },
        cateAndTagBox: {
            name: "cateAndTagBox",
            annotationName: ["categoryList", "tagList"]
        },
        refBox: {
            name: "refBox",
            annotationName: "refList"
        },
        narrationBox: {
            name: "narrationBox",
            annotationName: "narrationList"
        },
    };

    useEffect(() => {
        if(videoRef){
            if(!showContentVideo){
                videoRef.current.pause()
                setPlaying(false)
                //  setPlayToggle(false)

             }else{
                 videoRef.current.currentTime = getCurrentTimeForMini
                //  videoRef.current.play()
             }
        }
      },[showContentVideo, getCurrentTimeForMini])

    useEffect(() => {
        if(videoRef && Boolean(getItemTime)){
            if(getItemTime > 0){
                videoRef.current.currentTime = getItemTime
                setCurrentTime(getItemTime)
            }
        }
    },[getItemTime])

    useEffect(() => {
        if(playing){
            if(videoRef.current.paused){
                videoRef.current.play()
            }
        }else{
            if(!videoRef.current.paused){
                videoRef.current.pause()
            }
        }
    },[playing])

    const onClickPlay = () => {
        setPlaying(prev => !prev)
    }

    useEffect(() => {
        if(currentBox){
            if(boxes[currentBox].name === "contextBox"){
                setCurrentData(null)
            }else if(boxes[currentBox].name === "cateAndTagBox"){
                
            }else{
                
                setCurrentData(getVideoData.nAnnotations[boxes[currentBox].annotationName])
            }
            // setCurrentData(getVideoData.nAnnotations[])
            // 
        }
       
    },[currentBox])

     // update video progress bar
     useEffect(() => {
        const videoElement = videoRef.current
        if (playing && videoElement || getItemTime) {
            // setCurrentTime(0)
           const handleTimeUpdate = () => {
              
                 const newCurrentTime = videoElement?.currentTime
                 setCurrentTime(newCurrentTime)
                 // end
                 if(Math.round(newCurrentTime) > getVideoData.duration){
                    videoElement.pause()
                    videoElement.currentTime = 0
                    setCurrentTime(0)
                    setPlaying(false)
                 }
                //  if(getCurrentItem){
                //   if(Math.round(newCurrentTime) > (getCurrentItem.out)){
                //     videoElement.pause()
                //     videoElement.currentTime = getCurrentItem.in
                //     setCurrentTime(getCurrentItem.in)
                //     setPlaying(false)
                //  }
                //  }
                
              
              
             
           };
           videoElement.ontimeupdate = handleTimeUpdate
        
           return () => {
              videoElement.ontimeupdate = null
           };
        }
     },[playing, getItemTime])

     const onClickProgressBar = (e) => {
 
        if(videoRef){
              videoRef.current.currentTime = parseFloat(e.target.value)
              setCurrentTime(e.target.value)
        }
           
       
        
     }
    return (
      <div className="relative group w-full h-fit  border-4 border-eva-c2 rounded-md overflow-hidden">
        <div
          onClick={onClickPlay}
          className={`opacity-0 group-hover:opacity-100 transition-all duration-300 absolute cursor-pointer top-1/2 left-1/2 bg-black text-white -translate-x-1/2 -translate-y-1/2 rounded-full bg-opacity-50 w-[60px] aspect-square flex justify-center items-center z-50`}
        >
          {playing && (
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-9"
              >
                <path
                  fillRule="evenodd"
                  d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
          {!playing && (
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-9 translate-x-[2px] opacity-90"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="w-full bg-black flex items-center justify-center h-[50vh]">
          <video
            ref={videoRef}
            src={`${BASE_URL}/${getVideoData.id}/480p1.mp4`}
            className={`w-full h-full `}
            controls={false}
            aria-label="video player"
            preload="auto"
          >
            <source type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {currentBox  && (
          <div className="absolute bottom-0 left-0 w-full h-[20px] overflow-hidden flex group-hover:opacity-100 duration-300 opacity-0">
            <div className="w-full px-2 flex justify-stretch items-center bg-black text-white gap-2">
              <div className="w-full h-1 rounded-full relative">
                <input
                  onChange={(e) => onClickProgressBar(e)}
                  step={0.01}
                  min={0}
                  max={getVideoData.duration}
                  defaultValue={0}
                  type="range"
                  className="w-full bg-red-400 range-custom"
                />
                <progress
                  value={currentTime}
                  max={getVideoData.duration}
                  className="absolute bg-red-400 w-full h-full select-none pointer-events-none"
                ></progress>
              </div>
               <div className="w-fit text-[12px] font-ibm_mono_regular whitespace-nowrap">{formatTime(currentTime)} / {formatTime(getVideoData.duration)}</div>
            </div>
            {/* <div>
                        {boxes[currentBox].name === "placeBox" && <div className="w-full h-[16px] bg-eva-c4 "></div>}
                        {boxes[currentBox].name === "eventBox" && <div className="w-full h-4 bg-eva-c6 absolute top-0 left-0"></div>}
                        {boxes[currentBox].name === "cateAndTagBox" && <div className="w-full h-4 bg-eva-c1 absolute top-0 left-0"></div>}
                        {boxes[currentBox].name === "refBox" && <div className="w-full h-4 bg-eva-c4 absolute top-0 left-0"></div>}
                        {boxes[currentBox].name === "narrationBox" && <div className="w-full h-4 bg-eva-c2 absolute top-0 left-0"></div>}
                    </div> */}
          </div>
        )}
      </div>
    );
}

export default MiniVideoPlayerCon;