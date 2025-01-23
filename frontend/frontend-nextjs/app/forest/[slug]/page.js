import { redirect } from "next/navigation";
import ForestEventWrapper from "./components/ForestEventWrapper";
import ForestPlaceWrapper from "./components/ForestPlaceWrapper";
import ForestRefWrapper from "./components/ForestRefWrapper";

const ForestChildrenPage = (props) => {
    const slug = props.params.slug
    switch (slug) {
        case "place":
            return <ForestPlaceWrapper />
        case "event":
            return <ForestEventWrapper />
        case "reference":
            return <ForestRefWrapper />
        default: 
            redirect("/forest")
    }
   


   
}


export default ForestChildrenPage;