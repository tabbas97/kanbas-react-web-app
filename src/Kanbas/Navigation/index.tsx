import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { FaTachometerAlt, FaRegUserCircle, FaBook, FaRegCalendarAlt } from "react-icons/fa";
function KanbasNavigation() {
    const links = [
        { label: "Account", icon: <FaRegUserCircle className="fs-2" /> },
        { label: "Dashboard", icon: <FaTachometerAlt className="fs-2" /> },
        { label: "Courses", icon: <FaBook className="fs-2" /> },
        { label: "Calendar", icon: <FaRegCalendarAlt className="fs-2" /> },
    ];
    const { pathname } = useLocation();
    // Making the left navigation bar responsive 
    // collapse the left navigation bar when the screen is less than 768px
    return (
        <div>
            <ul className="wd-kanbas-navigation d-none d-md-block">
                <Link key={9} to='/Kanbas/Dashboard' className='list-group-item d-flex flex-column neu-icon'>
                    <img className="img-fluid" src={require("./NU_logo.png")} alt="NU Logo" />
                </Link>
                {links.map((link, index) => (
                    <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
                        <Link to={`/Kanbas/${link.label}`}> {link.icon} {link.label} </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default KanbasNavigation;