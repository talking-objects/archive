"use client"

import { ContentContainer, EditVideoPlayerContainer, MainContainer } from "@/app/components/containers/Containers";
import { useParams } from "next/navigation";
import { useEffect } from "react";


const EditWrapper = () => {
    const params = useParams();

 
    return (
        (<MainContainer>
            {(true) && <>
                <div className="w-full h-[100svh] relative">
                    <EditVideoPlayerContainer />
                </div>
               
                <ContentContainer>
                    <div className="w-full relative bg-neutral-200">
                        <div className={`sticky top-0 left-0 w-1/2 aspect-video bg-red-300 ${true ? "translate-x-0 opacity-100 select-auto" : "-translate-x-full opacity-0 pointer-events-none select-none"} transition-all duration-700`}></div>
                        <div className="w-full h-[200svh]">
    
                        </div>
                    </div>
                </ContentContainer>
            </>
            }
        </MainContainer>)
    )
}


export default EditWrapper;