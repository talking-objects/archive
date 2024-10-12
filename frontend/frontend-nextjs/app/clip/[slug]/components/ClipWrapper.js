"use client"

import { useParams } from "next/navigation";
import { useEffect } from "react";


const ClipWrapper = () => {
    const params = useParams();

 
    return (
        <div className="w-screen h-[100svh] flex justify-center items-center">
            Clip id:{params.slug}
        </div>
    )
}


export default ClipWrapper;