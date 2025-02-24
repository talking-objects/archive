import LeafletMap from "../../map/Map";
import ContentBox from "./ContentBox";

const PlaceWrapper = ({ getVideoData, changeItemTime, clip=false }) => {
  return (
    <ContentBox clip={clip} title={"Annotated Places"} id="place_box">
      <div className={`w-full ${clip ? "aspect-video" : "aspect-square"} relative bg-black overflow-hidden `}>
        <LeafletMap
          allPlaces={getVideoData}
          content={true}
          changeItemTime={changeItemTime}
        />
      </div>
    </ContentBox>
  );
};

export default PlaceWrapper;
