export default function Welcome(props) {
    return (
        <div className="sm:flex sm:space-x-5">
            <div className="flex-shrink-0">
                <img className="mx-auto h-20 w-20 rounded-full object-cover" src={props.url} alt="" />
            </div>
            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Welcome back,</p>
                <p className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-gray-50">{props.username}</p>
            </div>
        </div>
    )
}