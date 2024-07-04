
import { GENDERS } from "@/utils/contants";
import LABELS from "@/utils/labels";

const SignUpComponent = ({ handleChange, handleSubmit, handleVerfiyUserName, isCheckingUserName, userNameMsg  }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-2 sm:p-4">
      <div className="w-full max-w-md p-4 sm:p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Create your account</h2>
        <form className="mt-4 space-y-4" autoComplete="off" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                required
                className="block w-full px-2 py-1 sm:px-3 sm:py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                required
                className={`block w-full px-2 py-1 sm:px-3 sm:py-2 mt-1 border rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2 ${
                  userNameMsg === LABELS?.USER_NAME_AVAILABLE
                    ? 'border-green-500 focus:ring-green-500'
                    : userNameMsg === LABELS?.USER_NAME_TAKEN
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
                onChange={handleVerfiyUserName}
              />
              {isCheckingUserName && <p className="text-sm text-gray-500">Checking...</p>}
              {userNameMsg && (
                <p
                  className={`text-sm text-right ${
                    userNameMsg === LABELS?.USER_NAME_AVAILABLE ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {userNameMsg}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                required
                className="block w-full px-2 py-1 sm:px-3 sm:py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                required
                className="block w-full px-2 py-1 sm:px-3 sm:py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="profile-picture" className="block text-sm font-medium text-gray-700">
                Profile Picture
              </label>
              <input
                type="file"
                name="profilePicture"
                id="profile-picture"
                autoComplete="off"
                required
                className="block w-full px-2 py-1 sm:px-3 sm:py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                autoComplete="off"
                required
                className="block w-full px-2 py-1 sm:px-3 sm:py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleChange}
              >
                {GENDERS.map(({ value, label }) => (
                  <option value={value} key={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={userNameMsg === LABELS.USER_NAME_TAKEN}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpComponent;

