// Settings page used in main container on dashboard page
import { useState, useRef } from 'react';
import { Switch } from '@headlessui/react';
export default function Settings(props) {
  const [user, setUser] = useState(props.username);
  const [url, setUrl] = useState(props.url);
  const [file, setFile] = useState(null);
  const [dark, setDark] = useState(props.dark);
  const [chat, setChat] = useState(props.chat_enabled);
  const inputFile = useRef(null)
  function handleSubmit(e) {
    e.preventDefault();
    props.updateProfile(user, file, dark, chat);
    props.close();
  };
  function handleChange(e) {
    e.target.id === 'username' ? setUser(e.target.value) : setUrl(e.target.value);
  };
  const onButtonClick = () => {
    inputFile.current.click();
  };
  const onImageChange = e => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setUrl(URL.createObjectURL(img))
      setFile(e.target.files[0]);
    }
  };
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  };
  return (
    <form className="p-2 relative h-full w-full" onSubmit={handleSubmit}>
      <div className="mb-8 animate-fade-in ">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-50">Settings</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              This information will be displayed publicly so be careful what you share.
            </p>
          </div>
          <div className="mt-4  sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-50">
                Username
              </label>
              <div className="my-3 flex rounded-md shadow-sm">
                <input
                  onFocus={(e) => e.target.placeholder = ""}
                  onBlur={(e) => e.target.placeholder = user}
                  onChange={handleChange}
                  placeholder={user}
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="username"
                  className="flex-1 focus:ring-cyan-500 focus:border-cyan-500 block w-full min-w-0 rounded sm:text-sm border-gray-300 dark:border-gray-500 dark:placeholder-gray-300  dark:bg-gray-700 dark:text-gray-50"
                />
              </div>
            </div>
            <div className="col-span-3 mb-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-50">Profile Picture</label>
              <div className="mt-1 flex items-center">
                <span className="inline-bloc ">
                  <img className="object-cover rounded-full overflow-hidden h-12 w-12" alt="profile" src={url}></img>
                </span>
                <button
                  type="button"
                  onClick={onButtonClick}
                  className="ml-5 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm py-2 px-3 text-sm leading-4 font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  Change
                </button>
                <input
                  onChange={onImageChange}
                  ref={inputFile}
                  id="file"
                  type="file"
                  className="hidden"
                />
              </div>
            </div>
            <Switch.Group as="div" className="flex items-center justify-between my-2">
              <span className="flex-grow flex flex-col">
                <Switch.Label as="span" className="block text-sm font-medium text-gray-700 dark:text-gray-50" passive>
                  Dark mode
                </Switch.Label>
                <Switch.Description as="span" className="text-sm text-gray-500 dark:text-gray-400">
                  Enabled changes the theme of the site to darker colors.
                </Switch.Description>
              </span>
              <Switch
                checked={dark}
                onChange={setDark}
                className={classNames(
                  dark ? 'bg-cyan-600' : 'bg-gray-200 dark:bg-gray-700',
                  'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2  focus:ring-cyan-500'
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    dark ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-5 w-5 rounded-full bg-white dark:bg-gray-800 shadow transform ring-0 transition ease-in-out duration-200'
                  )}
                />
              </Switch>
            </Switch.Group>
            <Switch.Group as="div" className="flex items-center justify-between my-2">
              <span className="flex-grow flex flex-col">
                <Switch.Label as="span" className="block text-sm font-medium text-gray-700 dark:text-gray-50" passive>
                  Enable chat
                </Switch.Label>
                <Switch.Description as="span" className="text-sm text-gray-500 dark:text-gray-400">
                  Toggles chat visiblity.
                </Switch.Description>
              </span>
              <Switch
                checked={chat}
                onChange={setChat}
                className={classNames(
                  chat ? 'bg-cyan-600' : 'bg-gray-200 dark:bg-gray-700',
                  'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2  focus:ring-cyan-500'
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    chat ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-5 w-5 rounded-full bg-white dark:bg-gray-800 shadow transform ring-0 transition ease-in-out duration-200'
                  )}
                />
              </Switch>
            </Switch.Group>
            <div className="mb-1">
              <button
                type="button"
                onClick={() => props.clear()}
                className=" bg-red-600 mt-1 py-2 px-3  rounded-md  text-sm font-medium leading-4 text-gray-50  focus:outline-none hover:bg-red-900"
              >
                Clear session
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={() => props.reset()}
                className=" bg-red-600 mt-1 py-2 px-3  rounded-md  text-sm font-medium leading-4 text-gray-50  focus:outline-none hover:bg-red-900"
              >
                Delete account
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className=" float-right ">
        <div className="flex  ">
          <button
            type="button"
            onClick={() => props.close()}
            className="bg-white dark:bg-gray-600  py-2 px-3 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm text-sm font-medium leading-4 dark:text-gray-50  focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-2  focus:ring-cyan-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-2 inline-flex justify-center py-2 px-4 border border-gray-400  shadow-sm text-sm font-medium rounded-md leading-4 text-white dark:text-gray-50 bg-cyan-600 hover:bg-cyan-700  focus:outline-none focus:ring-2  focus:ring-cyan-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  )
}
