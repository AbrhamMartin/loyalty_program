import { useProducts} from "../api/getroute";
import { NoLoadinfo, IsLoadInfo } from "../err/fetchdata";
import { ToastContainer, toast } from "react-toastify";

function Point() {
  const {getprods, insprods, updprods, delprods} = useProducts()

  if(getprods.error) return <NoLoadinfo/>
  if(getprods.isLoading) return <IsLoadInfo/>
  return (
    <>
    <ToastContainer></ToastContainer>
      Aqui tienes la informacion <br></br>
      {getprods.data.map((x)=> <div key={x.id} className="">
        {x.Nombre}
        <button className="btn btn-info" onClick={()=> !updprods.isMutating && updprods.trigger({id:x.id, Nombre:"Manzana"})}>Actualizar</button>
        <button className="btn btn-error" onClick={()=> !delprods.isMutating && delprods.trigger(x.id)}>Eliminar</button>

      </div>)}
      <button className="btn btn-success" onClick={()=> !insprods.isMutating && insprods.trigger({Nombre:"Platano"})}>Añade Platano</button>
    </>
  );
}
export default Point;
