import { BASE_URL } from "@/app/utils/constant/etc";
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
                console.log(getVideoData.nAnnotations[boxes[currentBox].annotationName])
                setCurrentData(getVideoData.nAnnotations[boxes[currentBox].annotationName])
            }
            // setCurrentData(getVideoData.nAnnotations[])
            console.log(currentBox)
        }
       
    },[currentBox])

     // update video progress bar
     useEffect(() => {
        const videoElement = videoRef.current
        if (playing && videoElement && getCurrentItem) {
            setCurrentTime(0)
           const handleTimeUpdate = () => {
              
                 const newCurrentTime = videoElement?.currentTime
                 setCurrentTime(newCurrentTime - getItemTime)
                 // end
                 if(Math.round(newCurrentTime) > getCurrentItem.out){
                    videoElement.pause()
                    videoElement.currentTime = getItemTime
                    setCurrentTime(0)
                    setPlaying(false)
                 }
              
              
             
           };
           videoElement.ontimeupdate = handleTimeUpdate
        
           return () => {
              videoElement.ontimeupdate = null
           };
        }
     },[playing, getItemTime])

     const onClickProgressBar = (e) => {
 
        if(videoRef){
          
              console.log(parseFloat(e.target.value) + getItemTime)
              videoRef.current.currentTime = parseFloat(e.target.value) + getItemTime
              setCurrentTime(e.target.value)
           
        }
           
       
        
     }
    return <div className="relative group w-full aspect-square">
            <div onClick={onClickPlay} className={`opacity-0 group-hover:opacity-100 transition-all duration-300 absolute cursor-pointer top-1/2 left-1/2 bg-white text-black -translate-x-1/2 -translate-y-1/2 px-2 py-2 z-50`}>
                {playing && <div>Pause</div>}
                {!playing && <div>Play</div>}
            </div>
            <video ref={videoRef} src={`${BASE_URL}/${getVideoData.id}/480p1.mp4`} className={`w-full h-full aspect-video bg-black transition-all duration-1000`} controls={false} aria-label="video player" preload="auto">
                <source type="video/mp4" />
                Your browser does not support the video tag.
            </video>


            {(currentBox && getCurrentItem) && (
                <div className="absolute bottom-0 left-0 w-full h-[16px] overflow-hidden flex">
                    <div className="w-full px-2">
                        <div className="w-full h-1 rounded-full relative">
                           <input  onChange={(e) => onClickProgressBar(e)} step={0.01} min={0} max={getCurrentItem.out-getCurrentItem.in} defaultValue={0} type="range" className="w-full bg-red-400 range-custom" />
                           <progress value={currentTime} max={getCurrentItem.out-getCurrentItem.in} className="absolute bg-red-400 w-full h-full select-none pointer-events-none"></progress>
                        </div>
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
}

export default MiniVideoPlayerCon;