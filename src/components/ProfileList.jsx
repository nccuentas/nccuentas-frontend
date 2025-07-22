// src/components/ProfileList.jsx
export default function ProfileList({ perfiles = [] }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mt-4">Perfiles</h3>
      <ul className="list-disc ml-6">
        {perfiles.map((perfil, i) => (
          <li key={i}>
            {perfil.nombrePerfil} – {perfil.estadoPerfil} – PIN: {perfil.tienePin ? "Sí" : "No"} – Asignado: {perfil.asignadoACliente || "Nadie"}
          </li>
        ))}
      </ul>
    </div>
  );
}
