export const Search = ({
  textBtn,
  placeholder,
  barra,
  setBarra,
  idModal,
  isStock = false,
  stock,
  setStock,
}) => {
  return (
    <div className="flex w-9/12 justify-between gap-8">
      <label className="input w-full input-neutral">
        <input
          type="search"
          className="grow"
          placeholder={placeholder}
          value={barra}
          onChange={(e) => setBarra(e.target.value)}
        />
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
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
      </label>
      <button
        className="btn btn-success text-white"
        onClick={() => document.getElementById(idModal).showModal()}
      >
        {textBtn}
      </button>
      {isStock &&
        (stock === "" ? (
          <button
            className="btn btn-primary text-white rounded-full"
            onClick={() => setStock(0)}
          >
            Stock
          </button>
        ) : (
          <button
            className="btn bg-red-600  text-white rounded-full"
            onClick={() => setStock("")}
          >
            Sin stock
          </button>
        ))}
    </div>
  );
};
