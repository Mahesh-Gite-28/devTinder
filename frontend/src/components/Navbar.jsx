

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-md px-6">
      
      {/* Left - Logo */}
      <div className="flex-1">
        <a className="text-2xl font-bold tracking-wide">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            DevTinder
          </span>
        </a>
      </div>

      {/* Right - Profile */}
      <div className="flex items-center gap-4">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar hover:scale-105 transition-transform"
          >
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                alt="profile"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 w-52 rounded-xl bg-base-100 p-2 shadow-lg"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge badge-primary badge-sm">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a className="text-error font-medium">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
