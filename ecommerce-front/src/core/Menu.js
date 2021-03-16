import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900"};
    } else {
        return { color: "#ffffff"};
    }
};

const Menu = ({ history }) => (
    <div>
        <div className="w3-bar" style={{background:"black", color:"white"}}>
            <Link style={isActive(history, "/")} to="/" className="w3-bar-item w3-button ">Casa</Link>
            <Link style={isActive(history, "/shop")} to="/shop" className="w3-bar-item w3-button">ricerca</Link>

            {!isAuthenticated() && (
                <Fragment>
                    <Link style={isActive(history, "/signin")} to="/signin" className="w3-bar-item w3-button w3-right">
                        <i className='fas fa-user-circle' style={{fontSize:'20px'}}> Registrati</i></Link>
                    <Link style={{background:"green"}} to="/create/product" className="w3-bar-item w3-button w3-right advertise">nuova inserzione</Link>
                </Fragment>
            )}
            {isAuthenticated() && (
                <Fragment>
                    <Link style={{background:"green"}} to="/create/product" className="w3-bar-item w3-button w3-right advertise">Nuovo annuncio</Link>
                    <div className="w3-dropdown-hover w3-right">
                        <button className="w3-button user">{isAuthenticated().user.name}</button>
                        <div className="w3-dropdown-content w3-bar-block w3-card-4">
                            <Link to={`/admin/products/${isAuthenticated().user._id}`} className="w3-bar-item w3-button">aggiorna il profilo</Link>
                            <Link to={`/profile/${isAuthenticated().user._id}`} className="w3-bar-item w3-button">Update Profile</Link>
                            <Link className="w3-bar-item w3-button">
                                <i className='fas fa-user-circle'
                                   onClick={() => signout(() => {history.push("/"); })} style={{fontSize:'20px',color:"black"}}>disconnessione</i></Link>
                        </div>
                    </div>
                </Fragment>
            )}
        </div>

    </div>
);

export default withRouter(Menu);
