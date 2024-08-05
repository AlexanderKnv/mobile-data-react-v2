import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import {API_URL} from "../config";
import MousePointerImg from '../img/mouse-pointer-2.png';
import "./Patch.css";

function Patch(props) {
    const {handlePatchShow, mandatoryNeuVisualisieren, aufschlagKabellänge} = props;
    const nodeRef = React.useRef(null);

    const [productList, setProductList] = useState([]);
    const [poiid1, setPoiid1] = useState('');
    const [poiid2, setPoiid2] = useState('');
    const [signalData1, setSignalData1] = useState({});
    const [signalData2, setSignalData2] = useState({});
    const [isSignalwegname, setIsSignalwegname] = useState(false);
    const [signalwegname, setSignalwegname] = useState('Signalwegname');
    const [signalwegChecked, setSignalwegChecked] = useState('');
    const [endknoten1Value, setEndknoten1Value] = useState({});
    const [endknoten2Value, setEndknoten2Value] = useState({});
    const [portName, setPortName] = useState('');
    const [portName2, setPortName2] = useState('');
    const [isPortName, setIsPortName] = useState(true);
    const [cableLength, setCableLength] = useState('');
    const [minCableLength, setMinCableLength] = useState('');
    const [selectedCableId, setSelectedCableId] = useState(null);
    const [cableName, setCableName] = useState(localStorage.getItem("cableName") || 'Kabelname');
    const [kkList, setKkList] = useState([]);
    const [isSignalDataLoading, setIsSignalDataLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageOk, setMessageOk] = useState("");
    const [isReadOnly, setIsReadOnly] = useState(false);
  
    // useEffect(() => {
    //     window.onmessage = function(e){
    //         if(e.data.event === 'onclick') {
    //             const typeIdTitle = e.data;
    //             if (typeIdTitle.type === "PortInstance" && !typeIdTitle.title.includes("Zielport")) {
    //                 let input = typeIdTitle.title;
    //                 let pattern = /^(.*?\n)/;
    //                 let match = input.match(pattern);
    //                 let result = match ? match[1] : input;
    //                 if (isPortName) {
    //                     setPortName(result);
    //                     setPoiid1(typeIdTitle.id);
    //                     if (poiid1 !== typeIdTitle.id) {
    //                         setEndknoten1Value({});
    //                         setSignalData1({});
    //                         if(signalwegChecked === signalData1.name) {
    //                             setSignalwegChecked("");
    //                             if(signalData2.name) setSignalwegChecked(signalData2.name);
    //                         }  
    //                     }
    //                 }
    //                 if (!isPortName) {
    //                     setPortName2(result);
    //                     setPoiid2(typeIdTitle.id);
    //                     if (poiid2 !== typeIdTitle.id) {
    //                         setEndknoten2Value({});
    //                         setSignalData2({});
    //                         if(signalwegChecked === signalData2.name) setSignalwegChecked("");
    //                     }
    //                 }
    //             }
    //         }
    //     };
    // }, [poiid1, poiid2, productList, isPortName]);

    useEffect(() => {
        window.onmessage = function(e){
            if(e.data.event === 'onclick') {
                const typeId = e.data;
                if (typeId.type === "PortInstance") {
                    fetchPortInfo(typeId.type, typeId.id);
                    if (isPortName && poiid1 !== typeId.id) {
                        setEndknoten1Value({});
                        setSignalData1({});
                        if(signalwegChecked === signalData1.name) {
                            setSignalwegChecked("");
                            if(signalData2.name) setSignalwegChecked(signalData2.name);
                        }
                    }
                    if (!isPortName && poiid2 !== typeId.id) {
                        setEndknoten2Value({});
                        setSignalData2({});
                        if(signalwegChecked === signalData2.name) setSignalwegChecked("");
                    }
                }
            }
        };
    }, [poiid1, poiid2, productList, isPortName]);

    const fetchPortInfo = async (instance, poiId) => {
        try {
            const res = await fetch(API_URL + `tooltip?type=${instance}&portId=${poiId}`);
            const data = await res.json();
            if (Object.keys(data).length > 0 && data.zielportName === "" && isPortName) {
                setPortName(data.portName)
                setPoiid1(poiId);
            }
            if (Object.keys(data).length > 0 && data.zielportName === "" && !isPortName && data.portName !== portName) {
                setPortName2(data.portName)
                setPoiid2(poiId);
            }
        } catch (error) {
            console.error('Error while PortInfo:', error);
        }
    };

    useEffect(() => {
        fetchKabelData();
        fetchEndpunkte();
    }, [poiid1, poiid2]);

    useEffect(() => {
        if (!isSignalDataLoading && portName !== '' && portName2 !== '' && Object.keys(signalData1).length === 0 && Object.keys(signalData2).length === 0) {   
            setIsSignalwegname(true);
            setSignalwegChecked(signalwegname)
        } else {
            setIsSignalwegname(false);
        }
        if(portName && !portName2) setIsPortName(false);
    }, [portName, portName2, isSignalDataLoading, signalData1, signalData2, signalwegname]);

    const fetchEndpunkte = async () => {
        try {
            setIsSignalDataLoading(true);
            if (poiid1 && isPortName) {
                const response = await fetch(API_URL + `endpunkte?type=PortInstance&portId=${poiid1}`);
                const endKnotenData = await response.json();
                if (Object.keys(endKnotenData).length > 0) {
                    setEndknoten1Value(endKnotenData);
                    if (endKnotenData.id) {
                        const response1 = await fetch(API_URL + `signalpath?type=PortInstance&id=${endKnotenData.id}`);
                        const data1 = await response1.json();
                        const [SData1] = data1;
                        setSignalData1(SData1);
                        setSignalwegChecked(SData1.name);
                    }
                } else {
                    setEndknoten1Value({});
                } 
            }
            if (poiid2 && !isPortName) {
                const response = await fetch(API_URL + `endpunkte?type=PortInstance&portId=${poiid2}`);
                const endKnotenData = await response.json();
                if (Object.keys(endKnotenData).length > 0) {
                    setEndknoten2Value(endKnotenData);
                    if (endKnotenData.id) {
                        const response2 = await fetch(API_URL + `signalpath?type=PortInstance&id=${endKnotenData.id}`);
                        const data2 = await response2.json();
                        const [SData2] = data2;
                        setSignalData2(SData2);
                        if (!signalData1.name) setSignalwegChecked(SData2.name);
                    }
                } else {
                    setEndknoten2Value({});
                } 
            }
        } catch (error) {
            // console.error("Fehler beim Abrufen der Informationen:", error);
        } finally {
            setIsSignalDataLoading(false);
        }
    };

    const fetchKabelData = async () => {
        try {
            if (poiid1 && poiid2) {
                const responseCableLength = await fetch(API_URL + `importcable?poiid1=${poiid1}&poiid2=${poiid2}`);
                const cableLengthData = await responseCableLength.json();
                const calculatedCableLength = cableLengthData.cablelength;
                // const roundedCableLength = parseFloat(calculatedCableLength).toFixed(2);
                const roundedCableLengthWithAufschlag = (parseFloat(calculatedCableLength) + parseFloat(aufschlagKabellänge)).toFixed(2);
                setCableLength(roundedCableLengthWithAufschlag);
                setMinCableLength(roundedCableLengthWithAufschlag);
    
                const responseCableData = await fetch(API_URL + `importcable?poiid1=${poiid1}&poiid2=${poiid2}&cablelength=${roundedCableLengthWithAufschlag}`);
                const cableData = await responseCableData.json();
    
                const kkList = JSON.parse(cableData.kkList || '[]');
                const updatedProductList = kkList.map((product, index) => product.classNames);
                setKkList(kkList);
                if (kkList.length > 0) {
                    setSelectedCableId(kkList[0].id);
                } else {
                    setSelectedCableId(null);
                    setCableLength("");
                }
                if (JSON.stringify(updatedProductList) !== JSON.stringify(productList)) {
                    setProductList(updatedProductList);
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleCableChange = (e) => {
        const selectedCableName = e.target.value;
        const regex = /\[(\d+)m\]/;
        const match = selectedCableName.match(regex);
        if(match) {
            setCableLength(match[1]);
            setIsReadOnly(true);
        } else {
            setCableLength(minCableLength);
            setIsReadOnly(false);
        }
        const selectedCable = kkList.find(product => product.classNames === selectedCableName);
        if (selectedCable) {
            setSelectedCableId(selectedCable.id);
        }
    };

    const handlePatchenClick = async () => {
        try {
            if (poiid1 && poiid2 && selectedCableId) {
                console.log(cableName);
                setMessage(" ");
                setMessageOk(" ");
                const response = await fetch(API_URL + `importcable?poiid1=${poiid1}&poiid2=${poiid2}&ktidcable=${selectedCableId}&cablename=${cableName}&signalwegname=${signalwegChecked}&aufschlagKabellänge=${aufschlagKabellänge}`, {
                    method: 'POST',
                });
                const result = await response.json();
                setPoiid1("");
                setPoiid2("");
                setPortName("");
                setPortName2("");
                setSignalData1([]);
                setSignalData2([]);
                setEndknoten1Value({});
                setEndknoten2Value({});
                setProductList([]);
                setCableLength("");
                setCableName(incrementCableName(localStorage.getItem("cableName")));
                setSelectedCableId(null);
                setKkList([]);
                setIsPortName(true);
                setSignalwegChecked("");
                mandatoryNeuVisualisieren();
                console.log('Patchen response:', result);
            }
        } catch (error) {
            console.error('Error while patching:', error);
        }
    };

    const handlePort1MouseClick = () => {
        setIsPortName(true); 
    };
    const handlePort2MouseClick = () => {
        setIsPortName(false); 
    };
    const handleCableLengthInput = (value) => {
        if (/^\d*\.?\d*$/.test(value)) {
            setCableLength(value);
        }
    };
    const handleBlur = () => {
        if (cableLength < minCableLength) {
            setCableLength(minCableLength);
            setMessage("Mindestkabellänge darf nicht unterschritten werden. ");
            setMessageOk("Wert zurückgesetzt");
        } else {
            setMessage("");
            setMessageOk("");
        }
    };
    const handleCableNameInput = (value) => {
        const regex = /(\d+)$/;
        const match = value.match(regex);
        if (match) {
            localStorage.setItem('cableName', value);
        } else {
            localStorage.setItem('cableName', 'Kabelname');
        }
        setCableName(value);
    };
    const incrementCableName = (value) => {
        if (value) {
            const regex = /^(.*?)(\d+)$/;
            const match = value.match(regex);
            if (match) {
                const textPart = match[1];
                const numberPart = match[2];
                const incrementedNumber = (parseInt(numberPart, 10) + 1).toString();
                const incrementedNumberWithLeadingZeros = incrementedNumber.padStart(numberPart.length, '0');
                const recommendedCableName = textPart + incrementedNumberWithLeadingZeros;
                localStorage.setItem('cableName', recommendedCableName);
                return recommendedCableName;
            }
        }
    };

    return (
        <Draggable nodeRef={nodeRef} cancel=".form-select, .form-control">
            <div className="patch" ref={nodeRef}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Patchen</h4>
                            <button type="button" className="btn-close" aria-label="Close" onClick={handlePatchShow}></button>
                        </div>
                        <div className="modal-body borderCast p-2">
                            <table className="table table-borderless m-0">
                                <tbody>
                                    <tr>
                                        <th className={`p-0 portOnFocus`} scope="row" style={{ width: "120px", color: isPortName ? "#4caf50" : "" }} onClick={handlePort1MouseClick}>Port
                                        <img src={MousePointerImg} className="img-fluid float-center" alt="..." style={{ width: "20px", marginLeft: "15px" }}/></th>
                                        <td className="p-0">{portName}</td>
                                    </tr>
                                    <tr>
                                        <th className="p-0" scope="row" style={poiid1 && !signalData1.name ? { color: "gray" } : null}>Signalweg
                                        <input className="form-check-input" style={{ marginLeft: "10px" }} type="radio" name="signalwegChecked" id="flexRadioDefault1" value={signalData1.name}  disabled={isSignalwegname || !signalData1.name} checked={signalData1.name && signalwegChecked ===signalData1.name} onChange={(e) => setSignalwegChecked(e.target.value)}/></th>
                                        <td className="p-0">{signalData1.name || ""}</td>
                                    </tr>
                                    <tr>
                                        <th className="p-0" scope="row" style={poiid1 && !signalData1.name ? { color: "gray" } : null}>Endknoten</th>
                                        <td className="p-0">{endknoten1Value.name || ""}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-body borderCast p-2">
                            <table className="table table-borderless m-0">
                                <tbody>
                                    <tr>
                                        <th className={`p-0 portOnFocus`} scope="row" style={{ width: "120px", color: !isPortName ? "#4caf50" : "" }} onClick={handlePort2MouseClick}>Port
                                        <img src={MousePointerImg} className="img-fluid float-center" alt="..." style={{ width: "20px", marginLeft: "15px" }}/></th>
                                        <td className="p-0">{portName2}</td>
                                    </tr>
                                    <tr>
                                        <th className="p-0" scope="row" style={poiid2 && !signalData2.name ? { color: "gray" } : null}>Signalweg
                                        <input className="form-check-input" style={{ marginLeft: "10px" }} type="radio" name="signalwegChecked" id="flexRadioDefault1" value={signalData2.name}  disabled={isSignalwegname || !signalData2.name} checked={signalwegChecked ===signalData2.name} onChange={(e) => setSignalwegChecked(e.target.value)}/></th>
                                        <td className="p-0">{signalData2.name || ""}</td>
                                    </tr>
                                    <tr>
                                        <th className="p-0" scope="row" style={poiid2 && !signalData2.name ? { color: "gray" } : null}>Endknoten</th>
                                        <td className="p-0">{endknoten2Value.name || ""}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {isSignalwegname && (
                            <div className="modal-body borderCast p-2">
                                <table className="table table-borderless m-0">
                                    <tbody>
                                        <tr>
                                            <th className="p-0" scope="row" style={{ width: "130px" }}>Signalweg
                                            <input className="form-check-input" style={{ marginLeft: "10px" }} type="radio" name="signalwegChecked" id="flexRadioDefault1" value={signalwegname} checked={signalwegname} onChange={(e) => setSignalwegChecked(e.target.value)}/></th>
                                            <td className="p-0"><input type="text" className="form-control form-control-sm" value={signalwegname} onChange={(e) => setSignalwegname(e.target.value)}/></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                        <div className="modal-body p-2">
                            <table className="table table-borderless m-0">
                                <tbody>
                                    <tr>
                                        <th className="p-0" scope="row" style={{ width: "130px" }}>Kabeltyp</th>
                                        <td className="p-0 pb-1">
                                            <select className="form-select form-select-sm" onChange={(e) => {handleCableChange(e)}}>
                                                {/* <option>Bitte wählen Sie ein Kabel</option> */}
                                                {(Array.isArray(productList) ? productList : []).map((product, index) => (<option key={index}>{product}</option>))}
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="p-0" scope="row">Kabellänge &#91;m&#93;</th>
                                        <td className="p-0 pb-1"><input type="text" className="form-control form-control-sm" readOnly={isReadOnly} value={cableLength} onChange={(e) => handleCableLengthInput(e.target.value)} onBlur={handleBlur}/> <span style={{ color: 'red', fontSize: "14px" }}>{message}</span> <span style={{ color: 'green', fontSize: "14px" }}>{messageOk}</span></td>
                                    </tr>
                                    <tr>
                                        <th className="p-0" scope="row">Kabelname</th>
                                        <td className="p-0"><input type="text" className="form-control form-control-sm" value={cableName} onChange={(e) => handleCableNameInput(e.target.value)}/></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handlePatchenClick}>Patchen</button>
                        </div>
                    </div>
                </div>
            </div>
        </Draggable>
    )
}

export {Patch}