import { useState, useEffect } from "react";
export const DeleteProduct = ({ data, action, url }) => {
  return (
    <dialog id="delproduct" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box items-center flex flex-col gap-2">
        <h3 className="font-semibold text-lg">
          ¿Seguro desea eliminar los productos de {data?.nombre}?
        </h3>
        {data?.imagen ? (
          <img
            src={`${url}/api/files/${data?.collectionId}/${data?.id}/${data?.imagen}`}
            className="h-32"
          />
        ) : (
          <img src="noimg.jpg" className="h-32" />
        )}

        <p className="py-4 italic">
          "Esta accion <span className="font-bold">NO</span> se puede revertir"
        </p>
        <div className="modal-action">
          <button
            className="btn"
            onClick={() => document.getElementById("delproduct").close()}
          >
            Cancelar
          </button>
          <button
            className="btn btn-error text-white"
            onClick={() => {
              action(data.id);
              document.getElementById("delproduct").close();
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </dialog>
  );
};

export const UpdateProducto = ({ data, action, url }) => {
  const [producto, setProducto] = useState(data);
  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    setProducto(data);
  }, [data]);
  return (
    <dialog id="updproducto" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-semibold text-lg">Actualizar informacion</h3>
        <div className="grid grid-cols-5 py-4 px-2 items-start gap-2">
          <div
            className="col-span-2 relative cursor-pointer"
            onClick={() => document.getElementById("updimg").click()}
          >
            {producto?.imagen ? (
              producto?.imagen instanceof File ? (
                <img src={URL.createObjectURL(producto?.imagen)} />
              ) : (
                <img
                  src={`${url}/api/files/${producto.collectionId}/${producto.id}/${producto.imagen}`}
                />
              )
            ) : (
              <img src="noimg.jpg" className="col-span-2 " />
            )}
          </div>
          <div className="col-span-3 flex flex-col gap-3 px-2 ">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Nombre</legend>
              <input
                type="text"
                className="input input-info w-full"
                value={producto?.nombre}
                name="nombre"
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Precio</legend>
              <input
                type="number"
                className="input input-info w-full"
                value={producto?.precio}
                name="precio"
                onChange={handleChange}
              />
            </fieldset>
            <input
              type="file"
              id="updimg"
              className="file-input file-input-info"
              hidden
              name="imagen"
              value={""}
              onChange={(e) =>
                setProducto({
                  ...producto,
                  [e.target.name]: e.target.files[0],
                })
              }
            />
          </div>
          <fieldset className="fieldset col-span-full">
            <legend className="fieldset-legend">Descripcion</legend>
            <textarea
              className="textarea textarea-info h-24 w-full"
              value={producto?.descripcion}
              name="descripcion"
              onChange={handleChange}
            ></textarea>
          </fieldset>

          <div className="w-full col-span-full flex gap-3 justify-end">
            <button
              className="btn"
              onClick={() => document.getElementById("updproducto").close()}
            >
              Cancelar
            </button>
            <button
              className="btn btn-info text-white"
              onClick={() => {
                action(producto);
                document.getElementById("updproducto").close();
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

export const CreateProduct = ({ action, errs, producto, setProducto, resetData }) => {
  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  return (
    <dialog id="insproducto" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-semibold text-lg">Registrar nuevo producto</h3>
        <div className="grid grid-cols-5 py-4 px-2 items-start gap-2">
          <div
            className="col-span-2 relative cursor-pointer"
            onClick={() => document.getElementById("insimg").click()}
          >
            {producto?.imagen instanceof File ? (
              <img src={URL.createObjectURL(producto?.imagen)} />
            ) : (
              <img src="noimg.jpg" className="col-span-2 " />
            )}
          </div>
          <div className="col-span-3 flex flex-col gap-3 px-2 ">
            <fieldset className="fieldset  p-0">
              <legend className="fieldset-legend">Nombre</legend>
              <input
                type="text"
                className={`input w-full ${
                  errs?.nombre ? "input-error" : "input-success"
                }`}
                value={producto?.nombre}
                name="nombre"
                onChange={handleChange}
              />
              <span className="text-xs text-red-600">
                {errs?.nombre ?? null}
              </span>
            </fieldset>
            <fieldset className="fieldset p-0">
              <legend className="fieldset-legend">Precio</legend>
              <input
                type="number"
                className={`input w-full ${
                  errs?.precio ? "input-error" : "input-success"
                }`}
                value={producto?.precio}
                name="precio"
                onChange={handleChange}
              />
              <span className="text-xs text-red-600">
                {errs?.precio ?? null}
              </span>
            </fieldset>
            <input
              type="file"
              id="insimg"
              className="file-input file-input-success"
              hidden
              name="imagen"
              value={""}
              onChange={(e) =>
                setProducto({
                  ...producto,
                  [e.target.name]: e.target.files[0],
                })
              }
            />
          </div>
          <fieldset className="fieldset col-span-full p-0">
            <legend className="fieldset-legend">Descripcion</legend>
            <textarea
              className={`textarea ${errs?.descripcion ? "textarea-error":"textarea-success"} h-24 w-full`}
              value={producto?.descripcion}
              name="descripcion"
              onChange={handleChange}
            ></textarea>
            <span className="text-xs text-red-600">{errs?.descripcion ?? null}</span>
          </fieldset>

          <div className="w-full col-span-full flex gap-3 justify-end">
            <button
              className="btn"
              onClick={() => {
                document.getElementById("insproducto").close(),
                setProducto(resetData);
                
              }}
            >
              Cancelar
            </button>
            <button
              className="btn btn-success text-white"
              onClick={() => {
                action(producto);
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
