import { useEffect, useState } from "react";
export const DeleteBeneficio = ({ data, action, url }) => {
  return (
    <dialog id="delbeneficio" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box items-center flex flex-col gap-2">
        <h3 className="font-semibold text-lg">
          ¿Seguro desea eliminar los beneficios de {data?.nombre}?
        </h3>
        {data?.img ?         <img
          src={`${url}/api/files/${data?.collectionId}/${data?.id}/${data?.img}`}
          className="h-32"
        />: <img src="noimg.jpg" className="h-32" /> }

        <p className="py-4 italic">
          "Esta accion <span className="font-bold">NO</span> se puede revertir"
        </p>
        <div className="modal-action">
          <button
            className="btn"
            onClick={() => document.getElementById("delbeneficio").close()}
          >
            Cancelar
          </button>
          <button
            className="btn btn-error text-white"
            onClick={() => {
              action(data.id);
              document.getElementById("delbeneficio").close();
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </dialog>
  );
};

export const UpdateBeneficio = ({ data, action, url }) => {
  const [beneficio, setBeneficio] = useState(data);
  useEffect(() => {
    setBeneficio(data);
  }, [data]);
  return (
    <dialog id="updbeneficio" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-semibold text-lg">Actualizar informacion</h3>
        <div className="grid grid-cols-5 py-4 px-2 items-start gap-2">
          {beneficio?.img ? (
            beneficio?.img instanceof File ? (
              <img
                src={URL.createObjectURL(beneficio?.img)}
                className="col-span-2 "
              />
            ) : (
              <img
                src={`${url}/api/files/${beneficio.collectionId}/${beneficio.id}/${beneficio.img}`}
                className="col-span-2 "
              />
            )
          ) : (
            <img src="noimg.jpg" className="col-span-2 " />
          )}
          <div className="col-span-3 flex flex-col gap-3 px-2 ">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Nombre</legend>
              <input
                type="text"
                className="input input-info w-full"
                value={beneficio?.nombre}
                name="nombre"
                onChange={(e) =>
                  setBeneficio({
                    ...beneficio,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </fieldset>
            <input
              type="file"
              className="file-input file-input-info"
              name="img"
              value={""}
              onChange={(e) =>
                setBeneficio({
                  ...beneficio,
                  [e.target.name]: e.target.files[0],
                })
              }
            />
          </div>
          <div className="w-full col-span-full flex gap-3 justify-end">
            <button
              className="btn"
              onClick={() => document.getElementById("updbeneficio").close()}
            >
              Cancelar
            </button>
            <button
              className="btn btn-info text-white"
              onClick={() => {
                action(beneficio);
                document.getElementById("updbeneficio").close();
              }}
            >
              Actualizar
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export const CreateBeneficio = ({ action }) => {
  const initial = { img: "", nombre: "" };
  const [beneficio, setBeneficio] = useState(initial);
  return (
    <dialog id="insbeneficio" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-semibold text-lg">Registrar Beneficio</h3>
        <div className="grid grid-cols-5 py-4 px-2 items-start gap-2">
          {beneficio?.img instanceof File ? (
            <img
              src={URL.createObjectURL(beneficio?.img)}
              className="col-span-2 "
            />
          ) : (
            <img src="noimg.jpg" className="col-span-2 " />
          )}
          <div className="col-span-3 flex flex-col gap-3 px-2 ">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Nombre</legend>
              <input
                type="text"
                className="input input-success w-full"
                value={beneficio?.nombre}
                name="nombre"
                onChange={(e) =>
                  setBeneficio({
                    ...beneficio,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </fieldset>
            <input
              type="file"
              className="file-input file-input-success"
              name="img"
              onChange={(e) =>
                setBeneficio({
                  ...beneficio,
                  [e.target.name]: e.target.files[0],
                })
              }
            />
          </div>
          <div className="w-full col-span-full flex gap-3 justify-end">
            <button
              className="btn"
              onClick={() => {
                document.getElementById("insbeneficio").close(),
                  setBeneficio(initial);
              }}
            >
              Cancelar
            </button>
            <button
              className="btn btn-success text-white"
              onClick={() => {
                action(beneficio);
                document.getElementById("insbeneficio").close();
                setBeneficio(initial);
              }}
            >
              Registrar
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};
