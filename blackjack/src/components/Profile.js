export default function Profile(props) {
    return (
        <div className="h-full w-full p-6">
            <div className="flex items-center animate-fade-in">
                <img className="rounded-full h-28" src={props.url}></img>
                <div className="flex flex-col ml-4 flex-grow">
                    <h1 className="text-gray-100 text-4xl font-bold mb-2 ">{props.username}</h1>
                    <div className="flex items-center ">
                    <div className="text-gray-100 bg-gray-600 rounded-full w-11 h-11 flex items-center justify-center text-center z-10">{props.lvl}</div>
                    <div className="relative -ml-1 flex-grow ">
                        <div className=" h-2  text-xs flex rounded bg-gray-600">
                            <div style={{ width: (((props.xp - ((props.lvl - 1) * 1000)) / 1000) * 100) + '%'  }} className=" rounded shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-cyan-500"></div>
                        </div>
                    </div>
                    </div>
                    <h1 className="text-gray-300 text-right -mt-4" >{props.xp - ((props.lvl - 1) * 1000)} / 1000</h1>

                </div>


            </div>
            <div className=" float-right mt-3">
        <div className="flex  ">

          <button
            type="button"
            onClick={() => props.update('profile', false)}
            className="bg-white dark:bg-gray-600  py-2 px-3 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm text-sm font-medium leading-4 dark:text-gray-50  focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-2  focus:ring-cyan-500"
          >
            Close
          </button>
          <button
            type="submit"
            className="ml-2 inline-flex justify-center py-2 px-4 border border-gray-400  shadow-sm text-sm font-medium rounded-md leading-4 text-white dark:text-gray-50 bg-cyan-600 hover:bg-cyan-700  focus:outline-none focus:ring-2  focus:ring-cyan-500"
          >
            Save
          </button>
        </div>
      </div>
        </div>
    )
}