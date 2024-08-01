import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import {API_URL} from "../config";
import { Preloader } from "../components/Preloader";
import IfcaLinksImg from '../img/IfcaLinks.png';
import GfaiRechtsImg from '../img/GfaiRechts.png';
import "./Info.css";

function SchrankInfo(props) {
    const {handleSchrankInfoShow, rackId} = props;
    const nodeRef = React.useRef(null);

    const [htmlData, setHtmlData] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchSchrankInfo();
    }, []);

    const fetchSchrankInfo = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(API_URL + `info?type=Rack&id=${rackId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                const htmlData = await response.text();
                setHtmlData(htmlData);
            }
        } catch (error) {
            console.error("Error during fetchSchrankInfo:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Draggable nodeRef={nodeRef} cancel=".form-select">
            <div className="info" style={{ zIndex: "3" }} ref={nodeRef}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Schrankbestückung</h4>
                            <button type="button" className="btn-close" aria-label="Close" onClick={handleSchrankInfoShow}></button>
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

export {SchrankInfo}