import { NavLink, Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="app">
      <header className="header">
        <div className="brand">TaskFlow</div>
        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            Board
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => (isActive ? "active" : "")}>
            Settings
          </NavLink>
        </nav>
      </header>

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
