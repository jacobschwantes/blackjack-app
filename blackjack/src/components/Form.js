import { useState } from 'react';
export default function Form(props) {
  const [user, setUser] = useState(props.username);
  const [url, setUrl] = useState(props.url);
    function handleSubmit(e) {
        e.preventDefault();
        props.updateProfile(user, url);
        props.close();
    };
    function handleChange(e) {
        e.target.id === 'username' ? setUser(e.target.value) : setUrl(e.target.value);
    };
    return (
      <form className="p-4 relative h-full w-full" onSubmit={handleSubmit}>
        <div className=" ">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Settings</h3>
              <p className="mt-1 text-sm text-gray-500">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>
  
            <div className="mt-6  sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
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
                    className="flex-1 focus:ring-cyan-500 focus:border-cyan-500 block w-full min-w-0 rounded sm:text-sm border-gray-300"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Profile picture
                </label>
                <div className="my-3 flex rounded-md shadow-sm">
                  <input
                    onFocus={(e) => e.target.placeholder = ""} 
                    onBlur={(e) => e.target.placeholder = url}
                    onChange={handleChange}
                    placeholder={url}
                    type="text"
                    name="url"
                    id="url"
                    autoComplete="username"
                    className="flex-1 focus:ring-cyan-500 focus:border-cyan-500 block w-full min-w-0 rounded sm:text-sm border-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div className=" absolute bottom-2 right-2">
          <div className="flex  ">
            <button
              type="button"
              onClick={() => props.close()}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    )
  }
  