
import { ContentContainer, EditVideoPlayerContainer, MainContainer } from "@/app/components/containers/Containers";
import { createFakeAnnotations } from "@/app/utils/hooks/etc";
import { getAllClipsOfSelectedVideo } from "@/app/utils/hooks/pandora_api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


const EditWrapper = () => {
    const params = useParams();
    const {data, isLoading, error} = getAllClipsOfSelectedVideo({itemId: params.slug})
    const [editData, setEditData] = useState(null);
    
    // 🤡 Fake Data
    // Create Random Data
    // create random clips list => Edit
    // create random annotation data for each clips => Clip
    useEffect(() => {
        if(!isLoading){
            console.log(data)
            let originalData = JSON.parse(JSON.stringify(data.data.items[0].clips))
         
            if(originalData.length > 0){
                let totalDuration = 0;
                for(let i = 0; i < originalData.length; i++){
                    originalData[i].id = data.data.items[0].id
                    originalData[i].annotations = createFakeAnnotations({duration: (originalData[i].out - originalData[i].in), editVersion: true})
                    originalData[i].duration = originalData[i].out - originalData[i].in
                    if(originalData[i - 1]){
                        originalData[i].newIn = originalData[i - 1].newOut
                        originalData[i].newOut = originalData[i].newIn + originalData[i].duration
                    }else{
                        originalData[i].newIn = 0
                        originalData[i].newOut = originalData[i].newIn + originalData[i].duration
                    }
                    totalDuration += originalData[i].duration
                }
                originalData.totalDuration = totalDuration
                console.log(originalData)
                setEditData(originalData)
            }
           
        }
    },[data])
  
 
    return (
        (<MainContainer>
            {(Boolean(editData)) && <>
                <div className="w-full h-[100svh] relative">
                    <EditVideoPlayerContainer data={editData} />
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