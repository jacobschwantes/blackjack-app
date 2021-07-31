import React, { Component } from "react";
import { auth } from "../services/firebase";
import Settings from "../components/Settings";
import ProfileNav from "../components/ProfileNav";
import Modal from "../components/Modal";
import Chat from "./Chat";
import { db } from "../services/firebase";
import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import {
  AcademicCapIcon,
  BadgeCheckIcon,
  BellIcon,
  CashIcon,
  ClockIcon,
  MenuIcon,
  ReceiptRefundIcon,
  UsersIcon,
  XIcon,
} from '@heroicons/react/outline'
import { getUserInfo, writeUserData } from "../helpers/db";
import Welcome from "../components/Welcome";
const user = {
  name: 'Chelsea Hagon',
  email: 'chelseahagon@example.com',
  role: 'Human Resources Manager',
  imageUrl:
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Home', href: '#', current: true },
  { name: 'Profile', href: '#', current: false },
  { name: 'Resources', href: '#', current: false },
  { name: 'Company Directory', href: '#', current: false },
  { name: 'Openings', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]
const stats = [
  { label: 'Vacation days left', value: 12 },
  { label: 'Sick days left', value: 4 },
  { label: 'Personal days left', value: 2 },
]
const actions = [
  {
    icon: ClockIcon,
    name: 'Request time off',
    href: '#',
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
  },
  {
    icon: BadgeCheckIcon,
    name: 'Benefits',
    href: '#',
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
  },
  {
    icon: UsersIcon,
    name: 'Schedule a one-on-one',
    href: '#',
    iconForeground: 'text-sky-700',
    iconBackground: 'bg-sky-50',
  },
  { icon: CashIcon, name: 'Payroll', href: '#', iconForeground: 'text-yellow-700', iconBackground: 'bg-yellow-50' },
  {
    icon: ReceiptRefundIcon,
    name: 'Submit an expense',
    href: '#',
    iconForeground: 'text-rose-700',
    iconBackground: 'bg-rose-50',
  },
  {
    icon: AcademicCapIcon,
    name: 'Training',
    href: '#',
    iconForeground: 'text-indigo-700',
    iconBackground: 'bg-indigo-50',
  },
]
const recentHires = [
  {
    name: 'Leonard Krasner',
    handle: 'leonardkrasner',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
  },
  {
    name: 'Floyd Miles',
    handle: 'floydmiles',
    imageUrl:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
  },
  {
    name: 'Emily Selman',
    handle: 'emilyselman',
    imageUrl:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
  },
  {
    name: 'Kristin Watson',
    handle: 'kristinwatson',
    imageUrl:
      'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
  },
]
const announcements = [
  {
    id: 1,
    title: 'Office closed on July 2nd',
    href: '#',
    preview:
      'Cum qui rem deleniti. Suscipit in dolor veritatis sequi aut. Vero ut earum quis deleniti. Ut a sunt eum cum ut repudiandae possimus. Nihil ex tempora neque cum consectetur dolores.',
  },
  {
    id: 2,
    title: 'New password policy',
    href: '#',
    preview:
      'Alias inventore ut autem optio voluptas et repellendus. Facere totam quaerat quam quo laudantium cumque eaque excepturi vel. Accusamus maxime ipsam reprehenderit rerum id repellendus rerum. Culpa cum vel natus. Est sit autem mollitia.',
  },
  {
    id: 3,
    title: 'Office closed on July 2nd',
    href: '#',
    preview:
      'Tenetur libero voluptatem rerum occaecati qui est molestiae exercitationem. Voluptate quisquam iure assumenda consequatur ex et recusandae. Alias consectetur voluptatibus. Accusamus a ab dicta et. Consequatur quis dignissimos voluptatem nisi.',
  },
]

export default class Blackjack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      url: '',
      username: auth().displayName,
      open: false,
      modal: true,
      stats: [
        { label: 'Hands played', value: 0 },
        { label: 'Wins', value: 0 },
        { label: 'Blackjacks', value: 0 },
      ],
      data: {},
      readError: null,
    };
    this.update = this.update.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.myRef = React.createRef();
  }
  componentWillMount() {
    this.setState({url: auth().currentUser.photoURL, username: auth().currentUser.displayName})
  }
  async componentDidMount() {
    try {
      db.ref("users/" + this.state.user.uid + "/stats").on("value", snapshot => {
        let data = snapshot.val();
        if (data) {
        this.setState({ stats: [
          { label: 'Hands played', value: data.hands},
          { label: 'Wins', value: data.wins },
          { label: 'Blackjacks', value: data.blackjacks },
        ]});
        this.setState({ loadingStats: false });
      };
    })
    }
    catch (error) {
      this.setState({readError: error})
      this.setState({ stats: [
        { label: 'Hands played', value: 0},
        { label: 'Wins', value: 0 },
        { label: 'Blackjacks', value: 0 },
      ]});
    }
    
  }

  update(status) {
    this.setState({ open: status })
  }
  closeModal() {
    this.setState({modal: false})
  }
  async updateUser(name, url) {
    await writeUserData(auth().currentUser.uid, name, url);
    await auth().currentUser.updateProfile({
      displayName: name,
      photoURL: url
    });
    this.setState({
      url: url,
      username: name
    })
  }
  classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  render() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Settings {...this.state} update={this.update} updateProfile={this.updateUser}/>
          <Popover as="header" className="pb-24 bg-gradient-to-r from-sky-800 to-cyan-600">
            {({ open }) => (
              <>
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                  <div className="relative flex flex-wrap items-center justify-center lg:justify-between">
                    {/* Logo */}
                    <div className="absolute left-0 py-5 flex-shrink-0 lg:static">
                      <a href="/">
                      <h1 className=" tracking-tight font-extrabold sm:text-5xl md:text-6xl lg:text-5xl xl:text-5xl text-white xl:inline">Blackjack</h1>
                      </a>
                    </div>
    
                    {/* Right section on desktop */}
                    <div className="hidden lg:ml-4 lg:flex lg:items-center lg:py-5 lg:pr-0.5">
    
                      {/* Profile dropdown */}
                      <ProfileNav {...this.state} update={this.update} />
                    </div>
    
                    {/* Menu button */}
                    <div className="absolute right-0 flex-shrink-0 lg:hidden">
                      {/* Mobile menu button */}
                      <Popover.Button className="bg-transparent p-2 rounded-md inline-flex items-center justify-center text-cyan-200 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                        )}
                      </Popover.Button>
                    </div>
                  </div>
                </div>
    
                <Transition.Root show={open} as={Fragment}>
                  <div className="lg:hidden">
                    <Transition.Child
                      as={Fragment}
                      enter="duration-150 ease-out"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="duration-150 ease-in"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Popover.Overlay static className="z-20 fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>
    
                    <Transition.Child
                      as={Fragment}
                      enter="duration-150 ease-out"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="duration-150 ease-in"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Popover.Panel
                        focus
                        static
                        className="z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top"
                      >
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
                          <div className="pt-3 pb-2">
                            <div className="flex items-center justify-between px-4">
                              <div>
                                <img
                                  className="h-8 w-auto"
                                  src="https://tailwindui.com/img/logos/workflow-mark-cyan-600.svg"
                                  alt="Workflow"
                                />
                              </div>
                              <div className="-mr-2">
                                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500">
                                  <span className="sr-only">Close menu</span>
                                  <XIcon className="h-6 w-6" aria-hidden="true" />
                                </Popover.Button>
                              </div>
                            </div>
                            <div className="mt-3 px-2 space-y-1">
                              {navigation.map((item) => (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                                >
                                  {item.name}
                                </a>
                              ))}
                            </div>
                          </div>
                          <div className="pt-4 pb-2">
                            <div className="flex items-center px-5">
                              <div className="flex-shrink-0">
                                <img className="h-10 w-10 rounded-full" src={this.state.url} alt="" />
                              </div>
                              <div className="ml-3 min-w-0 flex-1">
                                <div className="text-base font-medium text-gray-800 truncate">{user.name}</div>
                                <div className="text-sm font-medium text-gray-500 truncate">{user.email}</div>
                              </div>
                              <button className="ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                                <span className="sr-only">View notifications</span>
                                <BellIcon className="h-6 w-6" aria-hidden="true" />
                              </button>
                            </div>
                            <div className="mt-3 px-2 space-y-1">
                              {userNavigation.map((item) => (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                                >
                                  {item.name}
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition.Child>
                  </div>
                </Transition.Root>
              </>
            )}
          </Popover>
          <main className="-mt-24 pb-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 h-1/6">
              <h1 className="sr-only">Profile</h1>
              {/* Main 3 column grid */}
              <div className="grid grid-cols-1 gap-2 items-start lg:grid-cols-3 lg:gap-5">
                {/* Left column */}
                <div className="grid grid-cols-1 gap-3 lg:col-span-2">
                  {/* Welcome panel */}
                  <section aria-labelledby="profile-overview-title" >
                    <div className="rounded-lg bg-white overflow-hidden shadow">
                      <h2 className="sr-only" id="profile-overview-title">
                        Profile Overview
                      </h2>
                      <div className="bg-white p-5">
                        <div className="sm:flex sm:items-center sm:justify-between">
                         <Welcome {...this.state}/>
                          <div className="mt-5 flex justify-center sm:mt-0">
                            <a
                              href="#"
                              className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                              View profile
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                        {this.state.stats.map((stat) => (
                          <div key={stat.label} className="px-6 py-4 text-sm font-medium text-center">
                            <span className="text-gray-900">{stat.value}</span>{' '}
                            <span className="text-gray-600">{stat.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
    
                  {/* Actions panel */}
                  <section aria-labelledby="quick-links-title" className="h-screen">
                    <div className=" h-2/3 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px ">
                    </div>
                  </section>
                </div>
    
                {/* Right column */}
                <div className="h-screen">
                  {/* Announcements */}
                  <section aria-labelledby="announcements-title" className="h-5/6">       
                        <Chat/>
                  </section>
    
                </div>
              </div>
            </div>
          </main>
        
          <footer>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
          <div className="border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left">
            <span className="block sm:inline">&copy; 2021 Blackjack Inc.</span>{' '}
            <span className="block sm:inline">All rights reserved.</span>
          </div>
        </div>
      </footer>
        </div>
      )
  }
}
