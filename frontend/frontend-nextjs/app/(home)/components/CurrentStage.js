import { getAllVideos, getVideo } from "@/app/utils/hooks/pandora_api";
import SectionHeader from "./elements/SectionHeader";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/app/utils/constant/etc";
import SectionContainer from "./elements/SectionContainer";


const CurrentStageBox = ({val}) => {
    const {data, isLoading} = getVideo({pId: val})
    const [getCurrentVideo, setCurrentVideo] = useState(null);

    useEffect(() => {
      if(!isLoading){
        console.log(val)
        console.log(data)
        if(data.data.items[0]){
          setCurrentVideo(data.data.items[0])
        }
      }
    },[data])
    if(!getCurrentVideo){
      return <div className="w-full aspect-video bg-cover bg-center bg-no-repeat">Error</div>
    }
    return <div style={{backgroundImage: `url(${BASE_URL}/${getCurrentVideo.id}/480p${getCurrentVideo.posterFrame}.jpg)`}} className={`w-full aspect-video bg-cover bg-center bg-no-repeat`}></div>
}


const CurrentStage = ({itemList}) => {
  const [getPage, setPage] = useState(1)
  
  const onNext = () => {
    setPage(prev => prev + 1)
  }
  const onPrev = () => {
    setPage(prev => {
      if(prev > 1){
        return prev -1
      }else{
        return prev
      }
    })
  }


  return (
    <div className="w-full flex flex-col gap-4 px-4 py-4 section-padding">
        <SectionHeader text={"Currently on Stage"} />
         <div className="w-full flex justify-between items-center gap-8">
         
          {itemList && <div className="flex-1 grid grid-cols-3 gap-4">
              {
                itemList.length > 0 && itemList.map((val, idx) => {
                  return <CurrentStageBox key={idx} val={val} />
                })
              }
          </div>}
          
        </div>

    </div>
  );
};

export default CurrentStage;
