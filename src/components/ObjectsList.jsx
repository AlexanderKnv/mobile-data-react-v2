import React, { useState, useEffect } from 'react';
import { Preloader } from "../components/Preloader";
import {API_URL} from "../config";
import "./Search.css";

const ObjectsList = ({ plvId, objectType, setObjectType, onObjectSelect }) => {
    const [filterValue, setFilterValue] = useState("");
    const [objectNames, setObjectNames] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredObjectNames, setFilteredObjectNames] = useState([]);

    useEffect(() => {
        fetchObjectNames();
    }, [objectType, plvId]);

    useEffect(() => {
        handleSearch(filterValue);
    }, [filterValue]);

    const fetchObjectNames = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(API_URL + `gettype?type=${objectType}&plvId=${plvId}`);
            const data = await response.json();
            const result = Object.keys(data).flatMap(key => {
                return data[key].map(item => ({
                    ...item,
                    zone: key
                }));
            });
            const uniqueSortedResult = result
                .filter((item, index, array) => array.findIndex(obj => obj.value === item.value) === index)
                .sort((a, b) => a.label.localeCompare(b.label));
            setObjectNames(uniqueSortedResult);
            setFilteredObjectNames(uniqueSortedResult);
        } catch (error) {
            console.error("Error during fetchObjectName:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (filterValue) => {
        if (filterValue.includes('*') || filterValue.includes('?')) {
            const regexPattern = filterValue
              .split('*').join('.*')
              .split('?').join('.');
            const regex = new RegExp(`${regexPattern}`, 'i');
            setFilteredObjectNames(objectNames.filter((item) => regex.test(item.label)));
        } else {
            setFilteredObjectNames(objectNames.filter((item) => item.label.toLowerCase().startsWith(filterValue.toLowerCase())));
        }
    };

    return (
        <div>
            <nav className="navbar bg-secondary-subtle">
                <div className="container-fluid">
                    <form className="d-flex">
                        <select className="form-select" value={objectType} onChange={(e) => setObjectType(e.target.value)}>
                            <option value="Rack">Schrank</option>
                            <option value="Instanz">Instanz</option>
                            <option value="Signalweg">Signalweg</option>
                        </select>
                    </form>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setFilterValue(e.target.value)}/>
                    </form>
                </div>
            </nav>
            <div className="list-group" style={{ overflowY: "auto", maxHeight: `calc(100vh - 398px)` }}>
                <ul className="list-group list-group-horizontal fw-bold">
                    <li className="list-group-item" style={{ width: "50%", borderRadius: "0" }}>Schrankname</li>
                    <li className="list-group-item" style={{ width: "50%", borderRadius: "0" }}>Gebäude/Etage/Raum</li>
                </ul>
                {filteredObjectNames.map(item => (
                    <div className="list-group list-group-horizontal onFocus" onClick={() => onObjectSelect(item)} key={item.value}>
                        <li className="list-group-item text-break" style={{ width: "50%", borderRadius: "0" }}>{item.label}</li>
                        <li className="list-group-item text-break" style={{ width: "50%", borderRadius: "0" }}>{item.zone}</li>
                    </div>
                ))}
                {isLoading && <Preloader />}
            </div>
        </div>
    );
};

export default ObjectsList;