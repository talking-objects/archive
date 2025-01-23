const DetailPage = (props) => {

    
    const slug = props.params.slug
    switch (slug) {
        case "place":
            return <div></div>
        case "event":
            return <div></div>
        case "reference":
            return <div></div>
        default: 
            redirect("/forest")
    }
}

export default DetailPage;