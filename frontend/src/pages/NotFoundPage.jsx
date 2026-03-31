import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div className="section-shell py-20 text-center">
    <h1 className="font-heading text-5xl font-extrabold text-brandBlue">404</h1>
    <p className="mt-3 text-slate-700">Page not found</p>
    <Link to="/" className="mt-6 inline-flex rounded-lg bg-mintGreen px-5 py-3 font-bold text-white">
      Go Home
    </Link>
  </div>
);

export default NotFoundPage;
