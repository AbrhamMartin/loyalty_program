import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { Cpanel } from "../components/cpanel";
import { NoLoadinfo, IsLoadInfo } from "../err/fetchdata";
import { DelUser, UpdateUser, CreateUser } from "../components/modalsclients";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Search } from "../components/barra";
function AdminUsers({ pb }) {
  const [data, setData] = useState();
  const [barra, setBarra] = useState("");
  const getUsers = useSWR(
    "/getusers",
    async () =>
      await pb
        .collection("users")
        .getFullList({ sort: "-created", filter: "rol !~ 'admin'" })
  );
  const deluser = useSWRMutation(
    "/deluser",
    async (_, { arg }) => await pb.collection("users").delete(arg),
    {
      onSuccess: () => {
        getUsers.mutate(), toast.success("Usuario eliminado");
      },
    }
  );
  const updUser = useSWRMutation(
    "/updateuser",
    async (_, { arg }) => await pb.collection("users").update(arg.id, arg),
    {
      onSuccess: () => {
        getUsers.mutate(), toast.info("Informacion actualizada");
      },
    }
  );
  const createUser = useSWRMutation(
    "/createuser",
    async (_, { arg }) => await pb.collection("users").create(arg),
    {
      onSuccess: () => {
        getUsers.mutate(), toast.success("Nuevo usuario registrado");
      },
    }
  );
  if (getUsers.isLoading) return <IsLoadInfo></IsLoadInfo>;
  if (getUsers.error) return <NoLoadinfo></NoLoadinfo>;
  return (
    <div className="flex flex-col gap-5 h-screen items-center">
      <Cpanel />
      <h1 className="font-semibold text-3xl">Clientes</h1>
      <Search
        textBtn={"Nuevo cliente"}
        placeholder={"Buscar usuario"}
        barra={barra}
        setBarra={setBarra}
        idModal={"insuser"}
      />
      <div className="flex flex-col items-center">
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Telefono</th>
                <th>Correo</th>
                <th>Direccion</th>
                <th>Ciudad</th>
                <th>Estado</th>
                <th>Puntos</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {!!getUsers.data.length ? (
                getUsers.data.filter((f) =>
                  `${f.nombre} ${f.apellidos} ${f.telefono} ${f.email}`
                    .toLocaleLowerCase()
                    .includes(barra.toLocaleLowerCase())
                ).length === 0 ? (
                  <tr>
                    {" "}
                    <td colSpan={8} className="text-center text-gray-500 py-4">
                      "No se encontraron resultados de la busqueda"
                    </td>
                  </tr>
                ) : (
                  getUsers.data
                    .filter((f) =>
                      `${f.nombre} ${f.apellidos} ${f.telefono} ${f.email}`
                        .toLocaleLowerCase()
                        .includes(barra.toLocaleLowerCase())
                    )
                    .map((x, i) => (
                      <tr key={x.id}>
                        <th className="font-normal">{i + 1}</th>
                        <th className="font-normal">{x.nombre}</th>
                        <th className="font-normal">{x.apellidos}</th>
                        <th className="font-normal">{x.telefono}</th>
                        <th className="font-normal">{x.email}</th>
                        <th className="font-normal">{x.direccion}</th>
                        <th className="font-normal">{x.ciudad}</th>
                        <th className="font-normal">{x.estado}</th>
                        <th className="font-normal">{x.puntos}</th>
                        <th>
                          <div className="flex gap-4">
                            <button
                              onClick={() => {
                                document.getElementById("upduser").showModal();
                                setData(x);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6 text-blue-500"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => {
                                document.getElementById("deluser").showModal();
                                setData(x);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6 text-red-500"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                              </svg>
                            </button>
                          </div>
                        </th>
                      </tr>
                    ))
                )
              ) : (
                <tr>
                  {" "}
                  <td colSpan={8} className="text-center text-gray-500 py-4">
                    No hay clientes registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <DelUser key="del" user={data} action={(x) => deluser.trigger(x)} />
      <UpdateUser key="upd" user={data} action={(x) => updUser.trigger(x)} />
      <CreateUser key="ins" action={(x) => createUser.trigger(x)} />
      <ToastContainer></ToastContainer>
    </div>
  );
}
export default AdminUsers;
