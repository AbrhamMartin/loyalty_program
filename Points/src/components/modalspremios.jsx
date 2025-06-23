import { useState, useEffect } from "react";
export const DeletePremio = ({ data, action }) => {
  return (
    <dialog id="delreward" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="text-lg">
          ¿Seguro desea elimnar el premio{" "}
          <span className="font-semibold">{data?.nombre}</span>?
        </h3>
        <p className="py-4 italic">
          Esta accion <span className="font-bold">NO</span> se puede revertir
        </p>
        <div className="modal-action">
          <button
            className="btn"
            onClick={() => document.getElementById("delreward").close()}
          >
            Cancelar
          </button>
          <button
            className="btn btn-error text-white"
            onClick={() => {
              action(data.id);
              document.getElementById("delreward").close();
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </dialog>
  );
};

export const UpdatePremio = ({ datareward, action }) => {
  const [data, setData] = useState();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    setData(datareward);
  }, [datareward]);
  return (
    <dialog id="updreward" className="modal modal-bottom sm:modal-middle">
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
            <legend className="fieldset-legend">Descripcion</legend>
            <textarea
              className="textarea textarea-info h-24 w-full"
              value={data?.descripcion}
              name="descripcion"
              onChange={handleChange}
            ></textarea>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              Stock (Unidades disponibles)
            </legend>
            <input
              type="number"
              className="input input-info w-full"
              value={data?.stock}
              name="stock"
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Valor</legend>
            <input
              type="number"
              className="input input-info w-full"
              value={data?.value}
              name="value"
              onChange={handleChange}
            />
          </fieldset>
        </div>
        <div className="modal-action">
          <button
            className="btn"
            onClick={() => document.getElementById("updreward").close()}
          >
            Cancelar
          </button>
          <button
            className="btn btn-info text-white"
            onClick={() => {
              action(data);
              document.getElementById("updreward").close();
            }}
          >
            Actualizar
          </button>
        </div>
      </div>
    </dialog>
  );
};

export const CreatePremio = ({action}) => {
  const initial = { nombre: "", descripcion: "", value: 0, stock: 0 };
  const [data, setData] = useState(initial);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <dialog id="insreward" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Registrar nuevo premio</h3>
        <div className="py-4">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Nombre</legend>
            <input
              type="text"
              className="input input-success w-full"
              value={data?.nombre}
              name="nombre"
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Descripcion</legend>
            <textarea
              className="textarea textarea-success h-24 w-full"
              value={data?.descripcion}
              name="descripcion"
              onChange={handleChange}
            ></textarea>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              Stock (Unidades disponibles)
            </legend>
            <input
              type="number"
              className="input input-success w-full"
              value={data?.stock}
              name="stock"
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Valor</legend>
            <input
              type="number"
              className="input input-success w-full"
              value={data?.value}
              name="value"
              onChange={handleChange}
            />
          </fieldset>
        </div>
        <div className="modal-action">
          <button
            className="btn"
            onClick={() => {document.getElementById("insreward").close(), setData(initial)}}
          >
            Cancelar
          </button>
          <button
            className="btn btn-success text-white"
            onClick={() => {
              action(data);
              document.getElementById("insreward").close();
              setData(initial)
            }}
          >
            Registrar
          </button>
        </div>
      </div>
    </dialog>
  );
};
