import { icon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const LeafletMap = ({center=[52.5200,13.4050]}) => {
  const ICON = icon({
    iconUrl: "/map-marker.svg",
    iconSize: [32, 32],
  })
  return (
    <MapContainer className="w-full h-full bg-blue-400 absolute top-0 left-0" center={center} attributionControl={false} zoom={10} zoomControl={false} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={ICON} position={center}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;
