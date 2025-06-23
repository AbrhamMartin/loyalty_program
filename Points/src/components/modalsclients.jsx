import { useState, useEffect } from "react";
export const DelUser = ({ user, action }) => {
  return (
    <dialog id="deluser" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-semibold text-lg">
          ¿Seguro desea elimnar al usuario {user?.nombre}?
        </h3>
        <p className="py-4">Esta accion <span className="font-bold">NO</span> se puede revertir</p>
        <div className="modal-action">
          <button
            className="btn"
            onClick={() => document.getElementById("deluser").close()}
          >
            Cancelar
          </button>
          <button
            className="btn btn-error text-white"
            onClick={() => {
              action(user.id);
              document.getElementById("deluser").close();
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </dialog>
  );
};

export const UpdateUser = ({ user, action }) => {
  const [data, setData] = useState(user);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    setData(user);
  }, [user]);

  return (
    <dialog id="upduser" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Actualizar infomacion</h3>
        <div className="py-4">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Nombre</legend>
            <input
              type="text"
              className="input input-info w-full"
              value={data?.nombre}
              name="nombre"
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Apellidos</legend>
            <input
              type="text"
              className="input input-info w-full"
              value={data?.apellidos}
              name="apellidos"
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Telefono</legend>
            <input
              type="text"
              className="input input-info w-full"
              value={data?.telefono}
              name="telefono"
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Correo</legend>
            <input
              type="text"
              className="input input-info w-full"
              value={data?.email}
              name="email"
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Direccion</legend>
            <input
              type="text"
              className="input input-info w-full"
              value={data?.direccion}
              name="direccion"
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Ciudad</legend>
            <input
              type="text"
              className="input input-info w-full"
              value={data?.ciudad}
              name="ciudad"
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Estado</legend>
            <input
              type="text"
              className="input input-info w-full"
              value={data?.estado}
              name="estado"
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Puntos</legend>
            <input
              type="text"
              className="input input-info w-full"
              value={data?.puntos}
              name="puntos"
              onChange={handleChange}
            />
          </fieldset>
        </div>
        <div className="modal-action">
          <button
            className="btn"
            onClick={() => document.getElementById("upduser").close()}
          >
            Cancelar
          </button>
          <button
            className="btn btn-info text-white"
            onClick={() => {
              action(data);
              document.getElementById("upduser").close();
            }}
          >
            Actualizar
          </button>
        </div>
      </div>
    </dialog>
  );
};

export const CreateUser = ({ action }) => {
  const initial = {
    nombre: "",
    apellidos: "",
    telefono: "",
    direccion: "",
    email: "",
    ciudad: "",
    estado: "",
    puntos: 0,
    password: "",
    passwordConfirm: "",
    rol: "user",
    emailVisibility: true,
  };
  const [data, setData] = useState(initial);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <dialog id="insuser" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Registro de nuevo cliente</h3>
        <div className="py-4">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Nombre</legend>
            <input
              type="text"
              className="input input-info w-full"
              value={data?.nombre}
              name="nombre"
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Apellidos</legend>
            <input
              type="text"
              className="input input-info w-full"
              value={data?.apellidos}
              name="apellidos"
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Telefono</legend>
            <input
              type="text"
              className="input input-info w-full"
              value={data?.telefono}
              name="telefono"
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Correo</legend>
            <input
              type="text"
              className="input input-info w-full"
              value={data?.email}
              name="email"
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Contraseña</legend>
            <input
              type="text"
              className="input input-info w-full"
              value={data?.password}
              name="password"
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Confirmar Contraseña</legend>
            <input
              type="text"
              className="input input-info w-full"
              value={data?.passwordConfirm}
              name="passwordConfirm"
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Direccion</legend>
            <input
              type="text"
              className="input input-info w-full"
              value={data?.direccion}
              name="direccion"
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Ciudad</legend>
            <input
              type="text"
              className="input input-info w-full"
              value={data?.ciudad}
              name="ciudad"
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Estado</legend>
            <input
              type="text"
              className="input input-info w-full"
              value={data?.estado}
              name="estado"
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Puntos</legend>
            <input
              type="text"
              className="input input-info w-full"
              value={data?.puntos}
              name="puntos"
              onChange={handleChange}
            />
          </fieldset>
        </div>
        <div className="modal-action">
          <button
            className="btn"
            onClick={() => {
              setData(initial), document.getElementById("insuser").close();
            }}
          >
            Cancelar
          </button>
          <button
            className="btn btn-success text-white"
            onClick={() => {
              action(data);
              document.getElementById("insuser").close();
              setData(initial);
            }}
          >
            Registrar
          </button>
        </div>
      </div>
    </dialog>
  );
};
