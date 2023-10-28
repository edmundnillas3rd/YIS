import cjcLogo from "../assets/cjc-logo.png";

export default function Auth() {
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-32 w-auto" src={cjcLogo} alt="cor jesu logo" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="#" method="POST">
                    <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-t-md border-1 border-gray-300  border-b-gray-50 py-1.5 text-gray-700 shadow-sm ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Email" />
                    <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-b-md border-1 border-gray-300  border-t-gray-50 py-1.5 text-gray-700 shadow-sm ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Password" />
                    <div className="mt-4">
                        <button type="submit" className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Sign in</button>
                    </div>
                    <div className="mt-2 text-sm">
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                    </div>
                </form>

                {/* <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?
                    <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
                </p> */}
            </div>
        </div>
    );
}