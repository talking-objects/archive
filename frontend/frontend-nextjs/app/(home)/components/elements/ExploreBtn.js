import { useRouter } from "next/navigation";

const ExploreBtn = ({path, filter, view, title, subTitle}) => {

    const router = useRouter()


    const onClick = async () => {
       
        router.push(`${path}?&filter=${filter}`);
    }


    return <div className="w-full flex justify-center">
   
        <div onClick={onClick} className="bg-eva-c2 text-white flex flex-col px-4 py-4 text-xl font-ibm_mono_bold rounded-lg cursor-pointer">
            <div>{title}</div>
            <div>{subTitle}</div>
        </div>
  
  </div>
}

export default ExploreBtn;