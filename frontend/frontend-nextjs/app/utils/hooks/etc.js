export function formatTime(seconds) {
    const totalSeconds = Math.round(seconds);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secondsLeft = totalSeconds % 60;

    const paddedHours = hours.toString().padStart(2, "0");
    const paddedMinutes = minutes.toString().padStart(2, "0");
    const paddedSeconds = secondsLeft.toString().padStart(2, "0");

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}



// 🔥create fake data
export const createFakeAnnotations = ({duration, editVersion=false}) => {
    const categoryCounts = Math.floor(Math.random() * (editVersion ? 3 : 30))
    const tagCounts = Math.floor(Math.random() * (editVersion ? 2 : 10))
    const refCounts = Math.floor(Math.random() * (editVersion ? 3 : 10))
    const narrationCounts = Math.floor(Math.random() * (editVersion ? 2 : 10))
    const eventsCounts = Math.floor(Math.random() * (editVersion ? 2 : 10))
    const placeCounts = Math.floor(Math.random() * (editVersion ? 2 : 10))
 
 
    // create Category
    let categoryList = [];
    const CATEGORYSVALUE = [
       {
          slug: "identity",
          value: "Identity",
          color: "#9E21E8"
       },
       {
          slug: "knowledge",
          value: "Knowledge",
          color: "#8BA5F8"
       },
       {
          slug: "artistic_reflections",
          value: "Artistic Reflections",
          color: "#691220"
       },
       {
          slug: "restitution",
          value: "Restitution",
          color: "#EC6735"
       },
       {
          slug: "memory",
          value: "Memory and The Imaginary",
          color: "#F1A73D"
       },
       
    ]
    for(let i = 0; i < categoryCounts; i++){
       const randomIn = Math.floor(Math.random() * duration)
       const outValue = 300
       const randomOut = randomIn + Math.floor(Math.random() * outValue) >= duration ? duration : randomIn + Math.floor(Math.random() * outValue)
       const cate = {
          type: "categoryLayer",
          category: CATEGORYSVALUE[Math.floor(Math.random() * CATEGORYSVALUE.length)],
          in: randomIn,
          out: randomOut
       };
       categoryList.push(cate)
    }
    // create tags
    let tagList = [];
    for(let i = 0; i < tagCounts; i++){
       const randomIn = Math.floor(Math.random() * duration)
       const outValue = 30
       const randomOut = randomIn + outValue > duration ? duration : randomIn + outValue
       const tag = {
          type: "tagLayer",
          in: randomIn,
          out: randomOut,
          value: Array.from({length: Math.floor(Math.random() * 5) + 1}).map((v) => `tag${Math.floor(Math.random() * 10)}`)
       };
       tagList.push(tag)
    }
    // create ref
    let refList = [];
    for(let i = 0; i < refCounts; i++){
       const randomIn = Math.floor(Math.random() * duration)
       const ref = {
          type: "referenceLayer",
          in: randomIn,
      
       };
       refList.push(ref)
    }
    // create narration
    let narrationList = [];
    for(let i = 0; i < narrationCounts; i++){
       const randomIn = Math.floor(Math.random() * duration)
       const narration = {
          type: "narrationLayer",
          in: randomIn,
      
       };
       narrationList.push(narration)
    }
    // create events
    let eventList = [];
    for(let i = 0; i < eventsCounts; i++){
       const randomIn = Math.floor(Math.random() * duration)
       const event = {
          type: "eventLayer",
          in: randomIn,
      
       };
       eventList.push(event)
    }
    // create place
    let placeList = [];
    for(let i = 0; i < placeCounts; i++){
       const randomIn = Math.floor(Math.random() * duration)
       const place = {
          type: "placeLayer",
          in: randomIn,
          position: {
            lat: 52.5200 + Math.floor((Math.random() - 0.5) * 10) ,
            long: 13.4050 + Math.floor((Math.random() - 0.5) * 10) 
          }
      
       };
       placeList.push(place)
    }
 
    const result = {
       categoryList: categoryList,
       tagList: tagList,
       refList: refList,
       narrationList: narrationList,
       eventList: eventList,
       placeList: placeList
    }
    return result
 }