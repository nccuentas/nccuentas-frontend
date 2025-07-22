import { useState } from "react";

export default function ProfileManager({ perfiles, onChange }) {
  const [newProfile, setNewProfile] = useState({
    nombrePerfil: "",
    tienePin: false,
    asignadoACliente: "",
    estadoPerfil: "Libre",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setNewProfile((prev) => ({ ...prev, [name]: val }));
  };

  const handleAddProfile = () => {
    if (!newProfile.nombrePerfil) return;

    onChange([...perfiles, newProfile]);
    setNewProfile({
      nombrePerfil: "",
      tienePin: false,
      asignadoACliente: "",
      estadoPerfil: "Libre",
    });
  };

  const handleEditProfile = (index, field, value, type) => {
    const updatedProfiles = [...perfiles];
    updatedProfiles[index][field] = type === "checkbox" ? value.target.checked : value;
    onChange(updatedProfiles);
  };

  const handleDeleteProfile = (index) => {
    const updated = perfiles.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div>
      <h3>Perfiles</h3>

      {perfiles.map((perfil, index) => (
        <div key={index}>
          <input
            type="text"
            value={perfil.nombrePerfil}
            onChange={(e) => handleEditProfile(index, "nombrePerfil", e.target.value)}
            placeholder="Nombre del perfil"
          />
          <label>
            <input
              type="checkbox"
              checked={perfil.tienePin}
              onChange={(e) => handleEditProfile(index, "tienePin", e, "checkbox")}
            />
            ¿Tiene PIN?
          </label>
          <input
            type="text"
            value={perfil.asignadoACliente || ""}
            onChange={(e) => handleEditProfile(index, "asignadoACliente", e.target.value)}
            placeholder="Asignado a (opcional)"
          />
          <select
            value={perfil.estadoPerfil}
            onChange={(e) => handleEditProfile(index, "estadoPerfil", e.target.value)}
          >
            <option value="Libre">Libre</option>
            <option value="Ocupado">Ocupado</option>
            <option value="Inactivo">Inactivo</option>
          </select>
          <button onClick={() => handleDeleteProfile(index)}>Eliminar</button>
        </div>
      ))}

      <h4>Agregar nuevo perfil</h4>
      <input
        type="text"
        name="nombrePerfil"
        value={newProfile.nombrePerfil}
        onChange={handleInputChange}
        placeholder="Nombre del nuevo perfil"
      />
      <label>
        <input
          type="checkbox"
          name="tienePin"
          checked={newProfile.tienePin}
          onChange={handleInputChange}
        />
        ¿Tiene PIN?
      </label>
      <input
        type="text"
        name="asignadoACliente"
        value={newProfile.asignadoACliente}
        onChange={handleInputChange}
        placeholder="Asignado a (opcional)"
      />
      <select
        name="estadoPerfil"
        value={newProfile.estadoPerfil}
        onChange={handleInputChange}
      >
        <option value="Libre">Libre</option>
        <option value="Ocupado">Ocupado</option>
        <option value="Inactivo">Inactivo</option>
      </select>
      <button onClick={handleAddProfile}>Agregar perfil</button>
    </div>
  );
}
