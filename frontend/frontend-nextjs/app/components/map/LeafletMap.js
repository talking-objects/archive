import { icon } from "leaflet";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";


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
function MapUpdate({center}) {
  const map = useMap();

  useEffect(() => {
      const handleResize = () => {
          map.invalidateSize(); // Invalidate the size on window resize
      };
      handleResize()
     
  }, [center]);

  return null;
}
const LeafletMap = ({center=[52.5200,13.4050]}) => {
  const ICON = icon({
    iconUrl: "/map-marker.svg",
    iconSize: [32, 32],
  })
  return (
    <MapContainer className="w-full h-full bg-blue-400 absolute top-0 left-0" center={center} attributionControl={false} zoom={10} zoomControl={false} scrollWheelZoom={false} dragging={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={ICON} position={center}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <MapUpdate center={center} />
    </MapContainer>
  );
};

export default LeafletMap;
