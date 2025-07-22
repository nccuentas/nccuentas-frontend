import { useEffect, useState } from "react";
import axios from "../services/api";
import AccountForm from "../components/AccountForm";

export default function Dashboard() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get("/accounts");
        setAccounts(response.data);
      } catch (error) {
        console.error("Error al obtener cuentas:", error);
      }
    };
    fetchAccounts();
  }, [refresh]);

  const handleEdit = (account) => {
    setSelectedAccount(account);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (confirm("¿Seguro que deseas eliminar esta cuenta?")) {
      try {
        await axios.delete(`/accounts/${id}`);
        setRefresh((prev) => !prev);
      } catch (error) {
        console.error("Error al eliminar cuenta:", error);
      }
    }
  };

  const handleSuccess = () => {
    setRefresh((prev) => !prev);
    setSelectedAccount(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Panel de Cuentas
      </h1>

      <AccountForm selectedAccount={selectedAccount} onSuccess={handleSuccess} />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
        {accounts.map((account) => (
          <div
            key={account._id}
            className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between"
          >
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">
                {account.nombreServicio}
              </h3>
              <p className="text-sm text-gray-600">Correo: {account.correoAcceso}</p>
              <p className="text-sm text-gray-600">Contraseña: {account.contrasenaAcceso}</p>
              <p className="text-sm text-gray-600">
                Vigencia: {account.fechaAdquisicion} – {account.fechaExpiracion}
              </p>
              {account.notasAdicionales && (
                <p className="text-sm text-gray-500 italic">
                  {account.notasAdicionales}
                </p>
              )}
              <div className="mt-3 space-y-1">
                <p className="text-sm font-medium text-gray-700">Perfiles:</p>
                {account.perfiles?.map((perfil, i) => (
                  <div
                    key={i}
                    className="text-sm text-gray-600 flex justify-between items-center"
                  >
                    <span>{perfil.nombrePerfil}</span>
                    <span className="text-xs text-gray-500">
                      {perfil.estadoPerfil}
                      {perfil.tienePin && " 🔒"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-between gap-2">
              <button
                onClick={() => handleEdit(account)}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-1 rounded-md text-sm font-medium"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(account._id)}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-1 rounded-md text-sm font-medium"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
