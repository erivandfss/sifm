import Sidebar from "../components/Sidebar";

export default function Usuarios() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-10 flex-1">
        <h1 className="text-3xl font-bold">Usuários & Permissões</h1>
        <p className="mt-4 text-gray-600">Tela de gerenciamento de usuários.</p>
      </div>
    </div>
  );
}
