import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { Cpanel } from "../components/cpanel";
import { Search } from "../components/barra";
import { useState } from "react";
import { IsLoadInfo, NoLoadinfo } from "../err/fetchdata";
import {
  DeletePremio,
  UpdatePremio,
  CreatePremio,
} from "../components/modalspremios";
import { ToastContainer, toast } from "react-toastify";

function AdminPremios({ pb }) {
  const [barra, setBarra] = useState("");
  const [stock, setStock] = useState("");
  const [data, setData] = useState();

  const getReward = useSWR(
    "/getReward",
    async () => await pb.collection("premios").getFullList({ sort: "-created" })
  );

  const deleteReward = useSWRMutation(
    "/deletereward",
    async (_, { arg }) => await pb.collection("premios").delete(arg),
    {
      onSuccess: () => {
        toast.error("beneficio eliminado"), getReward.mutate();
      },
    }
  );

  const updateReward = useSWRMutation(
    "/updreward",
    async (_, { arg }) => await pb.collection("premios").update(arg.id, arg),
    {
      onSuccess: () => {
        toast.info("informacion actualizada"), getReward.mutate();
      },
    }
  );

  const insertReward = useSWRMutation(
    "/insertreward",
    async (_, { arg }) => await pb.collection("premios").create(arg),
    {
      onSuccess: () => {
        toast.success("Nuevo premio registrado"), getReward.mutate();
      },
    }
  );

  if (getReward.isLoading) return <IsLoadInfo></IsLoadInfo>;
  if (getReward.error) return <NoLoadinfo></NoLoadinfo>;
  return (
    <div className="flex flex-col gap-5 h-screen items-center">
      <Cpanel />
      <h1 className="font-semibold text-3xl">Premios</h1>
      <Search
        placeholder={"Buscar premio ..."}
        textBtn={"Nuevo premio"}
        idModal={"insreward"}
        barra={barra}
        setBarra={setBarra}
        isStock={true}
        stock={stock}
        setStock={setStock}
      />
      <div className="w-full grid grid-cols-4 p-4 gap-5">
        {!!getReward.data.length ? (
          getReward.data
            .filter((fs) => `${fs.stock}`.startsWith(stock))
            .filter((f) =>
              `${f.nombre} ${f.descripcion} ${f.value}`
                .toLocaleLowerCase()
                .includes(barra.toLocaleLowerCase())
            ).length === 0 ? (
            <p className="text-xl font-semibold text-center col-span-full">
              "No se encontraron resultados de la busqueda"
            </p>
          ) : (
            getReward.data
              .filter((fs) => `${fs.stock}`.startsWith(stock))
              .filter((f) =>
                `${f.nombre} ${f.descripcion} ${f.value}`
                  .toLocaleLowerCase()
                  .includes(barra.toLocaleLowerCase())
              )
              .map((x) => (
                <div
                  className="card card-sm shadow-sm shadow-gray-500 px-4 py-2"
                  key={x.id}
                >
                  <div className="card-body p-0">
                    <div className="flex justify-between p-0">
                      <h1 className="card-title w-7/12">{x.nombre}</h1>
                      {!!x.stock ? (
                        <div className="badge badge-primary badge-soft">
                          Stock: {x.stock}
                        </div>
                      ) : (
                        <div className="badge bg-red-600 font-bold text-white">
                          Stock: {x.stock}
                        </div>
                      )}
                    </div>
                    <p>{x.descripcion}</p>
                    <div className="badge badge-soft badge-primary">
                      Valor: {x.value} pts
                    </div>
                    <div className="justify-end card-actions gap-3 p-0">
                      <button
                        className="btn btn-info text-white rounded-full"
                        onClick={() => {
                          document.getElementById("updreward").showModal(),
                            setData(x);
                        }}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-error text-white rounded-full"
                        onClick={() => {
                          document.getElementById("delreward").showModal(),
                            setData(x);
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))
          )
        ) : (
          <p className="text-xl font-semibold text-center col-span-full">
            "No hay premios registrados"
          </p>
        )}
      </div>
      <DeletePremio
        data={data}
        action={(x) => !deleteReward.isMutating && deleteReward.trigger(x)}
      />
      <UpdatePremio
        datareward={data}
        action={(x) => !updateReward.isMutating && updateReward.trigger(x)}
      />
      <CreatePremio
        action={(x) => !insertReward.isMutating && insertReward.trigger(x)}
      />
      <ToastContainer />
    </div>
  );
}
export default AdminPremios;
