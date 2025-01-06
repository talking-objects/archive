import {  useEffect, useMemo } from "react"
import LeafletMap from "../../../../map/Map"





const TagBox = ({tag}) => {
  
   return <div className="w-full flex flex-wrap gap-2 border-[#000000] border bg-white p-1">
      {
         tag.value.map((val, idx) => {
            
            return <div key={idx} className="bg-[#3118E8] px-2 py-1 text-white text-xl">{val.slice(0,1) === "#" ? val.slice(0) : `#${val.slice(0)}`}</div>
         })
      }
      </div>
}

const PlaceBox = ({place, allPlaces}) => {
   const miniMap = useMemo(() => (<LeafletMap center={[place.position.lat, place.position.long]} allPlaces={allPlaces} />), [allPlaces, place])
   return <div className="w-full h-full min-h-[200px] flex flex-col text-[#3118E8] border-[#EC6735] border-4 font-bold text-2xl">
      <div className="w-full p-2 bg-white">{place.type}</div>
      <div className="flex-1 w-full h-full bg-red-400 border-white border flex justify-center items-center relative">
         {miniMap}
      </div>
   </div>
}

const EventBox = ({event}) => {
   return <div className="w-full min-h-[200px] h-full flex flex-col px-2 py-2 bg-[#3118E8] border-[#F1A73D] border-4 text-white">
      <div>{event.type}</div>
      <div className="w-full h-full flex-1 border-white border flex justify-center items-center">Event</div>
   </div>
}

const NarrationBox = ({narration}) => {
  
   return <div className="w-full min-h-[200px] h-full flex flex-col px-2 py-2 bg-white gap-4 border-[#8BA5F8] border-4 text-black overflow-hidden">
      {/* <div><div className="w-10 aspect-square rounded-full bg-[#8BA5F8]"></div></div> */}
      <div>{narration.type}</div>
      {narration.value && <div className="text-sm">{narration.value}</div>}
   </div>
}
const ReferenceBox = ({reference}) => {
   return <div className="w-full h-full border-[#000000] border rounded-lg  flex flex-col overflow-hidden px-2 py-2 bg-white gap-4 text-black">
      {/* <div><div className="w-10 aspect-square rounded-full border-[#EC6735] border-4 bg-white"></div></div> */}
      <div className="text-[16px] font-ibm_mono_italic">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and </div>
      {reference.value && <div className="text-sm font-ibm_mono_italic">{reference.value}Lorem Text</div>}
   </div>
}

const CategoryBox = ({category}) => {
   return <div style={{backgroundColor: category.category.color}} className="w-full h-full text-4xl text-white italic px-2 py-1">{category.category.value}</div>
}

export const OverViewBox = ({data, fakeData=false}) => {
     switch (data.type) {
      case "categoryLayer":
         return <CategoryBox category={data} />
      case "placeLayer":
         return <PlaceBox place={data} allPlaces={fakeData.placeList} />
      case "tagLayer":
         return <TagBox tag={data} />
      case "referenceLayer":
         return <ReferenceBox reference={data} />
      case "eventLayer":
         return <EventBox event={data} />
      case "narrationLayer":
         return <NarrationBox narration={data} />
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


