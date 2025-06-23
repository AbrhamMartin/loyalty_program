export const Cards = ({ title, link, img }) => {
  return (
    <div className="card bg-base-100 w-62 shadow-md shadow-gray-600">
      <figure className="px-10 pt-10">
        <img
          src={img}
          alt="user"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <div className="card-actions">
          <a href={link} className="btn btn-primary">Ver mas</a>
        </div>
      </div>
    </div>
  );
};
