const { default: useSWR } = require("swr")
const { toaFetchData } = require("./toaFetch")


const globalFetcher = (bodyData) => {
    const {data, isLoading, error} = useSWR({bodyData:bodyData}, toaFetchData)
    return {
        data: data,
        isLoading: isLoading,
        error: error
    }
}

// get all clips
export const getAllClips = () => {
    const bodyData = {
        action: "findClips",
        data: {
          keys: ["position", "annotations", "id", "in", "out", "value"],
        //   query: { conditions: [], operator: "&" },
        //   sort: [{ key: "position", operator: "+" }],
        },
      };
    const result = globalFetcher(bodyData);
    return result;
}
// get all videos list
export const getAllVideos = ({rangeToggle=false, range=[0, 6]}) => {
    const bodyData = {
        action: "find",
        data: {
          keys: ["id", "user", "duration", "posterFrame","modified", "created", "title"],
          query: { 
            conditions: [],
            operator: "&" 
        },
        sort: [{ key: "created", operator: "-" }],
        ...(rangeToggle && {range: range})
        },
      };
    const result = globalFetcher(bodyData);
    return result;
}
// get all videos list
export const getAllVideosCounts = () => {
    const bodyData = {
        action: "find",
        
       
      };
    const result = globalFetcher(bodyData);
    return result;
}

