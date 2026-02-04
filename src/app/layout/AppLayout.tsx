import { Outlet, NavLink } from "react-router-dom";

export function AppLayout() {
  return (
    <div>
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "16px",
        borderBottom: "1px solid #eee"
      }}>
        <strong>TaskFlow</strong>

        <nav style={{ display: "flex", gap: "12px" }}>
          <NavLink to="/">Board</NavLink>
          <NavLink to="/settings">Settings</NavLink>
        </nav>
      </header>

      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
}
