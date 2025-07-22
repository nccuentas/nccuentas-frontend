// src/components/AccountList.jsx
import { useEffect, useState } from "react";
import axios from "../services/api";

export default function AccountList({ onEdit }) {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    axios.get("/accounts").then(res => setAccounts(res.data));
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`/accounts/${id}`);
    setAccounts(prev => prev.filter(acc => acc._id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Cuentas de Streaming</h2>
      {accounts.map(account => (
        <div key={account._id} className="border rounded p-4 mb-2 shadow">
          <div className="font-semibold">{account.nombreServicio}</div>
          <div>Correo: {account.correoAcceso}</div>
          <div>Contraseña: {account.contrasenaAcceso}</div>
          <div>Perfiles: {account.perfiles?.length || 0}</div>
          <div>Notas: {account.notasAdicionales}</div>
          <button className="text-blue-500 mr-2" onClick={() => onEdit(account)}>Editar</button>
          <button className="text-red-500" onClick={() => handleDelete(account._id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}
