import { usePocket } from "../pocketconexion";
import { NoLoadinfo, IsLoadInfo } from "../err/fetchdata";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { ToastContainer, toast } from "react-toastify";

function Premios() {
  const { pb, URL_BASE, user } = usePocket();
  const { puntos, id } = user;
  const getPremios = useSWR(
    "/getpremios",
    async () => await pb.collection("premios").getFullList({ sort: "-created" })
  );

  const setCanje = useSWRMutation(
    "/setcanjepoints",
    async (_, { arg }) => await pb.collection("users").update(id, arg),
    { onSuccess: (x) => toast.success("Canje Exitoso") }
  );

  const setStock = useSWRMutation(
    "/setstock",
    async (_, { arg }) => await pb.collection("premios").update(arg.id, arg),
    { onSuccess: () => getPremios.mutate() }
  );

  if (getPremios.isLoading) return <IsLoadInfo></IsLoadInfo>;
  if (getPremios.error) return <NoLoadinfo></NoLoadinfo>;
  return (
    <div className="grid grid-cols-4 m-5 gap-5">
      <ToastContainer></ToastContainer>
      <h1 className="col-span-full text-2xl text-center font-bold capitalize">
        Total de puntos acumulados {puntos}
      </h1>
      {getPremios.data.map((x) =>
        !!x.stock ? (
          <div
            className="card bg-base-100 card-sm shadow-sm shadow-gray-500"
            key={x.id}
          >
            <div className="card-body">
              <div className="flex justify-between ">
                <h1 className="card-title w-7/12">{x.nombre}</h1>
                <div className="badge badge-primary">Stock: {x.stock}</div>
              </div>
              <p>{x.descripcion}</p>
              <div className="badge badge-soft badge-primary">
                Valor: {x.value} pts
              </div>
              <div className="justify-end card-actions">
                {puntos >= x.value ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      !setCanje.isMutating &&
                        setCanje.trigger({ puntos: puntos - x.value });
                      setStock.trigger({ id: x.id, stock: x.stock - 1 });
                    }}
                  >
                    Canjear
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => toast.error("Puntos insuficientes")}
                  >
                    Canjear
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div
            className="card bg-base-100 card-sm shadow-sm shadow-gray-500"
            key={x.id}
          >
            <div className="card-body">
              <div className="flex justify-between ">
                <h1 className="card-title w-7/12">{x.nombre}</h1>
                <div className="badge bg-red-600 text-white">No disponible</div>
              </div>
              <p>{x.descripcion}</p>
              <div className="badge badge-soft badge-primary">
                Valor: {x.value} pts
              </div>
              <div className="justify-end card-actions">
                <button className="btn btn-primary" disabled>
                  Canjear
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
export default Premios;
