export const NoLoadinfo = () => {
  return (
    <div className="flex h-screen justify-center items-center flex-col">
      <h1 className="text-3xl font-bold">Error 404</h1>
      <p className="font-semibold text-md">
        Lo sentimos, no podemos obtener los datos en este momento, intente más
        tarde
      </p>
    </div>
  );
};
export const IsLoadInfo = ()=>{
  return <div className="flex h-screen justify-center items-center flex-col">
    <span className="loading loading-spinner loading-xl"></span>
    <p>Cargando Información, espere ....</p>
  </div>
}