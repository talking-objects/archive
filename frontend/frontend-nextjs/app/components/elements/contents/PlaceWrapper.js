import LeafletMap from "../../map/Map";
import ContentBox from "./ContentBox";

const PlaceWrapper = ({ getVideoData, changeItemTime }) => {
  return (
    <ContentBox title={"Annotated Places"} id="place_box">
      <div className="w-full aspect-square relative bg-black overflow-hidden ">
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
