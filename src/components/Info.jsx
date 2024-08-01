import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { Preloader } from "../components/Preloader";
import {API_URL} from "../config";
import IfcaLinksImg from '../img/IfcaLinks.png';
import GfaiRechtsImg from '../img/GfaiRechts.png';
import "./Info.css";

function Info(props) {
    const {handleInfoShow} = props;
    const nodeRef = React.useRef(null);

    const [htmlData, setHtmlData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [objectType, setObjectType] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        window.onmessage = function(e) {
            if(e.data.event === 'onclick') {
                const typeId = e.data;
                setObjectType(typeId.type);
                setId(typeId.id);
            }
        };
    }, []);

    useEffect(() => {
        if(objectType && id) fetchInfo();
    }, [objectType, id]);

    const fetchInfo = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(API_URL + `info?type=${objectType}&id=${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                const htmlData = await response.text();
                setHtmlData(htmlData);
            }
        } catch (error) {
            console.error("Error during fetchInfo:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Draggable nodeRef={nodeRef} cancel=".form-select">
            <div className="info" ref={nodeRef}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            {!htmlData && <h4>Wählen Sie bitte ein Objekt</h4>}
                            {htmlData && <h4 className="modal-title">Objektinformationen</h4>}
                            <button type="button" className="btn-close" aria-label="Close" onClick={handleInfoShow}></button>
                        </div>
                        <div className="modal-body position-relative" style={{ overflow: "hidden"}}>
                            {isLoading ? <Preloader /> : <div dangerouslySetInnerHTML={{ __html: htmlData }} style={{ maxHeight: `calc(100vh - 200px)`, transform: "translate(-2%, 5%) scale(1.2)", overflowY: "auto"}}></div>}
                            {!isLoading && htmlData &&
                            <img src={GfaiRechtsImg} className="rounded float-end position-absolute" alt="..." style={{ left: "80%", top: "0%", width: "100px"}} />}
                            {!isLoading && htmlData &&
                            <img src={IfcaLinksImg} className="rounded float-end position-absolute" alt="..." style={{ left: "2%", top: "0%", width: "150px"}} />}
                        </div>
                    </div>
                </div>
            </div>
        </Draggable>
    )
}

export {Info}