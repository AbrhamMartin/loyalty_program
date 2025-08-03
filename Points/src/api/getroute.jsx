import { usePocket } from "../pocketconexion";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { toast } from "react-toastify";

export function useProducts() {
  const { pb } = usePocket();

  const getprods = useSWR(
    "/getprods",
    async () => await pb.collection("test").getFullList()
  );

  const insprods = useSWRMutation(
    "/insprods",
    async (_, { arg }) => await pb.collection("test").create(arg),
    {
      onSuccess: () => {
        getprods.mutate(), toast.success("añadido");
      },
    }
  );

  const updprods = useSWRMutation(
    "/updprod",
    async (_, { arg }) => await pb.collection("test").update(arg),
    {
      onSuccess: () => {
        getprods.mutate(), toast.success("actualizado");
      }
    }
  );

  const delprods = useSWRMutation(
    "/delprods",
    async (_, { arg }) => await pb.collection("test").delete(arg),
    {
      onSuccess: () => {
        getprods.mutate(), toast.error("eliminado");
      },
    }
  );

  return { getprods, insprods, updprods, delprods };
}

export function useClients() {}
