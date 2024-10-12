"use client"

import { useParams } from "next/navigation";

const VideoWrapper = () => {
    const params = useParams();



    
    return (<div className="w-screen h-[100svh] flex justify-center items-center">
        Video Id: {params.slug}
    </div>)
}

export default VideoWrapper;