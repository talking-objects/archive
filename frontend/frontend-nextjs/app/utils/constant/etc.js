export const BASE_URL = "https://talkingobjects.0x2620.org";

export const COLORS = {
    c0: "#FFFFFF",
    c1: "#9E21E8",
    c2: "#8BA5F8",
    c3: "#691220",
    c4: "#EC6735",
    c5: "#F1A73D",
    c6: "#3118E8"
}

export const CATEGORYSVALUE = [
    {
       slug: "identity",
       value: "Identity",
       color: "#9E21E8",
       tBG: "bg-eva-c1",
       tBGHover: "hover:bg-eva-c1"

    },
    {
       slug: "knowledge",
       value: "Knowledge",
       color: "#8BA5F8",
       tBG: "bg-eva-c2",
       tBGHover: "hover:bg-eva-c2"

    },
    {
       slug: "artistic_reflection",
       value: "Artistic Reflections",
       color: "#691220",
       tBG: "bg-eva-c3",
       tBGHover: "hover:bg-eva-c3"

    },
    {
       slug: "restitution",
       value: "Restitution",
       color: "#EC6735",
       tBG: "bg-eva-c4",
       tBGHover: "hover:bg-eva-c4"

    },
    {
       slug: "memory",
       value: "Memory and The Imaginary",
       color: "#F1A73D",
       tBG: "bg-eva-c5",
       tBGHover: "hover:bg-eva-c5"

    },
    
 ]

export const CATEGORY_AND_TAGVALUE= [
    ...CATEGORYSVALUE,
    {
        slug: "tag",
        value: "Tag",
        color: "#3118E8",
        tBG: "bg-eva-c6",
        tBGHover: "hover:bg-eva-c6"
     },
]