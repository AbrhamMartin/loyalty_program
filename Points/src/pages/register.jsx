import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { usePocket } from "../pocketconexion";

function RegisterUser() {
  const { pb } = usePocket();
  const [data, setData] = useState({ rol: "user" });
  const [modal, ModalisOpen] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const Register = useSWRMutation(
    "/register",
    async (_, { arg }) => await pb.collection("users").create(arg),
    {
      onSuccess: (x) => {
        ModalisOpen(true), onRecordCreateRequest(x);
      },
      onError: (x) => console.log("err:", x),
    }
  );

  return (
    <div className="flex justify-center items-center h-screen flex-col gap-3">
      <h1 className="text-2xl">Registro</h1>
      <div className=" g-base-200 border-base-300 rounded-box border p-4 grid w-2/5 grid-cols-2 gap-3">
        <div className="flex flex-col">
          <label className="label">Telefono</label>
          <input
            type="text"
            className="input w-full"
            name="telefono"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="label">Nombre</label>
          <input
            type="text"
            className="input w-full"
            name="nombre"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="label">Apellidos</label>
          <input
            type="text"
            className="input w-full"
            name="apellidos"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label className="label">Dirección</label>
          <input
            type="text"
            className="input w-full"
            name="direccion"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col col-span-2">
          <label className="label w-full">Correo electronico</label>
          <input
            type="text"
            className="input w-full"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="label">Estado</label>
          <input
            type="text"
            className="input w-full"
            name="estado"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label className="label">Ciudad</label>
          <input
            type="text"
            className="input w-full"
            name="ciudad"
            onChange={handleChange}
          />
        </div>

        <button
          className="btn btn-info text-white col-span-2"
          onClick={() => {
            const pass = Math.floor(
              10000000 + Math.random() * 90000000
            ).toString();

            !Register.isMutating &&
              Register.trigger({
                ...data,
                password: pass,
                passwordConfirm: pass,
              });

            setData({ ...data, password: pass });
          }}
        >
          Registro
        </button>

        <span>
          Ya estas registrado? Haz clic{" "}
          <a href="/" className="link link-info">
            aqui
          </a>
        </span>
      </div>
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-400/40">
          <div className="bg-white p-6 rounded shadow flex flex-col items-center justify-center gap-2">
            <h2 className="text-lg font-bold">¡Te has registrado con exito!</h2>
            <p>Tu nueva contraseña es: </p>
            <span className="font-bold">{data?.password || "000-000-00"}</span>
            <button
              onClick={() => ModalisOpen(false)}
              className="btn btn-info text-white"
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default RegisterUser;
