// src/components/Layout.jsx
import Sidebar from "./Sidebar";
import HeaderUsuario from "./HeaderUsuario";

export default function Layout({ children }) {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderUsuario />
        <main className="flex-1 p-10 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}