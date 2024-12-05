import SectionContainer from "./elements/SectionContainer";
import SectionHeader from "./elements/SectionHeader";


const AboutSection = () => {
  return (
      <SectionContainer row={true}>
        <div className="flex-1 bg-neutral-400 flex flex-col items-center justify-center gap-4">
          <SectionHeader text={"About this Archive"} />
          <p className="w-2/3">A digital archive for decolonial knowledge production. It is a curated archive and has no claim to completeness. Based on selected objects or collections, the Western canon is expanded to include further schools of thought and epistemologies.</p>
          <div className="bg-white px-4 py-2 rounded-xl font-bold">Read More</div>
        </div>
        <div className="flex-1 p-14">
          <div className="w-full h-full bg-neutral-800"></div>
        </div>
    </SectionContainer>
  );
};

export default AboutSection;
