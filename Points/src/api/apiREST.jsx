import axios from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export function useVenta() {

  const url_server = "http://localhost:3000/api/productos";

  const getVenta = useSWR(
    url_server,
    async (url) => await axios.get(url).then((res) => res.data)
  );
  const insVenta = useSWRMutation(
    url_server,
    async (url, { arg }) => await axios.post(url, { arg })
  );
  
  return { getVenta, insVenta };
}
