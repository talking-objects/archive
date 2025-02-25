import ContentContainer from "@/app/components/containers/ContentContainer";
import ForestContentsBox from "@/app/components/containers/forest/ForestContentsBox";
import { useEffect, useState } from "react";
import ExploreBtn from "./elements/ExploreBtn";


const ForestSubSection = ({forestData}) => {

  return (
      <div className="w-full h-fit mt-12">
        <div className="-mb-16 px-4 font-ibm_mono_bolditalic text-lg">
          <div>Index</div>
        </div>
          {
              forestData.length > 0 && (
                <ContentContainer full={false}>
                  <ForestContentsBox
                    allData={forestData}
                  />
                </ContentContainer>
          )}
        <ExploreBtn path={"/forest"} filter={"all"} view={"all"} />
      </div>
    
  );
};

export default ForestSubSection;
