const ContentBox = ({children, title}) => {
    return <div className="w-full min-h-[50svh] h-fit bg-white flex relative">
        <div className="flex-1"></div>
        <div className="flex-1 bg-white flex flex-col">
            <div className="px-4 py-4">
                <div className="text-2xl mb-4">{title}</div>
            {children}
            </div>
        </div>
    </div>
}

export default ContentBox;