import { BASE_URL } from "@/app/utils/constant/etc";
import { useEffect, useRef } from "react";

const MiniVideoPlayerCon = ({getItemTime, getCurrentTimeForMini, getVideoData, showContentVideo}) => {
    const videoRef = useRef();

    useEffect(() => {
        if(videoRef){
            if(!showContentVideo){
                videoRef.current.pause()
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
    return <div>
        <video ref={videoRef} src={`${BASE_URL}/${getVideoData.id}/480p1.mp4`} className={` w-full h-full bg-black transition-all duration-1000`} controls={true} aria-label="video player" preload="auto">
            <source type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    </div>
}

export default MiniVideoPlayerCon;