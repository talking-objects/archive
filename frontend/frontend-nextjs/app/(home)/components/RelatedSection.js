import Image from "next/image";
import SectionContainer from "./elements/SectionContainer";
import SectionHeader from "./elements/SectionHeader";
import SectionSubHeader from "./elements/SectionSubHeader";

const RelationBox = ({path, svgPath, text}) => {


   const onClick = () => {
    const aTag = document.createElement("a")
    aTag.href = path
    aTag.target = "_blank"
    document.body.appendChild(aTag)
    aTag.click()
    document.body.removeChild(aTag)
   }
    return (
    <div className="flex-1">
      <div onClick={onClick} className="w-full aspect-video bg-white rounded-2xl border border-black cursor-pointer">
        <div className="w-full h-full flex justify-center items-center px-4 py-2 relative">
          <Image 
            src={ svgPath }
            alt=""
            width={1920}
            height={1080}
            layout="responsive"
            objectFit="contain"
          />
        </div>
      </div>
      <div className="w-full h-fit font-ibm_mono_regular px-4 py-4 pt-8 text-[10px] lg:text-[16px]">
        <p>{text}</p>
      </div>
    </div>
  )
}

const RelatedSection = () => {

  const textObj = {
    title: `Related Resources`,
    sTitle: `Learn more about the Project`,
    faces: `The TALKING OBJECTS ARCHIVE is the product of collaboration between a large number of participants - living and practising in the global south and global north. Among them are curators, artists and researchers`,
    code: `The Talking Objects Archive and its Software was developed over a two year course between 2023 and 2024. The software is based on the GNU GENERAL PUBLIC LICENSE (Version 3, 29 June 2007) and can be found here`,
    toa: `The TALKING OBJECTS ARCHIVE is a digital archive for decolonial knowledge production, where Objects are the starting point for polyperspectival narratives that illuminate different aspects of history`
   }
  return (
    <SectionContainer big={true}>
      <div className="flex flex-col w-full min-h-[100svh] h-full bg-eva-c2 bg-opacity-[15%] gap-4 justify-center items-center px-4 py-4">
        <SectionHeader text={textObj.title} />
        <div className="flex justify-center">
          <SectionSubHeader text={textObj.sTitle} />
        </div>
        <div className="w-full h-fit gap-4 items-start grid grid-cols-1 md:grid-cols-3" >
          <RelationBox path={"https://talkingobjectsarchive.org"} svgPath={"/assets/toa.svg"} text={textObj.toa} />
          <RelationBox path={"https://talkingobjectsarchive.org/team"} svgPath={"/assets/faces.svg"} text={textObj.faces} />
          <RelationBox path={"https://github.com/talking-objects"} svgPath={"/assets/code.svg"} text={textObj.code} />
        </div>
      </div>
    </SectionContainer>
  );
};

export default RelatedSection;
