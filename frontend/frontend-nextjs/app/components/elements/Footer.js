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
              <div className="flex-[1] h-full flex flex-col justify-between gap-8">
                <div>
                  <div>Info</div>
                  <div className="">
                    This experimental video archive is lore ipusm dolor stat
                    sulum.
                  </div>
                </div>
                <div>
                  <div>GNU Public License by XXX YYY Beta Version 1.2</div>
                </div>
                <div>Imprint</div>
              </div>
              <div className="flex-[1] h-full flex flex-col justify-between gap-8">
                <div>
                  <div>Contact</div>
                  <div>For XXX Inquiries contact email@xxx.de</div>
                </div>
                <div>For YYY please contact loren Epsom</div>
                <div>
                  <div>www.eva.de</div>
                  <div>www.talkingobjectsarchive.org</div>
                </div>
              </div>
              <div className="flex-[4] h-full flex gap-4 justify-between">
                <div className="flex flex-col gap-4">
                  <div>About</div>
                  <div>
                    <div>About Page</div>
                    <div>Documentation</div>
                    <div>Glossary</div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div>Archive</div>
                  <div>
                    <div>Archive Index</div>
                    <div>Archive Places</div>
                    <div>Archive Events</div>
                  </div>
                  <div>
                    <div>Database</div>
                    <div>Repository</div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div>Learn More</div>
                  <div>
                    <div>Talking Objects Archive</div>
                    <div>Talking Objects Lab</div>
                    <div>Talking Objects Playground</div>
                  </div>
                </div>
              </div>
              <div className="flex-[3] h-full">
                TALKING OBJECTS LAB will be part of the project TALKING OBJECTS
                initiated by Isabel Raabe. TALKING OBJECTS also includes the
                TALKING OBJECTS ARCHIVE, a digital archive for decolonial
                knowledge production, which is scheduled to go online in 2024.
              </div>
            </div>
          </ContentContainer>
        </div>
      )}
    </>
  );
};

export default Footer;
