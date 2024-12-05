import SectionContainer from "./elements/SectionContainer";
import SectionHeader from "./elements/SectionHeader";


const AboutSection = () => {
  return (
      <SectionContainer row={true}>
        <div className="flex-1 bg-neutral-400">
          <SectionHeader text={"About this Archive"} />
        </div>
        <div className="flex-1 p-14">
          <div className="w-full h-full bg-neutral-800"></div>
        </div>
    </SectionContainer>
  );
};

export default AboutSection;
