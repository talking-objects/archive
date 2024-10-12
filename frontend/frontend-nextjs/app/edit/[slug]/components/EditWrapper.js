"use client"

import { useParams } from "next/navigation";
import { useEffect } from "react";


const EditWrapper = () => {
    const params = useParams();

 
    return (
        <div className="w-screen h-[100svh] flex justify-center items-center">
            Edit id:{params.slug}
        </div>
    )
}


export default EditWrapper;