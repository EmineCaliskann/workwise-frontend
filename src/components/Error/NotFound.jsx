import { Link } from "react-router-dom";
import errorimg from "../../assets/compiled/svg/error-404.svg";

function NotFound() {
    return (
        <>
            <div className="error-page container">
                <div className="col-md-8 col-12 offset-md-2">
                    <div className="text-center">
                        <img className="img-error" style={{ maxWidth: "600px" }} src={errorimg} alt="Not Found" />
                        <h1 className="error-title">NOT FOUND</h1>
                        <p className='fs-5 text-gray-600'>The page you are looking not found.</p>
                        <Link to="/" className="btn btn-lg btn-outline-primary mt-3">Go Home</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NotFound;