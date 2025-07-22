// src/components/DashboardSummary.jsx
import { useEffect, useState } from "react";
import axios from "../services/api";

export default function DashboardSummary() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    axios.get("/accounts").then(res => setAccounts(res.data));
  }, []);

  const total = accounts.length;
  const porServicio = {};
  let perfilesOcupados = 0, perfilesLibres = 0;

  accounts.forEach(acc => {
    porServicio[acc.nombreServicio] = (porServicio[acc.nombreServicio] || 0) + 1;
    acc.perfiles?.forEach(p => {
      if (p.estadoPerfil === "Ocupado") perfilesOcupados++;
      else if (p.estadoPerfil === "Libre") perfilesLibres++;
    });
  });

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold">Resumen</h2>
      <p>Total de cuentas: {total}</p>
      <p>Perfiles libres: {perfilesLibres}</p>
      <p>Perfiles ocupados: {perfilesOcupados}</p>
      <div className="mt-2">
        <h4 className="font-semibold">Cuentas por servicio:</h4>
        <ul>
          {Object.entries(porServicio).map(([servicio, cantidad]) => (
            <li key={servicio}>{servicio}: {cantidad}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
