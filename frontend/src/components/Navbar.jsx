import { Link } from "react-router-dom";


const NavBar = () => {
    return (
        <nav>
            <h1>Verify Influencers</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar;