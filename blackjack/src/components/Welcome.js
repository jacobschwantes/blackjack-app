export default function Welcome(props) {
    return (
        <div className="flex  sm:space-x-5 mr-6 animate-fade-in">
            <div className="flex-shrink-0">
                <img className="mx-auto h-20 w-20 rounded-full object-cover" src={props.url} alt="" />
            </div>
            <div className="flex flex-col flex-grow">
                <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Welcome back,</p>
                    <p className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-gray-50">{props.username}</p>
                </div>
                <div className="flex items-center w-full mt-2 -ml-2">
                    <div className="text-gray-100 bg-gray-600 rounded-full w-10 h-10 flex items-center justify-center text-center z-10">{props.lvl}</div>
                    <div className="relative -ml-1 flex-grow ">
                        <div className=" h-2  text-xs flex rounded bg-gray-600">
                            <div style={{ width: (((props.xp - ((props.lvl - 1) * 1000)) / 1000) * 100) + '%' }} className=" rounded shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-cyan-500"></div>
                        </div>
                    </div>

                </div>
                 <h1 className="text-gray-300 text-right -mt-4 text-sm" >{props.xp - ((props.lvl - 1) * 1000)} / 1000</h1>
            </div>

        </div>
    )
}