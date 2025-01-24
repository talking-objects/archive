import { icon } from "leaflet";
import { useEffect, useRef } from "react";
import { CircleMarker, MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import * as L from "leaflet"
import 'leaflet/dist/leaflet.css'
import "./Map.css"
import Link from "next/link";

function MapWithResize() {
  const map = useMap();

  useEffect(() => {
      const handleResize = () => {
          map.invalidateSize(); // Invalidate the size on window resize
      };

      window.addEventListener('resize', handleResize);

      // Cleanup event listener on component unmount
      return () => window.removeEventListener('resize', handleResize);
  }, [map]);

  return null;
}
function MapUpdate({center, allPlaces}) {
  const map = useMap();

  useEffect(() => {
      const handleResize = () => {
          map.invalidateSize(); // Invalidate the size on window resize
      };
      handleResize()
     
  }, [center]);

  useEffect(() => {

    if(allPlaces){
      const positions = allPlaces.map((v) => {
        return [v.position.lat, v.position.long]
      })
      const bounds = L.latLngBounds(positions);

      map.fitBounds(bounds)

    }
   
  },[allPlaces])

  return null;
}


const CustomMarker = ({ center, v, content, changeItemTime, forest=false}) => {
  const markerRef = useRef(null)
  const isCenterMarker = center[0] === v.position.lat && center[1] === v.position.long;
  // useEffect(() => {
  //   if (markerRef.current) {
  //     // Set zIndexOffset: higher value for the marker with ICON2
  //     // markerRef.current.setZIndexOffset(isCenterMarker ? 1000 : 0);
  //     
  //   }
  // }, [isCenterMarker]);
  useEffect(() => {
    if (markerRef.current) {
  
      if (isCenterMarker) {
        markerRef.current.bringToFront(); // 중심 마커를 앞으로 가져오기
      } else {
        markerRef.current.bringToBack(); // 다른 마커는 뒤로 보내기
      }
    }
  }, [isCenterMarker]);

 
    return <CircleMarker
    key={`${v.position.lat}-${v.position.long}`} 
    eventHandlers={{
      click: () => {
        if(content && changeItemTime){
          changeItemTime({data: v})
        }
      }
    }}
    ref={markerRef}
    center={[v.position.lat, v.position.long]}
    radius={10}
    pathOptions={{color: isCenterMarker ? "#EC6735" : "#F1A73D", weight: 4, fillColor: isCenterMarker ? "#3118E8" : "white", fillOpacity: 1}}
    >
      <Popup className="rounded-none" minWidth={400} maxWidth={400}>
        <div className="font-ibm_mono_regular w-full min-w-[320px] bg-white max-h-[350px] overflow-y-scroll py-4 px-4 flex flex-col ">
          {forest && <Link href=""><div className="text-black mb-4">Go to Video</div></Link>}
          {v.value?.source && <a target="_blank" className="flex w-fit h-fit justify-center items-center font-ibm_mono_bold rounded-md mb-4" href={`${v.value.source}`}><div className="w-[24px] h-[24px] flex justify-center items-center text-black"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                     </svg></div></a>}
          {v.value?.placeName && <div className="font-ibm_mono_bold mb-2">{v.value.placeName}</div>}
          {v.value?.content && <div className="whitespace-pre-wrap">{v.value.content}</div>}
        </div>
      </Popup>
    </CircleMarker>
  
 
  // return (
  //       <Marker
  //         eventHandlers={{
  //           click: () => {
  //             if(content){
  //               changeItemTime({data: v})
  //             }
  //           }
  //         }}
  //       ref={markerRef} icon={(center[0] === v.position.lat && center[1] === v.position.long) ? ICON2 :ICON} position={[v.position.lat, v.position.long]}>
  //         <Popup>
  //           A pretty CSS3 popup. <br /> Easily customizable.
  //         </Popup>
  //       </Marker>
  // )
}
const LeafletMap = ({center=[52.5200,13.4050], allPlaces, content=false, changeItemTime=false, diagramatic=false, forest=false}) => {
  // const ICON = icon({
  //   iconUrl: "/map-marker.svg",
  //   iconSize: [32, 32],
  // })

  // const ICON2 = icon({
  //   iconUrl: "/marker-19.svg",
  //   iconSize: [32, 32],
  // })


 
  return (
    <MapContainer className="w-full h-full bg-blue-400 absolute top-0 left-0" center={center} zoomAnimation={!diagramatic} attributionControl={false} zoom={5} doubleClickZoom={false} zoomControl={!diagramatic} scrollWheelZoom={false} minZoom={2} maxZoom={12} dragging={!diagramatic}>
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
        url="https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png?api_key=1d71d2d1-46eb-44d4-94f7-4fb64e39bc8d"
      />
      {/* <Marker icon={ICON} position={center}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
      {
        allPlaces && allPlaces.map((v, idx) => {
          return <CustomMarker forest={forest} changeItemTime={changeItemTime} key={idx} content={content} v={v} center={center}/>
        })
      }
      <MapUpdate center={center} allPlaces={allPlaces} />
    </MapContainer>
  );
};

export default LeafletMap;
