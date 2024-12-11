const SectionContainer = ({children, row=false, big=false}) => {
    return <div className={`w-full mt-12 mb-12 first:mt-12 last:mb-0 flex ${!row ? "flex-col" : "flex-col lg:flex-row"} ${big && "h-fit"} ${!big && "h-[100svh] max-h-[100svh]"} items-stretch overflow-hidden `}>
        {children}
    </div>
}

export default SectionContainer;