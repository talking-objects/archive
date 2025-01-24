import { redirect } from "next/navigation";
import ForestEventWrapper from "./components/ForestEventWrapper";
import ForestPlaceWrapper from "./components/ForestPlaceWrapper";
import ForestRefWrapper from "./components/ForestRefWrapper";

const ForestChildrenPage = (props) => {
    const slug = props.params.slug
    // 여기서 데이터를 정리해서 아래 컴포넌트로 전달하는게 낳을듯 여기서 slug으로 페이지 구분후 맞는 데이터 가져오기 
    



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