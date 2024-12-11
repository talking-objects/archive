"use client";

import { loadingState } from "@/app/utils/recoillib/state/state";
import { useRecoilState } from "recoil";
import { MainContainer } from "../containers/Containers";
import ContentContainer from "../containers/ContentContainer";

const Footer = () => {
  const [getLoadingState, setLoadingState] = useRecoilState(loadingState);
  return (
    <>
      {getLoadingState.isLoading && getLoadingState.hasAnimated && (
        <div className="w-full min-h-[200px] bg-black flex text-white text-[14px] font-semibold">
          <ContentContainer full={false}>
            <div className="w-full flex py-8 gap-8 leading-tight">
              <div className="flex-[4] h-full flex gap-8">
                <div className="flex-[3] flex flex-col gap-8">
                  <div>
                    <div>Info</div>
                    <div className="w-[90%]">TALKING OBJECTS LAB will be part of the project TALKING OBJECTS initiated by Isabel Raabe. TALKING OBJECTS also includes the TALKING OBJECTS ARCHIVE, a digital archive for decolonial knowledge production, which is scheduled to go online in 2024.</div>
                  </div>
                  <div>GNU Public License by XXX YYY Beta Version 1.2</div>
                </div>
                <div className="flex-[2] flex flex-col gap-8">
                    <div>Learn More (all outgoing links)</div>
                    <div className="flex flex-col">
                      <div className="underline">Talking Objects Archive</div>
                      <div className="underline">Talking Objects Lab</div>
                      <div className="underline">Imprint</div>
                      <div className="underline">About Talking Objects</div>
                    </div>
                  </div>
              </div>
              <div className="flex-[3] h-full"></div>
            </div>
          </ContentContainer>
        </div>
      )}
    </>
  );
};

export default Footer;
