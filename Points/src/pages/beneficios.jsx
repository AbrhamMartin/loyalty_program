import { usePocket } from "../pocketconexion";
import useSWR from "swr";
import { NoLoadinfo, IsLoadInfo } from "../err/fetchdata";
function Beneficios() {
  const { pb, URL_BASE } = usePocket();

  const getEmpresas = useSWR(
    "/getEmpresas",
    async () =>
      await pb.collection("empresas").getFullList({ sort: "-created" })
  );

  if (getEmpresas.isLoading) return <IsLoadInfo></IsLoadInfo>;
  if (getEmpresas.error) return <NoLoadinfo></NoLoadinfo>;
  return (
    <div className="w-full grid grid-cols-5 p-4 gap-4 items-center">
      <h1 className="col-span-full text-2xl font-bold text-center">Empresas aliadas</h1>
      {getEmpresas.data.map((x) => (
        <div className="card shadow-md shadow-gray-400 flex items-center">
          <figure className="w-full">
            {x.img ? (
              <img
                src={`${URL_BASE}/api/files/${x.collectionId}/${x.id}/${x.img}`}
              />
            ) : (
              <img src="noimg.jpg" />
            )}
          </figure>
            <h2 className="card-title">{x.nombre}</h2>
        </div>
      ))}
    </div>
  );
}
export default Beneficios;
