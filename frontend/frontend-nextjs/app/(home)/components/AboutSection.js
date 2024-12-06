import { useRouter } from "next/navigation";
import SectionContainer from "./elements/SectionContainer";
import SectionHeader from "./elements/SectionHeader";
import SectionSubHeader from "./elements/SectionSubHeader";


const AboutSection = () => {
  const router = useRouter()
  return (
      <SectionContainer row={true}>
        <div className="flex-1 bg-eva-c2 flex bg-opacity-[15%] flex-col items-center justify-center ">
          <div className="w-4/5 h-fit flex flex-col gap-4">
            <SectionHeader text={"About this Archive"} />
            <SectionSubHeader />
            <p className="font-ibm_mono_regular text-[16px] leading-snug">A digital archive for decolonial knowledge production. It is a curated archive and has no claim to completeness. Based on selected objects or collections, the Western canon is expanded to include further schools of thought and epistemologies.</p>
            <div className="flex justify-center">
              <div onClick={() => router.push("/about")} className="cursor-pointer bg-white px-4 py-2 rounded-xl font-ibm_mono_bolditalic text-[16px] leading-tight">Read More</div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center flex-col">
          <div className="w-4/5 h-5/6">
            <div className="w-full h-full bg-eva-c2 bg-opacity-[15%] rounded-3xl p-2">
              <div className="w-full h-full bg-eva-c2 rounded-2xl flex justify-center items-center">
                IMG
              </div>
            </div>
            <div className="w-full flex justify-center">
              <div className="bg-eva-c2 opacity bg-opacity-[15%] font-ibm_mono_regular text-[10px] px-1">This is the image caption of the preview image </div>
            </div>
          </div>
        </div>
    </SectionContainer>
  );
};

export default AboutSection;
