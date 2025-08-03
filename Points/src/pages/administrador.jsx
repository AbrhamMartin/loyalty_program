import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { Cpanel } from "../components/cpanel";
import { Search } from "../components/barra";
import { useState } from "react";
import { IsLoadInfo, NoLoadinfo } from "../err/fetchdata";
import {
  DeleteProduct,
  UpdateProducto,
  CreateProduct,
} from "../components/modalsproducts";
import { ToastContainer, toast } from "react-toastify";
import { validateRegisterProduct } from "../components/validation";

function AdminPage({ pb, url }) {
  const [barra, setBarra] = useState("");
  const [data, setData] = useState();
  const [errRegister, setErrorRegister] = useState();

  const initial = { nombre: "", descripcion: "", precio: 0 };
  const [producto, setProducto] = useState(initial);

  const getProductos = useSWR(
    "/getproductos",
    async () => await pb.collection("productos").getFullList()
  );

  const deleteProducto = useSWRMutation(
    "/deleteproduct",
    async (_, { arg }) => await pb.collection("productos").delete(arg),
    {
      onSuccess: () => {
        toast.error("producto eliminado");
        getProductos.mutate();
      },
    }
  );

  const updateProducto = useSWRMutation(
    "/updateproduct",
    async (_, { arg }) => await pb.collection("productos").update(arg.id, arg),
    {
      onSuccess: () => {
        toast.info("Informacion actualizada");
        getProductos.mutate();
      },
    }
  );

  const createProducto = useSWRMutation(
    "/createproduct",
    async (_, { arg }) => await pb.collection("productos").create(arg),
    {
      onSuccess: () => {
        toast.success("Nuevo producto resgistrado"), getProductos.mutate();
      },
    }
  );

  if (getProductos.isLoading) return <IsLoadInfo></IsLoadInfo>;
  if (getProductos.error) return <NoLoadinfo></NoLoadinfo>;
  return (
    <div className="flex flex-col gap-5 h-screen items-center">
      <Cpanel />
      <h1 className="font-semibold text-3xl">Productos</h1>
      <Search
        placeholder={"Buscar producto ..."}
        textBtn={"Nuevo producto"}
        idModal={"insproducto"}
        barra={barra}
        setBarra={setBarra}
      />
      <div className="w-full grid grid-cols-5 p-4 gap-5">
        {!!getProductos.data.length ? (
          getProductos.data.filter((f) =>
            `${f.nombre}`
              .toLocaleLowerCase()
              .includes(barra.toLocaleLowerCase())
          ).length === 0 ? (
            <p className="text-xl font-semibold text-center col-span-full">
              "No hay resultados de la busqueda"
            </p>
          ) : (
            getProductos.data
              .filter((f) =>
                `${f.nombre}`
                  .toLocaleLowerCase()
                  .includes(barra.toLocaleLowerCase())
              )
              .map((x) => (
                <div
                  key={x.id}
                  className="shadow shadow-gray-500 rounded-md justify-between flex flex-col"
                >
                  <div>
                    {x.imagen ? (
                      <img
                        src={`${url}/api/files/${x?.collectionId}/${x?.id}/${x?.imagen}`}
                      />
                    ) : (
                      <img src="noimg.jpg" />
                    )}
                  </div>
                  <div className="px-4 py-2 flex flex-col gap-2">
                    <h1 className="font-semibold">{x.nombre}</h1>
                    <p className="text-sm">{x.descripcion}</p>
                    <p className="text-sm">Precio: ${x.precio}</p>
                  </div>
                  <div className="flex gap-3 justify-end p-2 items-end">
                    <button
                      className="btn btn-info rounded-full text-white"
                      onClick={() => {
                        document.getElementById("updproducto").showModal();
                        setData(x);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-error rounded-full text-white"
                      onClick={() => {
                        document.getElementById("delproduct").showModal();
                        setData(x);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
          )
        ) : (
          <p className="text-xl font-semibold text-center col-span-full">
            "No hay productos registrados"
          </p>
        )}
      </div>
      <DeleteProduct
        data={data}
        action={(x) => !deleteProducto.isMutating && deleteProducto.trigger(x)}
        url={url}
      />
      <UpdateProducto
        data={data}
        action={(x) => !updateProducto.isMutating && updateProducto.trigger(x)}
        url={url}
      />
      <CreateProduct
        resetData={initial}
        errs={errRegister}
        producto={producto}
        setProducto={setProducto}
        action={(x) =>
          validateRegisterProduct
            .validate(x, { abortEarly: false })
            .then(() => {
              !createProducto.isMutating && createProducto.trigger(x),
                document.getElementById("insproducto").close();
              setErrorRegister(null);
              setProducto(initial);
            })
            .catch((x) => {
              const formattedErrors = x.inner.reduce((acc, err) => {
                acc[err.path] = err.message;
                return acc;
              }, {});
              setErrorRegister(formattedErrors);
            })
        }
      />
      <ToastContainer />
    </div>
  );
}
export default AdminPage;
