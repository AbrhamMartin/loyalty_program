import { usePocket } from "../pocketconexion";
import useSWR from "swr";
import { NoLoadinfo, IsLoadInfo } from "../err/fetchdata";
import { useNavigate } from "react-router-dom";
function Beneficios() {
  const navigate = useNavigate()
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
      <div className="col-span-full items-center justify-center flex gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="badge badge-soft badge-primary font-bold cursor-pointer"
          onClick={()=> navigate(-1)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
          />
        </svg>
      <h1 className="col-span-full text-2xl font-bold text-center">
        Empresas aliadas
      </h1>
      </div>
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
