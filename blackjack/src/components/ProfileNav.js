import { auth } from "../services/firebase";
import { Fragment } from 'react'
import { Transition } from '@headlessui/react'
import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
export default function ProfileNav (props){
   function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }
    return (
        <Menu as="div" className=" relative">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="max-w-xs  rounded-full flex items-center text-sm  lg:p-2 lg:rounded-md">
                              <img
                                className="rounded-full border-2 border-white h-10 w-10 object-cover"
                                src={props.url}
                                alt=""
                              />
                              <ChevronDownIcon
                                className="hidden flex-shrink-0 ml-1 h-5 w-5 text-white lg:block"
                                aria-hidden="true"
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => props.update(true)}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'px-4 w-full text-left py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Settings
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => auth().signOut()}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'w-full text-left px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Logout
                                  </button>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
    )
}