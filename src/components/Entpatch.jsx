import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import {API_URL} from "../config";
import "./Entpatch.css";

function Entpatch(props) {
    const {handleEntpatchShow, mandatoryNeuVisualisieren} = props;
    const nodeRef = React.useRef(null);

    const [portName, setPortName] = useState('');
    const [poiId, setPoiId] = useState('');
    const [zielPortName, setZielPortName] = useState('');

    // useEffect(() => {
    //     window.onmessage = function(e){
    //         if(e.data.event === 'onclick') {
    //             const typeIdTitle = e.data;
    //             if (typeIdTitle.type === "PortInstance" && typeIdTitle.title.includes("Zielport")) {
    //                 let input = typeIdTitle.title;
    //                 let pattern = /^(.*?\n)/;
    //                 let match = input.match(pattern);
    //                 let result = match ? match[1] : input;
    //                 setPortName(result);
    //                 setPoiId(typeIdTitle.id);
    //             }
    //         }
    //     };
    // }, []);

    useEffect(() => {
        window.onmessage = function(e){
            if(e.data.event === 'onclick') {
                const typeId = e.data;
                if (typeId.type === "PortInstance") {
                    setPoiId(typeId.id);
                    fetchPortInfo(typeId.type, typeId.id);
                }
            }
        };
    }, []);

    const fetchPortInfo = async (instance, poiId) => {
        try {
            const res = await fetch(API_URL + `tooltip?type=${instance}&portId=${poiId}`);
            const data = await res.json();
            if (Object.keys(data).length > 0 && data.zielportName !== "") {
                setPortName(data.portName)
                setZielPortName(data.zielportName)
            }
        } catch (error) {
            console.error('Error while PortInfo:', error);
        }
    };

    const handleEntschaltenClick = async () => {
        try {
            if (poiId && zielPortName.length > 0) {
                const response = await fetch(API_URL + `EntschaltenServlet?type=PortInstance&portId=${poiId}`);
                mandatoryNeuVisualisieren();
                setPortName("");
                setPoiId("");
                setZielPortName("");
            }
        } catch (error) {
          console.error('Error while entpatching:', error);
        }
    };

    return (
        <Draggable nodeRef={nodeRef}>
            <div className="entpatch" ref={nodeRef}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Entpatchen</h4>
                            <button type="button" className="btn-close" aria-label="Close" onClick={handleEntpatchShow}></button>
                        </div>
                        <div className="modal-body p-2">
                            {/* <table className="table table-borderless m-0">
                                <tbody>
                                    <tr>
                                        <th className="p-0" scope="row">Vorn</th>
                                    </tr>
                                </tbody>
                            </table> */}
                            <table className="table table-borderless m-0">
                                <tbody>
                                    <tr>
                                        <th className="p-0" scope="row">Port</th>
                                        <td className="text-break p-0">{portName}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleEntschaltenClick}>Entpatchen</button>
                        </div>
                    </div>
                </div>
            </div>
        </Draggable>
    )
}

export {Entpatch}