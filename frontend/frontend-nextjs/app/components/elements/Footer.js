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
              <div className="flex-[4] h-full">Abouts</div>
              <div className="flex-[3] h-full">Text</div>
            </div>
          </ContentContainer>
        </div>
      )}
    </>
  );
};

export default Footer;
