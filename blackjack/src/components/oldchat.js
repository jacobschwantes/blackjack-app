return (
        
    <div className="h-screen bg-white scrollbar-hide">
      <Modal {...this.state} update={this.closeModal}/>
      <Settings {...this.state} update={this.update} updateProfile={this.updateUser} />
      <Popover className="relative bg-white shadow">
        {({ open }) => (
          <>
            <div className=" max-w-6xl mx-auto sm:px-6">
              <div className="flex jutify-between items-center py-2 md:justify-start md:space-x-10">
                <div className="flex justify-start lg:w-0 lg:flex-1">
                  <a href="/">
                    <span className="sr-only">Chatty</span>
                    <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl text-indigo-700 xl:inline">Chatty</h1>
                  </a>
                </div>
                <div className="-mr-2 -my-2 md:hidden">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
                <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">

                  <ProfileNav {...this.state} update={this.update} />
                </div>

              </div>
            </div>

            <Transition
              show={open}
              as={Fragment}
              enter="duration-200 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                static
                className="absolute top-0 inset-x-0 z-10 p-2 transition transform origin-top-right md:hidden"
              >
                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                  <div className="pt-4 pb-4 px-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <a href="/"><h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl text-indigo-600 xl:inline">Chatty</h1></a>
                      </div>
                      <div className="-mr-2">

                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                          <span className="sr-only">Close menu</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div>
                      
                      <button
                        onClick={() => this.update(true)}
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium mt-3 text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Settings
                      </button>
                      <button
                        onClick={() => auth().signOut()}
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium mt-3 text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Log out
                      </button>

                    </div>

                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>

      <Chat/>
     
      <Footer />
    </div>

  );