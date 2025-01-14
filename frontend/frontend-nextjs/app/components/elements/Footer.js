"use client";

import { componentDataLoadingState, loadingState } from "@/app/utils/recoillib/state/state";
import { useRecoilState, useRecoilValue } from "recoil";
import ContentContainer from "../containers/ContentContainer";
import Link from "next/link";

const ExLink = ({text, path}) => {
  return <Link href={path} passHref target="_blank"><div className="underline">{text}</div></Link>
}
const Footer = () => {
  const [getLoadingState, setLoadingState] = useRecoilState(loadingState);
  const getComDataLoadingState = useRecoilValue(componentDataLoadingState)
  return (
    <>
      {getLoadingState.isLoading && getLoadingState.hasAnimated && getComDataLoadingState && (
        <div className="w-full min-h-[200px] bg-black flex text-white text-[14px] font-ibm_mono_semibold">
          <ContentContainer full={false}>
            <div className="w-full flex py-6 gap-8 leading-tight">
              <div className="flex-[4] h-full flex gap-8">
                <div className="flex-[3] flex flex-col gap-8">
                  <div>
                    <div>Info</div>
                    <div className="w-[90%]">The EXPERIMENTAL VIDEO ARCHIVE has been developed by the TALKING OBJECTS LAB, African Digital Heritage (Nairobi), Visual Intelligence (Berlin) and a variety of thinkers and artists experimenting with text, images, audio, and video, to create their own cosmologies of Objects in the digital space.</div>
                  </div>
                  <div>
                      <div>Contact</div>
                      <div>videoarchive@talkingobjectsarchive.org</div>
                  </div>
                </div>
                <div className="flex-[2] flex flex-col gap-4">
                    <div>Learn More (all outgoing links)</div>
                    <div className="flex flex-col">
                      <ExLink path={"https://talkingobjectsarchive.org"} text={"Talking Objects Archive"} />
                      <ExLink path={"https://talkingobjectslab.org"} text={"Talking Objects Lab"} />
                      <ExLink path={"https://talkingobjectsarchive.org/manifesto"} text={"Manifesto"} />
                      <ExLink path={"https://github.com/talking-objects/archive"} text={"Documentation"} />
                      <ExLink path={"https://talkingobjectsarchive.org/info/legal-notice"} text={"Imprint"} />
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
