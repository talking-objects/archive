import { icon } from "leaflet";
import { useEffect, useRef } from "react";
import { CircleMarker, MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import * as L from "leaflet"
import 'leaflet/dist/leaflet.css'
import "./Map.css"

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


const CustomMarker = ({ center, v, content, changeItemTime}) => {
  const markerRef = useRef(null)
  const isCenterMarker = center[0] === v.position.lat && center[1] === v.position.long;
  // useEffect(() => {
  //   if (markerRef.current) {
  //     // Set zIndexOffset: higher value for the marker with ICON2
  //     // markerRef.current.setZIndexOffset(isCenterMarker ? 1000 : 0);
  //     console.log(markerRef)
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
        if(content){
          changeItemTime({data: v})
        }
      }
    }}
    ref={markerRef}
    center={[v.position.lat, v.position.long]}
    radius={10}
    pathOptions={{color: isCenterMarker ? "#EC6735" : "#F1A73D", weight: 4, fillColor: isCenterMarker ? "#3118E8" : "white", fillOpacity: 1}}
    >
      <Popup className="rounded-none ">
        <div className="font-ibm_mono_regular max-h-[350px] overflow-y-scroll py-2 flex flex-col">
          {v.value?.source && <a target="_blank" className="flex w-fit font-ibm_mono_bold px-2 py-2 bg-eva-c2 rounded-md mb-4" href={`${v.value.source}`}><div className="text-white">Source</div></a>}
          {v.value?.placeName && <div className="font-ibm_mono_bold">{v.value.placeName}</div>}
          {v.value?.content && <div>{v.value.content}</div>}
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
const LeafletMap = ({center=[52.5200,13.4050], allPlaces, content=false, changeItemTime=false, diagramatic=false}) => {
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
          return <CustomMarker changeItemTime={changeItemTime} key={idx} content={content} v={v} center={center}/>
        })
      }
      <MapUpdate center={center} allPlaces={allPlaces} />
    </MapContainer>
  );
};

export default LeafletMap;
