import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

export default function Settings(props) {
    const [user, setUser] = useState(props.username);
    const [url, setUrl] = useState(props.url);
    function handleSubmit(e) {
        e.preventDefault();
        props.updateProfile(user, url);
        props.update(false);
    };
    function handleChange(e) {
        e.target.id === 'username' ? setUser(e.target.value) : setUrl(e.target.value);
    };
    return (
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog as="div" static className="fixed inset-0 overflow-hidden" open={props.open} onClose={props.update}>
                <div className="absolute inset-0 overflow-hidden">
                    <Dialog.Overlay className="absolute inset-0" />

                    <div className="fixed inset-y-0 pl-16 max-w-full right-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div className="w-screen max-w-md">
                                <form className="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl" onSubmit={handleSubmit} id="settings-form">
                                    <div className="flex-1 h-0 overflow-y-auto">
                                        <div className="py-6 px-4 bg-cyan-600 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <Dialog.Title className="text-lg font-medium text-white">Settings</Dialog.Title>
                                                <div className="ml-3 h-7 flex items-center">
                                                    <button
                                                        type="button"
                                                        className="bg-cyan-600 rounded-md text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                        onClick={() => props.update(false)}
                                                    >
                                                        <span className="sr-only">Close panel</span>
                                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-1">
                                                <p className="text-sm text-white">
                                                    Update your username
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="px-4 divide-y divide-gray-200 sm:px-6">
                                                <div className="space-y-6 pt-6 pb-5">
                                                    <div>
                                                        <label htmlFor="project-name" className="block text-sm font-medium text-gray-900">
                                                            Username
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                onFocus={(e) => e.target.placeholder = ""} 
                                                                onBlur={(e) => e.target.placeholder = user}
                                                                onChange={handleChange}
                                                                placeholder={user}
                                                                type="text"
                                                                name="username"
                                                                id="username"
                                                                className="block w-full shadow-sm sm:text-sm focus:ring-cyan-500 focus:border-cyan-500 border-gray-300 rounded-md"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="project-name" className="block text-sm font-medium text-gray-900">
                                                            Profile picture url
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                onFocus={(e) => e.target.placeholder = ""} 
                                                                onBlur={(e) => e.target.placeholder = url}
                                                                onChange={handleChange}
                                                                type="text"
                                                                placeholder={url}
                                                                name="url"
                                                                id="url"
                                                                className="block w-full shadow-sm sm:text-sm focus:ring-cyan-500 focus:border-cyan-500 border-gray-300 rounded-md"
                                                            />
                                                        </div>
                                                    </div>  
                                                  
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 px-4 py-4 flex justify-end">
                                        <button
                                            type="button"
                                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                                            onClick={() => props.update(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}