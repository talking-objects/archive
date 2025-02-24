import Link from "next/link";

const ExploreBtn = ({path}) => {
    return <div className="w-full flex justify-center">
    <Link href={path}>
        <div className="bg-eva-c2 text-white flex flex-col px-4 py-4 text-xl font-ibm_mono_bold rounded-lg">
            <div>Explore</div>
            <div>All Items</div>
        </div>
    </Link>
  </div>
}

export default ExploreBtn;