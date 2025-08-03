import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import { ToastContainer, toast } from "react-toastify";
import { usePocket } from "../pocketconexion";
import { NoLoadinfo, IsLoadInfo } from "../err/fetchdata";
import { Cards } from "../components/cards";
import { useVenta } from "../api/apiREST";

function HomeUsers() {
  const { pb, user, URL_BASE, logout } = usePocket();
  const { id } = user;
  // const { getVenta } = useVenta();
  const getProducts = useSWR(
    "/getproducts",
    async () => await pb.collection("productos").getFullList()
  );

  const setPuntos = useSWRMutation(
    "/setpoints",
    async (_, { arg }) => await pb.collection("users").update(id, arg),
    {
      onSuccess: (x) =>
        toast.success(`Felicidades ahora tienes ${x.puntos} puntos`),
    }
  );

  if (getProducts.isLoading )
    return <IsLoadInfo></IsLoadInfo>;
  if (getProducts.error ) return <NoLoadinfo></NoLoadinfo>;

  return (
    <div className="flex flex-col items-center p-5 gap-5">
      <ToastContainer />
      <button className="btn btn-success" onClick={() => logout()}>
        Salir
      </button>
      <div className="flex items-center gap-5">
        <div className="avatar w-auto">
          <div className="w-18 sm:w-28 rounded-full ">
            {user?.avatar ? (
              <img
                src={`${URL_BASE}/api/files/${user?.collectionId}/${user?.id}/${user?.avatar}`}
                alt=""
              />
            ) : (
              <img src="/noprofile.jpg" alt="" />
            )}
          </div>
        </div>
        <h1 className="font-bold text-3xl">
          Bienvenido {user.nombre} {user.apellidos}
        </h1>
      </div>
      <div className="rounded-lg p-4 bg-blue-600 text-white shadow-lg shadow-slate-400 flex flex-col items-center w-3/12 h-40 justify-between">
        <p className="text-xl font-bold">Mi tarjeta digital</p>
        <p className="font-bold text-xl">{user.telefono}</p>
        <p className="flex items-center gap-2">
          Puntos acumulados:{" "}
          {!!user.puntos ? (
            <span className="badge badge-soft badge-primary">
              {user.puntos}
            </span>
          ) : (
            <span className="badge badge-soft badge-error">{user.puntos}</span>
          )}
        </p>
      </div>
      <h1 className="font-semibold text-xl">Canjea tus puntos</h1>
      <div className="flex gap-4">
        <Cards
          title={"Beneficios"}
          img={"beneficios.jpg"}
          link={"/beneficios"}
        />
        <Cards title={"Premios"} img={"premios1.avif"} link={"/premios"} />
      </div>
      <div className="w-full">
        <h1 className="font-bold text-2xl mb-2">Productos</h1>
        <div className="grid grid-cols-5 gap-4">
          {getProducts.data.map((x) => (
            <div className="card bg-base-100 shadow-sm" key={x.id}>
              <figure className="h-40">
                {x.imagen ? (
                  <img
                    src={`${URL_BASE}/api/files/${x?.collectionId}/${x?.id}/${x?.imagen}`}
                  />
                ) : (
                  <img src="noimg.jpg" />
                )}
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {x.nombre}
                  <div className="badge badge-primary">
                    {Math.floor(x.precio * 0.05)} pts
                  </div>
                </h2>
                <p>{x.descripcion}</p>
                <p>Precio: $ {x.precio}</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      setPuntos.trigger({
                        puntos: Math.floor(x.precio * 0.05) + user.puntos,
                      })
                    }
                  >
                    comprar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default HomeUsers;
