import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import {API_URL} from "../config";
import Logo from '../img/logo_infocable.png';
import Notebook from '../img/notebook.png';
import HeaderImg from '../img/header_5-1.jpg';
import NetzImg from '../img/layout-circle-bottom.svg';
import LogoImg from '../img/logo-infocable.png';
import "./Loginpage.css";

const Loginpage = () => {
    const [username, setUsername] = useState(localStorage.getItem('username') || "");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [projects, setProjects] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const [selectedProId, setSelectedProId] = useState("");
    const [selectedRechte, setSelectedRechte] = useState("");
    const [messageProject, setMessageProject] = useState("");
    const [isAuthOk, setIsAuthOk] = useState(false);
    const [databases, setDatabases] = useState([]);
    const [selectedDB, setSelectedDB] = useState("");
    const location = useLocation();
    const { signin } = useAuth();
    const { signout } = useAuth();

    const navigate = useNavigate();

    const fromPage = location.state?.from?.pathname || "/";

    useEffect(() => {
        fetchDatabases();
        // const authUser = localStorage.getItem("authUser");
        // if (authUser) {
        //     signin(authUser, () => navigate(fromPage, { replace: true }));
        // }
    }, []);

    const authUser = async () => {
        try {
            const response = await fetch(API_URL + `connect?dbName=${selectedDB}&proId=${selectedProId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Basic " + btoa(`${username}:${password}`),
                    },
            });
            if (response.ok) {
                setIsAuthOk(true);
                setMessage("Authentication successful");
                fetchProjects();
                // signin(username, () => navigate(fromPage, { replace: true }));
            } else {
                setMessage("Authentication failed");
            }
        } catch (error) {
            console.error("Error during authentication:", error);
            setMessage("An error occurred during authentication");
        }
    };
    

    const fetchProjects = async () => {
        try {
            const response = await fetch(API_URL + `gettype?type=Project&username=${username}`);
            const data = await response.json();
            if (data.length > 0) {
                setProjects(data);
                setSelectedProjectId(data[0].id);
                setSelectedProId(data[0].proId);
                setSelectedRechte(data[0].rechte);
            } else {
                setMessageProject(`Nutzer ${username} ist in keinem Projekt ein Projektmitglied`);
            }
        } catch (error) {
            console.error("Error during fetchProjects:", error);
            setMessageProject("An error occurred during Projects fetching");
        }
    };

    const fetchDatabases = async () => {
        try {
            const response = await fetch(API_URL + `database`);
            const data = await response.json();
            if (data.length > 0) {
                setDatabases(data);
                setSelectedDB(data[0]);
            } else {
                setMessageProject("No available Databases");
            }
        } catch (error) {
            console.error("Error during fetchDatabases:", error);
            setMessageProject("An error occurred during Databases fetching");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        authUser(username, password);
    };
    const handleSubmitProject = (event) => {
        event.preventDefault();
        authUser();
        setTimeout(() => {
            signin(username, () => navigate(fromPage, { replace: true, state: {plvId: selectedProjectId, rechte: selectedRechte, proId: selectedProId, password: password, selectedDB: selectedDB} }));
        }, 1000);
    };
    const handleSelectChange = (e) => {
        const selectedId = e.target.value;
        const selectedProId = e.target.options[e.target.selectedIndex].getAttribute('data-proid');
        const selectedRechte = e.target.options[e.target.selectedIndex].getAttribute('data-rechte');
        setSelectedProjectId(selectedId);
        setSelectedProId(selectedProId);
        setSelectedRechte(selectedRechte);
    };

    return (
        <div className="container-fluid loginCast">
            <div className="d-flex bg-warning" style={{ maxHeight: "35vh" }}>
                <img src={HeaderImg} className="img-fluid opacity-25" alt="..."/>
                {isAuthOk && <button className="btn btn-dark text-warning position-absolute" type="button" style={{ right: "40px", top: "40px", zIndex: "3"}} onClick={() => signout(() => navigate('/', {replace: true}))}>Abmelden</button>}
            </div>
            <div className="container position-relative">
                <div className="card-body position-absolute start-0 login" style={{ width: "500px", zIndex: "2" }}>
                    <div className="card border border-warning p-3 m-2" style={{ width: "100%" }}>
                        <div className="row float-start">
                            <div className="col-auto" style={{ paddingRight: "0" }}>
                                <img src={Logo} className="img-fluid rounded float-start" style={{ width: "70px" }} alt="..." />
                            </div>
                            <div className="col bottom" style={{ paddingLeft: "10px" }}>
                                {isAuthOk ? (<h2 className="fromRight" style={{ marginTop: "10px", fontSize: "36px" }}>Projekt</h2>) : (<h2 style={{ marginTop: "10px", fontSize: "36px" }}>Login</h2>)}
                            </div>
                        </div>
                    </div>

                    {/* <img src={LogoImg} className="pb-3" style={{ width: "200px"}} alt="..." />
                    <h1 className="text-left" style={{ maxWidth: "500px", width: "100%" }}>Mobile Client</h1> */}
                    {!isAuthOk &&
                        <div className="card border border-warning p-3 fadIn" style={{ width: "100%" }}>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-2" >
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control border border-warning focus-ring focus-ring-warning py-1 px-2 text-decoration-none border rounded-2" value={username} onChange={(e) => { setUsername(e.target.value); localStorage.setItem('username', e.target.value); }}/>
                                </div>
                                <div className="mb-3" >
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control border border-warning focus-ring focus-ring-warning py-1 px-2 text-decoration-none border rounded-2" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <div className="mb-2" >
                                    <label htmlFor="form-select" className="form-label">Datenquelle</label>
                                    <select className="form-select" onChange={(e) => setSelectedDB(e.target.value)} defaultValue={databases.length > 0 ? databases[0] : ""}>
                                            {(Array.isArray(databases) ? databases : []).map((item, index) => (
                                                <option key={index} value={item}>{item}</option>
                                            ))}
                                    </select>
                                </div>
                                <p>{message}</p>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-warning btn-lg text-black mt-2" disabled={isAuthOk}>Anmelden</button>
                                </div>
                                {/* <div className={`d-grid gap-2 ${isAuthOk ? 'slideOut' : ''}`}>
                                    <button type="submit" className="btn btn-warning btn-lg text-black mt-2">Anmelden</button>
                                </div> */}
                            </form>
                        </div>}
                    
                    {isAuthOk &&
                        <div className="card border border-warning p-3 fadIn" style={{ maxWidth: "500px", width: "100%" }}>
                            <form onSubmit={handleSubmitProject}>
                                <div className="mb-2" >
                                    <label className="form-label">Projektauswahl</label>
                                    <select className="form-select" onChange={handleSelectChange}>
                                        {(Array.isArray(projects) ? projects : []).map(item => (
                                            <option key={item.id} value={item.id} data-proid={item.proId} data-rechte={item.rechte}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <p>{messageProject}</p>
                                <div className="d-grid gap-2">
                                    {messageProject ? (<button className="btn btn-warning btn-lg text-black mt-2" type="button" onClick={() => signout(() => navigate('/', {replace: true}))}>Zurück</button>) 
                                    : 
                                    (<button type="submit" className="btn btn-warning btn-lg text-black mt-2">Öffnen</button>)}
                                </div>
                            </form>
                        </div>} 
                </div>
                <h1 className="text-dark float-end position-absolute" style={{ bottom: "210px", zIndex: "3"}}>InfoCABLE mobiler Client</h1>
                <img src={Notebook} className="rounded float-end position-absolute translate-middle " alt="..." style={{ left: "72%", maxWidth: "600px", zIndex: "1"}} />
                <img src={NetzImg} className="rounded float-end position-absolute translate-middle" alt="..." style={{ left: "75%", width: "650px"}} />
                {/* <img src={LogoImg} className="float-end position-absolute" style={{ left: "50%", bottom: "22%", width: "200px"}} alt="..." /> */}
            </div>
        </div>
    );
};

export { Loginpage };