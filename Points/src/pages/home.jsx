import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import { usePocket } from "../pocketconexion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IsLoadInfo, NoLoadinfo } from "../err/fetchdata";
function HomePage() {
  const { pb } = usePocket();
  const navigate = useNavigate();
  const [data, setData] = useState();

  const loginUsers = useSWRMutation(
    "/checklogin",
    async (_, { arg }) =>
      await pb.collection("users").authWithPassword(arg.email, arg.password),
    { onSuccess: (x) => navigate("/admin") }
  );

  const handlechange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Inicio de sesión</legend>

        <label className="label">Email</label>
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
          >
            <g fill="none">
              <path
                d="M7.25 11.5C6.83579 11.5 6.5 11.8358 6.5 12.25C6.5 12.6642 6.83579 13 7.25 13H8.75C9.16421 13 9.5 12.6642 9.5 12.25C9.5 11.8358 9.16421 11.5 8.75 11.5H7.25Z"
                fill="currentColor"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 1C4.61929 1 3.5 2.11929 3.5 3.5V12.5C3.5 13.8807 4.61929 15 6 15H10C11.3807 15 12.5 13.8807 12.5 12.5V3.5C12.5 2.11929 11.3807 1 10 1H6ZM10 2.5H9.5V3C9.5 3.27614 9.27614 3.5 9 3.5H7C6.72386 3.5 6.5 3.27614 6.5 3V2.5H6C5.44771 2.5 5 2.94772 5 3.5V12.5C5 13.0523 5.44772 13.5 6 13.5H10C10.5523 13.5 11 13.0523 11 12.5V3.5C11 2.94772 10.5523 2.5 10 2.5Z"
                fill="currentColor"
              ></path>
            </g>
          </svg>
          <input
            type="email"
            required
            placeholder="Correo electronico"
            name="email"
            onChange={handlechange}
          />
        </label>

        <label className="label">Contraseña</label>
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            type="password"
            required
            placeholder="*********"
            name="password"
            onChange={handlechange}
          />
        </label>
        
          <button
            className="btn btn-info mt-4"
            onClick={() => !loginUsers.isMutating &&loginUsers.trigger(data)}
          >
            Iniciar Sesión
          </button>
        
        <span>
          ¿No estas registrado? Haz clic{" "}
          <a href="/registro" className="link link-info">
            aqui
          </a>
        </span>
      </fieldset>
    </div>
  );
}
export default HomePage;
