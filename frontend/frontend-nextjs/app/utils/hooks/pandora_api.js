const { default: useSWR } = require("swr")
const { toaFetchData } = require("./toaFetch")

const AMOUNT_OF_PAGINATION = 12
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
export const getAllAnnotations = ({pagination, amount=AMOUNT_OF_PAGINATION}={}) => {
  const bodyData = {
      action: "findAnnotations",
      data: {
        keys: ['id', 'in', 'out', 'value', 'created', 'modified',
        'duration', 'layer', 'item', 'videoRatio', 'languages',
        'entity', 'event', 'place'],
        sort: [{ key: "created", operator: "-" }],
        range: [(pagination - 1) * amount, pagination * amount],
        // query: {
        //   conditions: [{"key": "duration", "value": 10000, "operator": ">" }]
        // }
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
export const getAllClips = ({pagination=1, amount=AMOUNT_OF_PAGINATION}={}) => {
    const bodyData = {
        action: "findClips",
        data: {
          keys: ['id', 'in', 'out', 'position', 'created', 'modified', 'title',
                 'hue', 'saturation', 'lightness', 'volume', 'videoRatio','annotations', 'layers', 'cuts', 'parts', 'duration', 'user'],
          range: [(pagination - 1) * amount, pagination * amount],
          query: {
            conditions: [{"key": "duration", "value": 0, "operator": ">" }]
          },
          // itemsQuery:{"conditions":[],"operator":"&"},
          // range: [0.6]
        //   query: { conditions: [], operator: "&" },
          sort: [{ key: "duration", operator: "+" }],
        },
       
      };
    return globalFetcher(bodyData);
   
}

export const getClip = ({originId}) => {
  const bodyData = {
    action: "findClips",
    data: {
      keys: ['id', 'in', 'out', 'position', 'created', 'modified', 'title',
             'hue', 'saturation', 'lightness', 'volume', 'videoRatio','annotations', 'layers', 'cuts', 'parts', 'duration', 'user'],
      itemsQuery:{"conditions":[],"operator":"&"},
      query: { conditions: [{"key": "id", "value": `${originId}`, "operator": "==" }], operator: "&" },
     
    //   sort: [{ key: "position", operator: "+" }],
    },
   
  }
  return globalFetcher(bodyData);
}


export const getAllClipsOfSelectedVideo = ({itemId, counts=5}) => {
  const bodyData = {
    action: "find",
    data:  {
      "keys":["user","title","clips","duration","editable","id","modified","posterRatio","videoRatio","streams","director","year", "created"],
      "query":{"conditions":[{"key": "id", "value": `${itemId}`, "operator": "==" }],"operator":"&"},
      // "range":[0,10],
      "sort":[{"key":"title","operator":"+"}],
      "clips":{
        "query":{"conditions":[],"operator":"&"},
        "items": counts,
        "keys":[],
        // "sort":[{"key":"in","operator":"-"}]
        }
      }
   
  };
return globalFetcher(bodyData);
}


// 🔴 Video Items
// get all videos list
export const getAllVideos = ({pagination=1, amount=AMOUNT_OF_PAGINATION}={}) => {
    const bodyData = {
        action: "find",
        data: {
          keys: ["id", "user", "duration", "posterFrame","modified", "created", "title"],
          query: { 
            conditions: [],
            operator: "&" 
          },
          sort: [{ key: "duration", operator: "-" }],
          // range: [0, pagination * AMOUNT_OF_PAGINATION]
          range: [(pagination - 1) * amount, pagination * amount]
        },
      };
    return globalFetcher(bodyData);
    
}
export const getRandomVideo = ({randomN}={}) => {
  const bodyData = {
      action: "find",
      data: {
        keys: ["id", "user", "duration", "posterFrame","modified", "created", "title"],
        query: { 
          conditions: [],
          operator: "&" 
        },
        sort: [{ key: "duration", operator: "-" }],
        // range: [0, pagination * AMOUNT_OF_PAGINATION]
        range: [randomN, randomN+1]
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
      keys: ["language", "country","summary","id", "user", "duration", "posterFrame","modified","director", "created", "title"],
      query: {
        conditions: [{"key": "id", "value": `${pId}`, "operator": "==" }]
      }
     },
  };
  return globalFetcher(bodyData);
  
};


