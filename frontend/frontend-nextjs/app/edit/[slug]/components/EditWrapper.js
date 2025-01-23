
import {MainContainer } from "@/app/components/containers/Containers";
import EditPlayerCon from "@/app/components/containers/players/EditPlayerCon";
import { createFakeAnnotations } from "@/app/utils/hooks/etc";
import { getAllClipsOfSelectedVideo } from "@/app/utils/hooks/pandora_api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


const EditWrapper = () => {
    const params = useParams();
    const {data, isLoading, error} = getAllClipsOfSelectedVideo({itemId: params.slug, counts: 5})
    const [editData, setEditData] = useState(null);
    const [editMetaData, setEditMetaData] = useState(null);
    
    // 🤡 Fake Data
    // Create Random Data
    // create random clips list => Edit
    // create random annotation data for each clips => Clip
    useEffect(() => {
        if(!isLoading){
            const metaData = {
                title: "TestEdit_VIDEO_01",
                year: data.data.items[0].year,
                director: data.data.items[0].director,
                modified: data.data.items[0].modified,
                created: data.data.items[0].created,
                user: data.data.items[0].user,

            }
          
            setEditMetaData(metaData)
            let originalData = JSON.parse(JSON.stringify(data.data.items[0].clips))
         
            if(originalData.length > 0){
                let totalDuration = 0;
                for(let i = 0; i < originalData.length; i++){
                    originalData[i].originId = originalData[i].id
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
                for(let i = 0; i < originalData.length; i++){
                    const fAnnotations = originalData[i].annotations;
                    for(let j =0; j < Object.keys(fAnnotations).length; j++){
                       fAnnotations[Object.keys(fAnnotations)[j]].map((v) => {
                       
                          v.originIn = originalData[i].in + v.in
                          v.in = originalData[i].newIn + v.in
                          if(v.out){
                             v.out = originalData[i].newIn + v.out
                             v.originOut = originalData[i].in + v.out
                          }
                          return v
                       })
                      
                    }
                 }

                originalData.id = params.slug
                originalData.totalDuration = totalDuration
                setEditData(originalData)
            }
           
        }
    },[data])
  
 
    return (
        (<MainContainer>
            {(Boolean(editData) && Boolean(editMetaData)) && <>
                <div className="w-full h-[100svh] relative">
                    <EditPlayerCon data={editData} metaData={editMetaData} />
                </div>
               
            </>
            }
        </MainContainer>)
    )
}


export default EditWrapper;