import React from "react";
import Draggable from "react-draggable";
import "./Setting.css";

function Setting(props) {
    const {handleSettingShow, 
        handlePpvVisibilityChange, 
        handleInstanceTextObjectChange,
        handleInstanceTextPortChange,
        handleFreeTextObjectChange,
        handleFreeTextPortChange,
        handleRuleTextObjectChange,
        handleRuleTextPortChange,
        isPpvVisibility, 
        isInstanceTextObject,
        isInstanceTextPort,
        isFreeTextObject,
        isFreeTextPort,
        isRuleTextObject,
        isRuleTextPort,
        neuVisualisieren,
        aufschlagKabellänge,
        handleAufschlagKabellängeChange
    } = props;
    const nodeRef = React.useRef(null);

    return (
        <Draggable nodeRef={nodeRef} cancel=".form-control">
            <div className="setting" style={{ zIndex: "3" }} ref={nodeRef}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Optionen</h4>
                            <button type="button" className="btn-close" aria-label="Close" onClick={handleSettingShow}></button>
                        </div>
                        <div className="modal-body borderCast" style={{ paddingTop: "8px", paddingBottom: "0" }}>

                            <div className="d-flex justify-content-between">
                                <div className="form-check d-flex flex-column" style={{ paddingLeft: "0" }}>
                                    <p style={{ marginTop: "25px", marginBottom: "0" }}>Instanztexte</p>
                                    <p style={{ marginBottom: "0" }}>Freitexte</p>
                                    <p>Regelbeschriftung</p>
                                </div>
                                <div className="form-check d-flex flex-column align-items-center">
                                    <label className="form-check-label">Objekte</label>
                                    <input className="form-check-input mt-2" style={{ marginLeft: "0" }} type="checkbox" id="checkboxId" checked={isInstanceTextObject} onChange={handleInstanceTextObjectChange}/>
                                    <input className="form-check-input mt-2" style={{ marginLeft: "0" }} type="checkbox" id="checkboxId" checked={isFreeTextObject} onChange={handleFreeTextObjectChange}/>
                                    <input className="form-check-input mt-2" style={{ marginLeft: "0" }} type="checkbox" id="checkboxId" checked={isRuleTextObject} onChange={handleRuleTextObjectChange}/>
                                </div>
                                <div className="form-check d-flex flex-column align-items-center">
                                    <label className="form-check-label">Ports</label>
                                    <input className="form-check-input mt-2" style={{ marginLeft: "0" }} type="checkbox" id="checkboxId" checked={isInstanceTextPort} onChange={handleInstanceTextPortChange}/>
                                    <input className="form-check-input mt-2" style={{ marginLeft: "0" }} type="checkbox" id="checkboxId" checked={isFreeTextPort} onChange={handleFreeTextPortChange}/>
                                    <input className="form-check-input mt-2" style={{ marginLeft: "0" }} type="checkbox" id="checkboxId" checked={isRuleTextPort} onChange={handleRuleTextPortChange}/>
                                </div>
                            </div>

                            {/* <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" id="freeTextObject" checked={isFreeTextObject} onChange={handleFreeTextObjectChange}/>
                                <label className="form-check-label" htmlFor="freeTextObject">Freitexte für Object</label>
                            </div>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" id="ruleTextObject" checked={isRuleTextObject} onChange={handleRuleTextObjectChange}/>
                                <label className="form-check-label" htmlFor="ruleTextObject">Regelbeschriftung für Object</label>
                            </div>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" id="ruleTextPort" checked={isRuleTextPort} onChange={handleRuleTextPortChange}/>
                                <label className="form-check-label" htmlFor="ruleTextPort">Regelbeschriftung für Port</label>
                            </div> */}

                        </div>
                        <div className="modal-body borderCast">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <p>Patches</p>
                                </div>
                                <div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="1" checked={isPpvVisibility === '1'} 
                                        onChange={(e) => handlePpvVisibilityChange(e.target.value)}/>
                                        <label className="form-check-label">Keine</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="2" checked={isPpvVisibility === '2'} 
                                        onChange={(e) => handlePpvVisibilityChange(e.target.value)}/>
                                        <label className="form-check-label">Am Mauszeiger</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="3" checked={isPpvVisibility === '3'} 
                                        onChange={(e) => handlePpvVisibilityChange(e.target.value)}/>
                                        <label className="form-check-label">Alle</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-body" style={{ paddingBottom: "8px" }}>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <p style={{ whiteSpace: "nowrap" }}>Aufschlag Kabellänge &#91;m&#93;</p>
                                </div>
                                <div>
                                    <div className="form-check">
                                        <input type="text" className="form-control form-control-sm" value={aufschlagKabellänge} onChange={(e) => handleAufschlagKabellängeChange(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleSettingShow}>Schließen</button> */}
                            <button type="button" className="btn btn-primary" onClick={neuVisualisieren}>Neu Visualisieren</button>
                        </div>
                    </div>
                </div>
            </div>
        </Draggable>
    )
}

export {Setting}