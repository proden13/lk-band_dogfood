import { ArrowClockwise } from "react-bootstrap-icons";
import "./style.css";

const Loader = () => {
    return <div className="loader">
        <span className="loader-img">
            <ArrowClockwise />
        </span>
        <h6>Загруз Очка</h6>

    </div>

}

export default Loader;

