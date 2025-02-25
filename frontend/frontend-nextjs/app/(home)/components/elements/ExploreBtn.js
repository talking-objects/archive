import Link from "next/link";
import { useRecoilState } from "recoil";
import { filterQueryState, filterViewState, forestDataState, forestPageState, forestQueryState, searchTriggerState, searchTimestampState, tempFilterQueryState, tempFilterViewState, toggleSearchState } from "@/app/utils/recoillib/state/state";
import { useRouter } from "next/navigation";

const ExploreBtn = ({path, filter, view, title, subTitle}) => {
    const [filterView, setFilterView] = useRecoilState(filterViewState)
    const [tempFilterView, setTempFilterView] = useRecoilState(tempFilterViewState)
    const [filterQuery, setFilterQuery] = useRecoilState(filterQueryState)
    const [tempFilterQuery, setTempFilterQuery] = useRecoilState(tempFilterQueryState)
    const [toggleSearch, setToggleSearch] = useRecoilState(toggleSearchState)
    const [searchTrigger, setSearchTrigger] = useRecoilState(searchTriggerState)
    const [searchTimestamp, setSearchTimestamp] = useRecoilState(searchTimestampState)
    const [forestData, setForestData] = useRecoilState(forestDataState)
    const [page, setPage] = useRecoilState(forestPageState)
    const [forestQuery, setForestQuery] = useRecoilState(forestQueryState)
    const router = useRouter()
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
        setForestData([])
        setTempFilterView(view);
        setFilterView(view);
        setSearchTimestamp(Date.now())
      
        if(filter === "all") {
            const allFilterState = {
                video_filter: true,
                clip_filter: {
                    reference_data: true,
                    category_data: true,
                    event_data: true,
                    place_data: true,
                    narration_data: true,
                    data_data: true,
                    tag_data: true
                }
            };
            setFilterQuery(allFilterState);
            setTempFilterQuery(allFilterState);
            setToggleSearch(false);
            setSearchTrigger(false);
            setSearchTimestamp(Date.now());
        } else {
            const newFilterState = await handleFilter({filter, view});
            setToggleSearch(true);
            setSearchTrigger(true);
            setFilterQuery(newFilterState);
            setSearchTimestamp(Date.now());
        }
        setForestQuery("")
        setPage(1)
        router.push(path);
    }


    return <div className="w-full flex justify-center">
   
        <div onClick={onClick} className="bg-eva-c2 text-white flex flex-col px-4 py-4 text-xl font-ibm_mono_bold rounded-lg cursor-pointer">
            <div>{title}</div>
            <div>{subTitle}</div>
        </div>
  
  </div>
}

export default ExploreBtn;