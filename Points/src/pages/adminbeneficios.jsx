import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { useState } from "react";
import { NoLoadinfo, IsLoadInfo } from "../err/fetchdata";
import { Search } from "../components/barra";
import { Cpanel } from "../components/cpanel";
import {
  DeleteBeneficio,
  UpdateBeneficio,
  CreateBeneficio,
} from "../components/modalsbeneficios";
import { ToastContainer, toast } from "react-toastify";
function AdminBeneficios({ pb, url }) {
  const [data, setData] = useState();
  const [barra, setBarra] = useState("")

  const getBeneficios = useSWR(
    "/getbeneficios",
    async () =>
      await pb.collection("empresas").getFullList({ sort: "-created" })
  );

  const delBeneficio = useSWRMutation(
    "/delbeneficio",
    async (_, { arg }) => await pb.collection("empresas").delete(arg),
    {
      onSuccess: () => {
        toast.error("Beneficio eliminado"), getBeneficios.mutate();
      },
    }
  );

  const updBeneficios = useSWRMutation(
    "/updbeneficios",
    async (_, { arg }) => await pb.collection("empresas").update(arg.id, arg),
    {
      onSuccess: (x) => {
        toast.info(`Beneficio ${x.nombre} actualizado`);
        getBeneficios.mutate();
      },
    }
  );

  const InsBeneficio = useSWRMutation(
    "/insbeneficio",
    async (_, { arg }) => await pb.collection("empresas").create(arg),
    {
      onSuccess: () => {
        toast.success("Nuevo beneficio registrado"), getBeneficios.mutate();
      },
    }
  );

  if (getBeneficios.isLoading) return <IsLoadInfo></IsLoadInfo>;
  if (getBeneficios.error) return <NoLoadinfo></NoLoadinfo>;

  return (
    <div className="flex flex-col gap-5 h-screen items-center">
      <Cpanel />
      <h1 className="font-semibold text-3xl">Beneficios</h1>
      <Search
        placeholder={"Buscar beneficio ..."}
        textBtn={"Nuevo beneficio"}
        idModal={"insbeneficio"}
        barra={barra}
        setBarra={setBarra}
      />
      <div className="w-full grid grid-cols-4 p-4 gap-4 ">
        {!!getBeneficios.data.length ?
        getBeneficios.data.filter((f) => `${f.nombre}`.toLocaleLowerCase().includes(barra.toLocaleLowerCase())).length === 0 ? <p className="text-xl font-semibold text-center col-span-full">"No se encontraron resultados de la busqueda"</p>:
        getBeneficios.data.filter((f)=> `${f.nombre}`.toLocaleLowerCase().includes(barra.toLocaleLowerCase())).map((x) => (
          <div
            className="shadow-md shadow-gray-400 items-center flex"
            key={x.id}
          >
            <figure className="">
              {x.img ? (
                <img
                  src={`${url}/api/files/${x.collectionId}/${x.id}/${x.img}`}
                />
              ) : (
                <img src="noimg.jpg" />
              )}
            </figure>
            <div className="flex flex-col items-center justify-between h-full py-2">
              <h2 className="card-title font-semibold">{x.nombre}</h2>
              <div className="w-full px-8 flex flex-col gap-3">
                <button
                  className="btn btn-info rounded-full btn-sm text-white"
                  onClick={() => {
                    setData(x),
                      document.getElementById("updbeneficio").showModal();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                  Editar
                </button>
                <button
                  className="btn btn-error rounded-full btn-sm text-white"
                  onClick={() => {
                    setData(x),
                      document.getElementById("delbeneficio").showModal();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )): <p className="text-xl font-semibold text-center col-span-full">"No hay beneficios registrados aun"</p>}
      </div>
      <DeleteBeneficio data={data} action={(x) => delBeneficio.trigger(x) } url={url} />
      <CreateBeneficio action={(x) => InsBeneficio.trigger(x)} />
      <UpdateBeneficio
        data={data}
        action={(x) => updBeneficios.trigger(x)}
        url={url}
      />
      <ToastContainer />
    </div>
  );
}
export default AdminBeneficios;
