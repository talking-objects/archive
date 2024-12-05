import SectionContainer from "./elements/SectionContainer";
import SectionHeader from "./elements/SectionHeader";

const RelatedSection = () => {
  return (
    <SectionContainer big={false}>
      <SectionHeader text={"Related Resources"} />
      <div className="flex w-full h-full gap-4 justify-between bg-blue-100 items-center">
        <div className="flex-1">
          <div className="w-full aspect-video bg-neutral-500"></div>
          <div className="w-full aspect-video bg-neutral-100"></div>
        </div>
        <div className="flex-1">
          <div className="w-full aspect-video bg-neutral-500"></div>
          <div className="w-full aspect-video bg-neutral-100"></div>
        </div>
        <div className="flex-1">
          <div className="w-full aspect-video bg-neutral-500"></div>
          <div className="w-full aspect-video bg-neutral-100"></div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default RelatedSection;
