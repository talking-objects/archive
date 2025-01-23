
import dynamic from "next/dynamic";
import 'leaflet/dist/leaflet.css';



const Map = dynamic(() => import("./LeafletMap.js"), {ssr: false})

export default Map;