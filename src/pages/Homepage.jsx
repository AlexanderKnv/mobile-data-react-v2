import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {useAuth} from '../hook/useAuth';
import ObjectsList from '../components/ObjectsList';
import Notebook from '../img/notebook.png';
import HeaderImg from '../img/header_5-1.jpg';
import NetzImg from '../img/layout-circle-bottom.svg';
import "./Homepage.css";

const Homepage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {signout} = useAuth();
    const [objectType, setObjectType] = useState("Rack");
    
    const handleObjectSelect = (item) => {
        navigate('/svgPage', {
            replace: false,
            state: {
                item,
                plvId: location.state.plvId,
                rechte: location.state.rechte,
                proId: location.state.proId,
                password: location.state.password,
                selectedDB: location.state.selectedDB
            }
        });
    };

    return (
        <div className="container-fluid loginCast">
            <div className="d-flex bg-warning position-relative" style={{ maxHeight: "35vh" }}>
                <img src={HeaderImg} className="img-fluid opacity-25" alt="..."/>
                <button className="btn btn-dark text-warning position-absolute" type="button" style={{ right: "40px", top: "40px", zIndex: "3"}} onClick={() => signout(() => navigate('/', {replace: true}))}>Abmelden</button>
            </div>
            {/* <div className="card border border-warning p-3 mb-2 mt-2">
                <div className="row float-start align-items-center">
                    <div className="col-auto" style={{ paddingRight: "0" }}>
                        <img src={Logo} className="img-fluid rounded float-start" style={{ width: "70px" }} alt="..." />
                    </div>
                    <div className="col-auto bottom ">
                        <h2 style={{ marginTop: "10px", fontSize: "36px" }}>InfoCABLE mobiler Client</h2>
                    </div>
                    <div className="col">
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button className="btn btn-warning text-dark" type="button" onClick={() => signout(() => navigate('/', {replace: true}))}>Abmelden</button>
                        </div> 
                    </div>
                </div>
            </div> */}
            <div className="container position-relative">
                <div className="card border border-warning m-1 position-absolute start-0" style={{ width: "620px", maxHeight: `calc(100vh - 340px)`, zIndex: "2" }}>
                    <div className="card-body" style={{ padding: "0" }}>
                        <ObjectsList plvId={location.state.plvId} objectType={objectType} setObjectType={setObjectType} onObjectSelect={handleObjectSelect} />
                    </div>
                </div>
                <h1 className="text-dark float-end position-absolute" style={{ bottom: "210px", zIndex: "3"}}>InfoCABLE mobiler Client</h1>
                <img src={Notebook} className="rounded float-end position-absolute translate-middle" alt="..." style={{ left: "72%", maxWidth: "600px", zIndex: "1"}} />
                <img src={NetzImg} className="rounded float-end position-absolute translate-middle" alt="..." style={{ left: "75%", width: "650px"}} />
                {/* <img src={LogoImg} className="float-end position-absolute" style={{ left: "50%", bottom: "65%", width: "200px"}} alt="..." /> */}
            </div>
        </div>
    )
}

export {Homepage};