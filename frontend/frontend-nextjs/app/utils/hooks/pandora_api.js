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

// 🔵 Annotations 
export const getAllAnnotations = ({rangeToggle=false, range=[0, 6]}) => {
  const bodyData = {
      action: "findAnnotations",
      data: {
        keys: ['id', 'in', 'out', 'value', 'created', 'modified',
        'duration', 'layer', 'item', 'videoRatio', 'languages',
        'entity', 'event', 'place'],
        sort: [{ key: "created", operator: "-" }],
        ...(rangeToggle && {range: range})
      //   query: { conditions: [], operator: "&" },
     
      },
    };
  const result = globalFetcher(bodyData);
  return result;
}
// export const getAllAnnotationsCounts = () => {
//   const bodyData = {
//       action: "findAnnotations",
//       data: {
//         keys: ["id"],
//         range: [0, 400]
//       }
//     };
//   const result = globalFetcher(bodyData);
//   return result;
// }
// 🟢 Clips 
// get all clips
export const getAllClips = () => {
    const bodyData = {
        action: "findClips",
        data: {
          keys: ['id', 'in', 'out', 'position', 'created', 'modified', 'title',
                 'hue', 'saturation', 'lightness', 'volume', 'videoRatio','annotations', 'layers', 'cuts', 'parts', 'durations', 'user'],
          itemsQuery:{"conditions":[],"operator":"&"}
        //   query: { conditions: [], operator: "&" },
        //   sort: [{ key: "position", operator: "+" }],
        },
       
      };
    const result = globalFetcher(bodyData);
    return result;
}


// 🔴 Video Items
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
// get ein video
export const getVideo = ({pId=""}) => {
  // Get Item
  const bodyData = {
    action: "find",
    data: { 
      keys: ["id", "user", "duration", "posterFrame","modified", "created", "title"],
      query: {
        conditions: [{"key": "id", "value": `${pId}`, "operator": "==" }]
      }
     },
  };
  const result = globalFetcher(bodyData);
  return result;
};


