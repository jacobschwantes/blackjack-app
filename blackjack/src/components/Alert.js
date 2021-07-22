import { ExclamationIcon } from '@heroicons/react/solid'
export default function Alert(props) {
    return (
      <div className="rounded-md bg-yellow-50 p-4 mb-3">
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-600">{props.message}</h3>
          </div>
        </div>
      </div>
    )
  }