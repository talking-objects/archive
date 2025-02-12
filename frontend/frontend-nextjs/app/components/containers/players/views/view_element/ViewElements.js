import {  useEffect, useMemo } from "react"
import LeafletMap from "../../../../map/Map"





const TagBox = ({tag}) => {
   return <div className="w-fit flex max-w-[480px] flex-wrap gap-1 bg-white p-1">
      {
         tag.value.value.split(",").map((val, idx) => {
            return <div key={idx} className="bg-[#3118E8] px-2 py-1 text-white text-[16px] font-ibm_mono_bolditalic">{val.slice(0,1) === "#" ? val.slice(0) : `#${val.slice(0)}`}</div>
         })
      }
      </div>
}

const PlaceBox = ({place, allPlaces=[], diagramatic=false, over=false}) => {
   const miniMap = useMemo(() => (<LeafletMap center={[parseFloat(place.value.value.latitude), parseFloat(place.value.value.longitude)]} diagramatic={diagramatic} allPlaces={allPlaces} />), [allPlaces, place])
   return <div className={`flex w-full ${over ? "" : "max-w-[600px]"} flex-col font-bold text-2xl h-[360px] overflow-hidden rounded-2xl bg-blue-400 relative`}>
      <div className="flex-1 h-full flex justify-center items-center w-[600px]">
         {miniMap}
      </div>
   </div>
}

const EventBox = ({event, over=false}) => {
   function formatDateToYYYYMMDD(date) {
      const year = date.getFullYear();
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = monthNames[date.getMonth()]; // Get month as a 3-letter abbreviation
      const day = String(date.getDate()).padStart(2, '0'); // Add leading zero for single-digit days
      return `${month}/${day}/${year}`;
  
    }
   return <div className={`w-full h-[360px] ${over ? "" : "max-w-[600px]"} overflow-y-scroll min-h-[200px] flex flex-col bg-[#3118E8] border-[#F1A73D] text-white rounded-2xl`}>
      <div className="h-full flex-1 flex flex-col w-[600px] px-6 py-6">
         <div className="flex gap-1 mb-4 font-ibm_mono_semibold">
            <div>{formatDateToYYYYMMDD(new Date(event.value.value.startDate))}</div>-<div>{formatDateToYYYYMMDD(new Date(event.value.value.endDate))}</div>
         </div>
         {event.value.value?.text && <div className="font-ibm_mono_italic whitespace-pre-wrap">{event.value.value.text}</div>}
      </div>
   </div>
}
const DataBox = ({data, over=false}) => {
  
   return <div className={`w-full h-[360px] ${over ? "" : "max-w-[600px]"} overflow-y-scroll min-h-[200px] flex flex-col bg-[#000] border-4 border-white text-white rounded-2xl px-6 py-6`}>
      {data.value?.value?.url && <div className="w-full h-10 flex items-center">
            <div className="w-[24px] h-[24px] flex justify-center items-center overflow-hidden relative">
               <a target="_blank" href={data.value?.value?.url} className=" flex w-full h-full justify-center items-center text-white transition-all ">
                     <div className="text-white transition-all "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                     </svg>
                  </div>
               </a>
            </div>
         </div>}
      <div className="h-full flex-1 flex flex-col w-[600px]">
         {data.value.value.text}
      </div>
   </div>
}

const NarrationBox = ({narration, over}) => {
   return <div className={`w-full h-full ${over ? "" : "max-w-[350px]"} border-[#8BA5F8] border-4 rounded-lg flex flex-row min-h-[200px] overflow-hidden px-2 py-2 bg-white gap-4 text-black`}>
      <div><div className="w-10 aspect-square rounded-full border-[4px] border-[#8BA5F8]"></div></div>
      {/* <div className="text-[16px] font-ibm_mono_italic">{narration.type}</div> */}
      
      { <div className="text-[16px] font-ibm_mono_italic whitespace-pre-wrap">{narration.value.value ? narration.value.value : "no data"}</div>}
   </div>
}
const ReferenceBox = ({reference, over}) => {
   return <div className={`w-full ${over ? "" : "max-w-[350px]"} h-full border-[#EC6735] border-4 rounded-lg  flex flex-row min-h-[200px] overflow-hidden px-2 py-2 bg-white gap-4 text-black`}>
      {/* <div><div className="w-10 aspect-square rounded-full border-[#EC6735] border-4 bg-white"></div></div> */}
      <div><div className="w-10 aspect-square rounded-full border-[4px] border-[#EC6735]"></div></div>
      {/* <div className="text-[16px] font-ibm_mono_italic">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and unknown printer took a galley of type and unknown printer took a galley of type and </div> */}
      {<div className="text-[16px] font-ibm_mono_italic">
         {reference.value?.value?.url && <div className="w-full h-10 flex items-center">
            <div className="w-[24px] h-[24px] flex justify-center items-center overflow-hidden relative">
               <a target="_blank" href={reference.value?.value?.url} className=" flex w-full h-full justify-center items-center bg-white transition-all ">
                     <div className="text-black transition-all "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                     </svg>
                  </div>
               </a>
            </div>
         </div>}
         <div className="whitespace-pre-wrap">{reference.value?.value?.text ? reference.value?.value?.text : "no data"}</div>
      </div>}
   </div>
}

const CategoryBox = ({category}) => {

   // if(Array.isArray(category.value.value.category)){
   //    return <div>ttt</div>
   // }
   return <div className="w-full flex flex-wrap">
      <div style={{backgroundColor: category.value.value.color}} className="h-full text-4xl text-white font-ibm_mono_bolditalic text-[30px] px-2 py-1 flex w-fit max-w-[480px]">{category.value.value.value}</div>
   </div>
}

export const OverViewBox = ({data, allPlaces=[], over=false, diagramatic=false}) => {
     switch (data.type) {
      case "categoryLayer":
         return <CategoryBox category={data} />
      case "placeLayer":
         return <PlaceBox place={data} allPlaces={allPlaces} diagramatic={diagramatic} over={over} />
      case "tagLayer":
         return <TagBox tag={data} />
      case "referenceLayer":
         return <ReferenceBox reference={data} over={over} />
      case "eventLayer":
         return <EventBox event={data} over={over} />
      case "narrationLayer":
         return <NarrationBox narration={data} over={over} />
      case "dataLayer":
         return <DataBox data={data} over={over} />
      default:
         return <div>Error: Invalid Layer Type</div>;
   }
}

export const FilterBox = ({children, type, toggleShow}) => {
   if(toggleShow.category && type === "categoryLayer"){
      return <>{children}</>
   }
   if(!toggleShow.category && type === "categoryLayer"){
      return <></>
   }
   if(toggleShow.tag && type === "tagLayer"){
      return <>{children}</>
   }
   if(!toggleShow.tag && type === "tagLayer"){
      return <></>
   }
   if(toggleShow.reference && type === "referenceLayer"){
      return <>{children}</>
   }
   if(!toggleShow.reference && type === "referenceLayer"){
      return <></>
   }
   if(toggleShow.narration && type === "narrationLayer"){
      return <>{children}</>
   }
   if(!toggleShow.narration && type === "narrationLayer"){
      return <></>
   }
   if(toggleShow.event && type === "eventLayer"){
      return <>{children}</>
   }
   if(!toggleShow.event && type === "eventLayer"){
      return <></>
   }
   if(toggleShow.place && type === "placeLayer"){
      return <>{children}</>
   }
   if(!toggleShow.place && type === "placeLayer"){
      return <></>
   }
   
   return <>{children}</>
}


