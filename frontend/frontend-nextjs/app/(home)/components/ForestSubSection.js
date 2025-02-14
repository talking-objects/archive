import ContentContainer from "@/app/components/containers/ContentContainer";
import ForestContentsBox from "@/app/components/containers/forest/ForestContentsBox";
import {
  getAllAnnotations,
  getAllClips,
  getAllVideos,
} from "@/app/utils/hooks/pandora_api";
import { useEffect, useState } from "react";
import ExploreBtn from "./elements/ExploreBtn";

const ForestSubSection = () => {
  const [forestData, setForestData] = useState([]);
  return (
    <div className="w-full h-fit mt-12">
      <div className="-mb-16 px-4 font-ibm_mono_bolditalic text-lg">
        <div>Index</div>
      </div>
      {forestData.length > 0 && (
        <ContentContainer full={false}>
          <ForestContentsBox
            isLoading={isLoading || isLoadingClips || isLoadingAnnotations}
            allData={allData}
          />
        </ContentContainer>
      )}
      <ExploreBtn path={"/forest"} />
    </div>
  );
};

export default ForestSubSection;
