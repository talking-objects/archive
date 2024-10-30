import { MainContainer } from "@/app/components/containers/Containers";
import { getClip } from "@/app/utils/hooks/pandora_api";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


const ClipWrapper = () => {
    const params = useParams();
    const router = useRouter();
    const dd = useSearchParams();
    const {isLoading, data, error} = getClip({originId:dd.get("clipId")})
    const [getVideoData, setVideoData] = useState(null);
    useEffect(() => {
        console.log(dd.get("clipId"))

    },[])

    useEffect(() => {
        if(!isLoading){
            console.log(data)
        }
    },[data])
   
 
    return (
        <MainContainer>
            {(!isLoading && getVideoData) && <>
            
            
            </>
            }
        </MainContainer>
      
    )
}


export default ClipWrapper;