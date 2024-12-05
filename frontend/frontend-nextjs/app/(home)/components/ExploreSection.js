import SectionContainer from "./elements/SectionContainer";
import SectionHeader from "./elements/SectionHeader";

const ExploreSection = () => {
  return (
    <SectionContainer big={true}>
        <SectionHeader text={"Explore our Archive"} />
        <div className="w-full flex flex-col gap-4">
            <div>Index</div>
            <div className="w-full grid grid-cols-4 gap-4">
                <div className="w-full aspect-video bg-emerald-400"></div>
                <div className="w-full aspect-video bg-emerald-400"></div>
                <div className="w-full aspect-video bg-emerald-400"></div>
                <div className="w-full aspect-video bg-emerald-400"></div>
                <div className="w-full aspect-video bg-emerald-400"></div>
                <div className="w-full aspect-video bg-emerald-400"></div>
                <div className="w-full aspect-video bg-emerald-400"></div>
                <div className="w-full aspect-video bg-emerald-400"></div>
            </div>
            <div className="w-full flex justify-center items-center">
                <div className="px-4 py-2 bg-eva-c2 text-white rounded-xl flex flex-col cursor-pointer">
                    <span>Explore</span>
                    <span>all items</span>
                </div>
            </div>
        </div>
        <div className="w-full flex flex-col gap-4">
            <div>Relation</div>
            <div className="w-full flex items-start gap-4">
                <div className="w-full aspect-video bg-emerald-400"></div>
                <div className="w-full aspect-video bg-emerald-400"></div>
            </div>
            <div className="w-full flex justify-center items-center">
                <div className="px-4 py-2 bg-eva-c2 text-white rounded-xl flex flex-col cursor-pointer">
                    <span>Explore</span>
                    <span>all items</span>
                </div>
            </div>
        </div>
        <div className="w-full flex flex-col gap-4">
            <div>Time and Space</div>
            <div className="w-full flex">
                <div className="w-full bg-eva-c6 h-[50px]"></div>
              
            </div>
            <div className="w-full flex justify-center items-center">
                <div className="px-4 py-2 bg-eva-c2 text-white rounded-xl flex flex-col cursor-pointer">
                    <span>Explore</span>
                    <span>all items</span>
                </div>
            </div>
        </div>
        <div className="w-full flex flex-col gap-4">
            <div className="w-full flex gap-4 items-center">
                <div className="w-full flex aspect-video bg-eva-c4"></div>
                <div className="w-full flex aspect-video bg-eva-c4"></div>
            </div>
            <div className="w-full flex justify-center items-center">
                <div className="px-4 py-2 bg-eva-c2 text-white rounded-xl flex flex-col cursor-pointer">
                    <span>Explore</span>
                    <span>all items</span>
                </div>
            </div>
        </div>
    </SectionContainer>
  );
};

export default ExploreSection;
