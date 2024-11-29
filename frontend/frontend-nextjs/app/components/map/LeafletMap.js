import { icon } from "leaflet";
import { useEffect, useRef } from "react";
import { CircleMarker, MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import * as L from "leaflet"

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


const CustomMarker = ({ICON, ICON2, center, v, content, changeItemTime}) => {
  const markerRef = useRef(null)
  const isCenterMarker = center[0] === v.position.lat && center[1] === v.position.long;
  useEffect(() => {
    if (markerRef.current) {
      // Set zIndexOffset: higher value for the marker with ICON2
      markerRef.current.setZIndexOffset(isCenterMarker ? 1000 : 0);
    }
  }, [isCenterMarker]);
 
  return (
        <Marker
          eventHandlers={{
            click: () => {
              if(content){
                changeItemTime(v.in)
              }
            }
          }}
        ref={markerRef} icon={(center[0] === v.position.lat && center[1] === v.position.long) ? ICON2 :ICON} position={[v.position.lat, v.position.long]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
  )
}
const LeafletMap = ({center=[52.5200,13.4050], allPlaces, content=false, changeItemTime=false}) => {
  const ICON = icon({
    iconUrl: "/map-marker.svg",
    iconSize: [32, 32],
  })

  const ICON2 = icon({
    iconUrl: "/marker-19.svg",
    iconSize: [32, 32],
  })


 
  return (
    <MapContainer className="w-full h-full bg-blue-400 absolute top-0 left-0" center={center} zoomAnimation={false} attributionControl={false} zoom={10} zoomControl={false} scrollWheelZoom={false} dragging={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Marker icon={ICON} position={center}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
      {
        allPlaces && allPlaces.map((v, idx) => {
        
          return <CustomMarker changeItemTime={changeItemTime} key={idx} content={content} v={v} center={center} ICON={ICON} ICON2={ICON2} />
        })
      }
      <MapUpdate center={center} allPlaces={allPlaces} />
    </MapContainer>
  );
};

export default LeafletMap;
