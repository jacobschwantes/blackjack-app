// Profile card used on dashboard page
export default function Welcome(props) {
    return (
        <div className="flex flex-col sm:space-x-5 sm:flex-row   animate-fade-in ">
            <div className="flex-shrink-0">
                <img className="mx-auto h-20 w-20 rounded-full object-cover" src={props.url} alt="" />
            </div>
            <div className="flex flex-col flex-grow">
                <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Welcome back,</p>
                    <p className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-gray-50 ">{props.username}</p>
                </div>
                <div className="flex items-center w-full mt-2 -ml-1">
                    <div className="dark:text-gray-100 text-gray-700 dark:bg-gray-600 bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center text-center z-10 text-sm border-2 font-bold border-cyan-600">{props.lvl}</div>
                    <div className="relative -ml-1 flex-grow ">
                        <div className=" h-1  text-xs flex rounded bg-gray-300 dark:bg-gray-600">
                            <div style={{ width: (((props.xp - ((props.lvl - 1) * 1000)) / 1000) * 100) + '%', transition: 'width 1.5s ease-out' }} className=" rounded shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-cyan-600"></div>
                        </div>
                    </div>
                </div>
                <h1 className="text-gray-400 text-right -mt-3 text-xs mr-1 " >{props.xp - ((props.lvl - 1) * 1000)} / 1000</h1>
            </div>
        </div>
    )
}