import SectionHeader from "./elements/SectionHeader";


const CurrentStage = () => {
  return (
    <div className="w-full flex flex-col gap-4 section-padding ">
        <SectionHeader text={"Currently on Stage"} />
        <div className="w-full flex justify-between items-center gap-8">
          <div>Left</div>
          <div className="flex-1 flex gap-4">
              <div className="bg-emerald-500 w-full aspect-video"></div>
              <div className="bg-emerald-500 w-full aspect-video"></div>
              <div className="bg-emerald-500 w-full aspect-video"></div>

          </div>
          <div>Right</div>
        </div>

    </div>
  );
};

export default CurrentStage;
