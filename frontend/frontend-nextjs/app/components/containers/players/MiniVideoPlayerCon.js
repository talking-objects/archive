import { BASE_URL } from "@/app/utils/constant/etc";
import { useEffect, useRef, useState } from "react";

const MiniVideoPlayerCon = ({currentBox, getItemTime, getCurrentTimeForMini, getVideoData, showContentVideo}) => {
    const videoRef = useRef();
    const [playing, setPlaying] = useState(false)
    const boxes = {
        contextBox: {
            name: "contextBox"
        },
        placeBox: {
            name: "placeBox"
        },
        eventBox: {
            name: "eventBox"
        },
        cateAndTagBox: {
            name: "cateAndTagBox"
        },
        refBox: {
            name: "refBox"
        },
        narrationBox: {
            name: "narrationBox"
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
    return <div className="relative group">
                <div onClick={onClickPlay} className={`opacity-0 group-hover:opacity-100 transition-all duration-300 absolute cursor-pointer top-1/2 left-1/2 bg-white text-black -translate-x-1/2 -translate-y-1/2 px-2 py-2 z-50`}>
                    {playing && <div>Pause</div>}
                    {!playing && <div>Play</div>}
                </div>
                <video ref={videoRef} src={`${BASE_URL}/${getVideoData.id}/480p1.mp4`} className={` w-full h-full bg-black transition-all duration-1000`} controls={false} aria-label="video player" preload="auto">
                    <source type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            {currentBox && (
                <div className="relative">
                    {boxes[currentBox].name === "placeBox" && <div className="w-full h-4 bg-eva-c4 absolute top-0 left-0"></div>}
                    {boxes[currentBox].name === "eventBox" && <div className="w-full h-4 bg-eva-c6 absolute top-0 left-0"></div>}
                    {boxes[currentBox].name === "cateAndTagBox" && <div className="w-full h-4 bg-eva-c1 absolute top-0 left-0"></div>}
                    {boxes[currentBox].name === "refBox" && <div className="w-full h-4 bg-eva-c4 absolute top-0 left-0"></div>}
                    {boxes[currentBox].name === "narrationBox" && <div className="w-full h-4 bg-eva-c2 absolute top-0 left-0"></div>}
                </div>
            )}
        </div>
}

export default MiniVideoPlayerCon;