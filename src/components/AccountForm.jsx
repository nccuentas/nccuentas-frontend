import { useState, useEffect } from "react";
import axios from "../services/api";
import ProfileManager from "./ProfileManager";

export default function AccountForm({ selectedAccount, onSuccess }) {
  const [formData, setFormData] = useState({
    nombreServicio: "",
    correoAcceso: "",
    contrasenaAcceso: "",
    fechaAdquisicion: "",
    fechaExpiracion: "",
    notasAdicionales: "",
    perfiles: [],
  });

  useEffect(() => {
    if (selectedAccount) {
      setFormData(selectedAccount);
    }
  }, [selectedAccount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData._id) {
        await axios.put(`/accounts/${formData._id}`, formData);
      } else {
        await axios.post("/accounts", formData);
      }
      onSuccess();
      setFormData({
        nombreServicio: "",
        correoAcceso: "",
        contrasenaAcceso: "",
        fechaAdquisicion: "",
        fechaExpiracion: "",
        notasAdicionales: "",
        perfiles: [],
      });
    } catch (error) {
      console.error("Error al guardar la cuenta:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md space-y-4 mb-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        {formData._id ? "Editar Cuenta" : "Agregar Nueva Cuenta"}
      </h2>

      {[
        { name: "nombreServicio", label: "Servicio" },
        { name: "correoAcceso", label: "Correo de acceso" },
        { name: "contrasenaAcceso", label: "Contraseña" },
        { name: "fechaAdquisicion", label: "Fecha de adquisición", type: "date" },
        { name: "fechaExpiracion", label: "Fecha de expiración", type: "date" },
        { name: "notasAdicionales", label: "Notas adicionales" },
      ].map(({ name, label, type = "text" }) => (
        <div key={name} className="flex flex-col">
          <label htmlFor={name} className="text-sm font-medium text-gray-600">
            {label}
          </label>
          <input
            id={name}
            name={name}
            type={type}
            value={formData[name] || ""}
            onChange={handleChange}
            placeholder={label}
            className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
      ))}

      <ProfileManager
        perfiles={formData.perfiles || []}
        onChange={(updatedPerfiles) =>
          setFormData((prev) => ({ ...prev, perfiles: updatedPerfiles }))
        }
      />

      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition duration-200"
      >
        {formData._id ? "Actualizar Cuenta" : "Crear Cuenta"}
      </button>
    </form>
  );
}
