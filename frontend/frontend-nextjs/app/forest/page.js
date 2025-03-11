"use client"

import ForestWrapper from "./components/ForestWrapper";
import { Suspense } from "react";
const ForestPage = () => {
    return <Suspense fallback={<div>Loading...</div>}>
        <ForestWrapper />
    </Suspense>
}

export default ForestPage;