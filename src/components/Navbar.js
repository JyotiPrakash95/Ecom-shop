import { Link, NavLink, Outlet } from "react-router-dom"
import Style from "./navbar.module.css"
import { useValue } from "./context"; 


export default function Navbar() {
    const { userPresent, handleLogout, searchTerm, setSearchTerm } = useValue();


    return (
      <>
        <header>
          <div className={Style.navbar}>
            <div className={Style.navbarContainer}>
              <Link to="/" className={Style.logoLink}>
                <img
                  src="../../images/bags-icon.png"
                  alt="shopping"
                  width="30"
                  height="30"
                  className={Style.logoImg}
                />
                Buy Busy
              </Link>
              <ul className="menu">
                {userPresent ? (
                  <>
                    <NavLink
                      to="/"
                      style={({ isActive }) =>
                        isActive
                          ? { color: "#701e58", border: "2px solid" }
                          : {}
                      }
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to="/orders"
                      style={({ isActive }) =>
                        isActive
                          ? { color: "#701e58", border: "2px solid" }
                          : {}
                      }
                    >
                      Order
                    </NavLink>
                    <NavLink
                      to="/cart"
                      style={({ isActive }) =>
                        isActive
                          ? { color: "#701e58", border: "2px solid" }
                          : {}
                      }
                    >
                      Cart
                    </NavLink>
                    <NavLink
                      onClick={handleLogout}
                      to="/home"
                      style={({ isActive }) =>
                        isActive
                          ? { color: "#701e58", border: "2px solid" }
                          : {}
                      }
                    >
                      Logout
                    </NavLink>
                  </>
                ) : (
                  <NavLink
                    to="/signin"
                    style={({ isActive }) =>
                      isActive ? { color: "#423427", border: "2px solid" } : {}
                    }
                  >
                    Sign In
                  </NavLink>
                )}
              </ul>
            </div>
          </div>
        </header>
        <Outlet />
      </>
    );
}