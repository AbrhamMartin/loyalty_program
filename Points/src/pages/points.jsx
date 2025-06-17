import useSWR from "swr";
import { usePocket } from "../pocketconexion";
import { NoLoadinfo, IsLoadInfo } from "../err/fetchdata";
function Point() {
  const { pb } = usePocket();
  const getInfo = useSWR(
    "/getInfo",
    async () => await pb.collection("test").getFullList()
  );
  if(getInfo.error) return <NoLoadinfo/>
  if(getInfo.isLoading) return <IsLoadInfo/>
  return <>
  Aqui tienes la informacion
  {getInfo.data.map((x)=> x.Nombre)}
  </>;
}
export default Point;
