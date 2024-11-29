import { useEffect, useRef, useState } from "react"
import { formatTime } from "@/app/utils/hooks/etc"
import { FilterBox, OverViewBox } from "./view_element/ViewElements"




const OverviewView = ({data, clip=false, onClickProgressBar, currentTime, videoRef,setCurrentTime, toggleShow, playToggle, annotationData, edit=false}) => {
    const contentRef = useRef(null)
    const scrolltRef = useRef(null)
    const progressRef = useRef(null)
    const [allAnnotation, setAllAnnotation] = useState(null)
    const [getData, setData] = useState(null)

    const onJumpTo = (inValue) => {
       if(edit){
          onClickProgressBar(inValue, edit)
       }else{
          if(!clip){
             videoRef.current.currentTime = inValue
             setCurrentTime(inValue)
          }else{
             videoRef.current.currentTime = data.in + inValue
             setCurrentTime(inValue)
          }
        
       }
       
    }
 
 
    
    useEffect(() => {
       if(contentRef && scrolltRef && progressRef){
          const contentDiv = contentRef.current;
          const scrollDiv = scrolltRef.current;
          const progressDiv = progressRef.current;
 
          if(contentDiv && scrollDiv && progressDiv){
             const scrollEvent = () => {
                const scrollPx = scrollDiv.scrollTop;
                const winHeightPx = scrollDiv.scrollHeight - scrollDiv.clientHeight;
                const scrolled = `${(scrollPx / winHeightPx) * 100}%`;
                progressDiv.style.height = scrolled
             }
             scrollDiv.addEventListener("scroll", scrollEvent)
             return () => {
                scrollDiv.removeEventListener("scroll", scrollEvent)
             }
          }
       }
      
    },[])
 
    useEffect(() => {
       if(!edit){
          setData(annotationData)
       }else{
          let allData = {
             categoryList: [],
             eventList : [],
             narrationList : [],
             placeList : [],
             refList : [],
             tagList: []
          };
          for(let i = 0; i < annotationData.length; i++){
             const fAnnotations = annotationData[i].annotations;
             for(let j =0; j < Object.keys(fAnnotations).length; j++){
              
                const getAnno = fAnnotations[Object.keys(fAnnotations)[j]]
                allData[Object.keys(fAnnotations)[j]] = [...getAnno,...allData[Object.keys(fAnnotations)[j]]]
              
                
             }
          }
          setData(allData)
       }
       if(!edit){
          let allData = []
          for(let i =0; i < Object.keys(annotationData).length; i++){
             allData = [...annotationData[Object.keys(annotationData)[i]],...allData]
          }
          allData = allData.sort((a,b) => a.in - b.in)
 
          setAllAnnotation(allData)
       }else{
          let allData = []
          for(let i = 0; i < annotationData.length; i++){
             const fAnnotations = annotationData[i].annotations;
             for(let j =0; j < Object.keys(fAnnotations).length; j++){
              
                const getAnno = fAnnotations[Object.keys(fAnnotations)[j]]
                allData = [...getAnno,...allData]
                
             }
          }
          console.log(allData)
          allData = allData.sort((a,b) => a.in - b.in)
          setAllAnnotation(allData)
 
       }
      
    },[])
 
 
  
  
    return <div className={`${(toggleShow.view === "overview" && playToggle) ? "translate-x-0" : "translate-x-full"} z-[40] flex absolute top-0 right-0 lg:w-[660px] h-full bg-white transition-all duration-1000`}>
       <div ref={scrolltRef} className="w-full h-full overflow-scroll hide_scrollbar">
          <div ref={contentRef} className="w-full h-fit bg-white py-2 px-4">
                {allAnnotation && <div className="flex flex-col gap-4">
                   {
                      allAnnotation.map((v, idx) => {
                         return <FilterBox key={idx} type={v.type} toggleShow={toggleShow}>
                            <div className="w-full h-fit flex gap-2 items-center">
                               <div className="">
                                  <div className={`w-2 h-2 ${(Math.floor(currentTime) >= Math.floor(v.in) && (currentTime) <= Math.floor(v.out ? v.out : v.in + 5)) ? "bg-emerald-400" : "bg-neutral-300"} rounded-full`}></div>
                               </div>
                               <OverViewBox data={v} fakeData={getData} />
                               <div onClick={() => onJumpTo(v.in)} className="text-xs flex flex-col cursor-pointer hover:bg-black justify-center items-center hover:text-white transition-all duration-150 rounded-md px-1 py-1"><span>{formatTime(v.in)}</span> <span>{v.out && "~"}</span> <span>{v.out && formatTime(v.out)}</span></div>
                            </div>
                          </FilterBox>                         
                      })
                   }
                   </div>}
          </div>
       </div>
       <div className="w-fit h-full bg-white py-2 flex">
          {/* progress bar */}
          <div className="w-1 h-full bg-neutral-100 rounded-full overflow-hidden mr-1">
             <div ref={progressRef} className="w-full h-0 bg-black rounded-full"></div>
          </div>
       </div>
    </div>
 }


export default OverviewView;