import { getAllVideos } from "@/app/utils/hooks/pandora_api";
import SectionHeader from "./elements/SectionHeader";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/app/utils/constant/etc";


const CurrentStage = ({totalItemsCount}) => {
  const [getPage, setPage] = useState(1)
  const {data, isLoading}= getAllVideos({pagination:getPage, amount: 3})
  const [getData, setData] = useState(null)

  useEffect(() => {
    if(!isLoading){
      setData(data.data.items)
    }
  },[data])

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
    <div className="w-full flex flex-col gap-4 section-padding">
        <SectionHeader text={"Currently on Stage"} />
         <div className="w-full flex justify-between items-center gap-8">
          <div className={`w-[50px] aspect-square flex justify-center items-center`}>
            <div onClick={onPrev} className={`${getPage <= 1 ? "hidden cursor-auto pointer-events-none": "flex cursor-pointer pointer-events-auto"} w-full h-full flex justify-center items-center border border-black rounded-full`}>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
              </span>
            </div>
          </div>
          {(!isLoading && getData) && <div className="flex-1 grid grid-cols-3 gap-4">
              {
                getData.length > 0 && getData.map((val, idx) => {
                  return <div key={idx} style={{backgroundImage: `url(${BASE_URL}/${val.id}/480p${val.posterFrame}.jpg)`}} className={` w-full aspect-video bg-cover bg-center bg-no-repeat`}></div>
                })
              }
          </div>}
          {(isLoading && getData) && <div className="flex-1 grid grid-cols-3 gap-4">
              {
                getData.length > 0 && getData.map((val, idx) => {
                  return <div key={idx} style={{backgroundImage: `url(${BASE_URL}/${val.id}/480p${val.posterFrame}.jpg)`}} className={` w-full aspect-video bg-cover bg-center bg-no-repeat`}></div>
                })
              }
          </div>}
          <div className={`w-[50px] aspect-square flex justify-center items-center`}>
            <div onClick={onNext} className={`${getPage >= Math.ceil(totalItemsCount/3) ? "hidden cursor-auto pointer-events-none": "flex cursor-pointer pointer-events-auto"} w-full h-full flex justify-center rounded-full border border-black items-center`}>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </div>
          </div>
        </div>

    </div>
  );
};

export default CurrentStage;
