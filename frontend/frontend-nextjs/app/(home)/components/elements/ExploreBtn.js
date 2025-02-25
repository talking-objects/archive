import Link from "next/link";
import { useRecoilState } from "recoil";
import { filterQueryState, filterViewState, searchTriggerState, tempFilterQueryState, tempFilterViewState, toggleSearchState } from "@/app/utils/recoillib/state/state";
import { useRouter } from "next/navigation";

const ExploreBtn = ({path, filter, view}) => {
    const [filterView, setFilterView] = useRecoilState(filterViewState)
    const [tempFilterView, setTempFilterView] = useRecoilState(tempFilterViewState)
    const [filterQuery, setFilterQuery] = useRecoilState(filterQueryState)
    const [tempFilterQuery, setTempFilterQuery] = useRecoilState(tempFilterQueryState)
    const router = useRouter()
    const [toggleSearch, setToggleSearch] = useRecoilState(toggleSearchState)
    const [searchTrigger, setSearchTrigger] = useRecoilState(searchTriggerState)
    const handleFilter = ({filter, view}) => {
        return new Promise((resolve) => {
            setTempFilterQuery(prev => {
                const newState = filter === "all" 
                    ? {
                        video_filter: true,
                        clip_filter: Object.keys(prev.clip_filter).reduce((acc, key) => {
                            acc[key] = true;
                            return acc;
                        }, {})
                    }
                    : {
                        video_filter: false,
                        clip_filter: Object.keys(prev.clip_filter).reduce((acc, key) => {
                            acc[key] = filter === key;
                            return acc;
                        }, {})
                    };
                resolve(newState);
                return newState;
            });
        });
    }

    const onClick = async () => {
        setTempFilterView(view);
        setFilterView(view);
        
        if(filter === "all") {
            setToggleSearch(false);
            setSearchTrigger(false);
        } else {
            const newFilterState = await handleFilter({filter, view});
            setToggleSearch(true);
            setSearchTrigger(true);
            setFilterQuery(newFilterState);
        }
        
        router.push(path);
    }


    return <div className="w-full flex justify-center">
   
        <div onClick={onClick} className="bg-eva-c2 text-white flex flex-col px-4 py-4 text-xl font-ibm_mono_bold rounded-lg cursor-pointer">
            <div>Explore</div>
            <div>All Items</div>
        </div>
  
  </div>
}

export default ExploreBtn;