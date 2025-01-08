import {  useEffect, useMemo } from "react"
import LeafletMap from "../../../../map/Map"





const TagBox = ({tag}) => {
   return <div className="w-fit flex max-w-[480px] flex-wrap gap-1 bg-white p-1">
      {
         tag.value.map((val, idx) => {
            return <div key={idx} className="bg-[#3118E8] px-2 py-1 text-white text-[16px] font-ibm_mono_bolditalic">{val.slice(0,1) === "#" ? val.slice(0) : `#${val.slice(0)}`}</div>
         })
      }
      </div>
}

const PlaceBox = ({place, allPlaces, diagramatic=false, over=false}) => {
   const miniMap = useMemo(() => (<LeafletMap center={[place.position.lat, place.position.long]} diagramatic={diagramatic} allPlaces={allPlaces} />), [allPlaces, place])
   return <div className={`flex w-full ${over ? "" : "max-w-[600px]"} flex-col font-bold text-2xl h-[360px] overflow-hidden rounded-2xl bg-blue-400 relative`}>
      <div className="flex-1 h-full flex justify-center items-center w-[600px]">
         {miniMap}
      </div>
   </div>
}

const EventBox = ({event, over=false}) => {
   return <div className={`w-full h-[360px] ${over ? "" : "max-w-[600px]"} overflow-hidden min-h-[200px] flex flex-col bg-[#3118E8] border-[#F1A73D] text-white rounded-2xl`}>
      {/* <div>{event.type}</div> */}
      <div className="h-full flex-1 flex justify-center items-center w-[600px]">Event</div>
   </div>
}

const NarrationBox = ({narration, over}) => {
   return <div className={`w-full h-full ${over ? "" : "max-w-[350px]"} border-[#8BA5F8] border-4 rounded-lg flex flex-row min-h-[200px] overflow-hidden px-2 py-2 bg-white gap-4 text-black`}>
      <div><div className="w-10 aspect-square rounded-full border-[4px] border-[#8BA5F8]"></div></div>
      {/* <div className="text-[16px] font-ibm_mono_italic">{narration.type}</div> */}
      <div className="text-[16px] font-ibm_mono_italic">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's  </div>
      {narration.value && <div className="text-[16px] font-ibm_mono_italic">{narration.value}</div>}
   </div>
}
const ReferenceBox = ({reference, over}) => {
   return <div className={`w-full ${over ? "" : "max-w-[350px]"} h-full border-[#EC6735] border-4 rounded-lg  flex flex-row min-h-[200px] overflow-hidden px-2 py-2 bg-white gap-4 text-black`}>
      {/* <div><div className="w-10 aspect-square rounded-full border-[#EC6735] border-4 bg-white"></div></div> */}
      <div><div className="w-10 aspect-square rounded-full border-[4px] border-[#EC6735]"></div></div>
      <div className="text-[16px] font-ibm_mono_italic">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and unknown printer took a galley of type and unknown printer took a galley of type and </div>
      {reference.value && <div className="text-[16px] font-ibm_mono_italic">{reference.value}Lorem Text</div>}
   </div>
}

const CategoryBox = ({category}) => {
   return <div className="w-full flex flex-wrap">
      <div style={{backgroundColor: category.category.color}} className="h-full text-4xl text-white font-ibm_mono_bolditalic text-[30px] px-2 py-1 flex w-fit max-w-[480px]">{category.category.value}</div>
   </div>
}

export const OverViewBox = ({data, fakeData=false, over=false, diagramatic=false}) => {
     switch (data.type) {
      case "categoryLayer":
         return <CategoryBox category={data} />
      case "placeLayer":
         return <PlaceBox place={data} allPlaces={fakeData.placeList} diagramatic={diagramatic} over={over} />
      case "tagLayer":
         return <TagBox tag={data} />
      case "referenceLayer":
         return <ReferenceBox reference={data} over={over} />
      case "eventLayer":
         return <EventBox event={data} over={over} />
      case "narrationLayer":
         return <NarrationBox narration={data} over={over} />
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


