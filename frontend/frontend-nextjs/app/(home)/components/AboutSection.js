import { useRouter } from "next/navigation";
import SectionContainer from "./elements/SectionContainer";
import SectionHeader from "./elements/SectionHeader";
import SectionSubHeader from "./elements/SectionSubHeader";
import DefaultBG from "/public/assets/logo-full-menu.svg"

const AboutSection = () => {
  const router = useRouter()
  const textR = {
    title: `About This Archive`,
    stitle: `More about the Thoughts and Concepts of this Archive`,
    text: `“TALKING OBJECTS” is a digital archive for decolonial knowledge production. It is a curated archive and has no claim to completeness. Based on selected objects or collections, the western canon is expanded to include further schools of thought and epistemologies.`
  }
  return (
      <SectionContainer row={true}>
        <div className="flex-1 bg-eva-c2 flex bg-opacity-[15%] flex-col items-center justify-center ">
          <div className="w-4/5 h-fit flex flex-col gap-4">
            <SectionHeader text={textR.title} />
            <SectionSubHeader text={textR.stitle} />
            <p className="font-ibm_mono_regular text-[16px] leading-snug">{textR.text}</p>
            {/* <div className="flex justify-center">
              <div onClick={() => router.push("/about")} className="cursor-pointer bg-white px-4 py-2 rounded-xl font-ibm_mono_bolditalic text-[16px] leading-tight">Read More</div>
            </div> */}
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center flex-col">
          <div className="w-4/5 h-5/6">
            <div className="w-full h-full bg-eva-c2 bg-opacity-[15%] rounded-3xl p-2">
              <div 
              style={{backgroundImage: `url(/assets/img01.webp)`}}
              className="w-full h-full bg-white rounded-2xl flex justify-center items-center px-4 py-2 bg-center bg-cover bg-no-repeat">
                {/* <DefaultBG /> */}
              </div>
            </div>
            <div className="w-full flex justify-center">
              <div className="bg-eva-c2 opacity bg-opacity-[15%] font-ibm_mono_regular text-[10px] px-1">Workshop for first Annotation Tests in Frankfurt 2024 with the Talking Objects Archive Team</div>
            </div>
          </div>
        </div>
    </SectionContainer>
  );
};

export default AboutSection;
