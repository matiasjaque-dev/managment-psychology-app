// src/components/Layout/Layout.tsx
import Sidebar from "./Sidebar";
import Topbar from "./TopBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Topbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ flexGrow: 1, padding: 20 }}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
