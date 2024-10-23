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

// 🟡 User

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
  return globalFetcher(bodyData);
  
}
// the Annotaions of the selected video
export const getAllItemAnnotations = ({itemId}) => {
  const bodyData = {
      action: "findAnnotations",
      data: {
        keys: ['id', 'in', 'out', 'value', 'created', 'modified',
        'duration', 'layer', 'item', 'videoRatio', 'languages',
        'entity', 'event', 'place'],
        sort: [{ key: "created", operator: "-" }],
        query: {
          conditions: [{"key": "item", "value": `${itemId}`, "operator": "==" }]
        }
     
      },
    };
  return globalFetcher(bodyData);
  
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
    return globalFetcher(bodyData);
   
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
          sort: [{ key: "duration", operator: "-" }],
          ...(rangeToggle && {range: range})
        },
      };
    return globalFetcher(bodyData);
    
}
// get all videos list
export const getAllVideosCounts = () => {
    const bodyData = {
        action: "find",
          
       
      };
    return globalFetcher(bodyData);
   
}
// get ein video
export const getVideo = ({pId=""}) => {
  // Get Item
  const bodyData = {
    action: "find",
    data: { 
      keys: ["id", "user", "duration", "posterFrame","modified","director", "created", "title"],
      query: {
        conditions: [{"key": "id", "value": `${pId}`, "operator": "==" }]
      }
     },
  };
  return globalFetcher(bodyData);
  
};


