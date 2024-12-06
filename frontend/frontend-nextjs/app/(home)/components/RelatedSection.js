import SectionContainer from "./elements/SectionContainer";
import SectionHeader from "./elements/SectionHeader";
import SectionSubHeader from "./elements/SectionSubHeader";

const RelationBox = () => {
    return (
    <div className="flex-1">
      <div className="w-full aspect-video bg-white rounded-2xl border border-black"></div>
      <div className="w-full h-fit font-ibm_mono_regular px-4 py-4 pt-8 text-[10px] lg:text-[16px]">
        <p>A digital archive for decolonial knowledge production. It is a curated archive and has no claim to completeness. Based on selected objects or collections, the Western canon is expanded to include further schools of thought and epistemologies.</p>
      </div>
    </div>
  )
}

const RelatedSection = () => {
  return (
    <SectionContainer big={true}>
      <div className="flex flex-col w-full min-h-[100svh] h-full bg-eva-c2 bg-opacity-[15%] gap-4 justify-center items-center px-4 py-4">
        <SectionHeader text={"Related Resources"} />
        <div className="flex justify-center">
          <SectionSubHeader />
        </div>
        <div className="w-full h-fit gap-4 lg:items-center grid grid-cols-1 md:grid-cols-3" >
          <RelationBox />
          <RelationBox />
          <RelationBox />
          
        </div>
      </div>
    </SectionContainer>
  );
};

export default RelatedSection;
