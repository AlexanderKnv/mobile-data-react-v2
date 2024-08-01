import React, { useState } from "react";
import Draggable from "react-draggable";
import ObjectsList from '../components/ObjectsList';
import "./Search.css";

function Search(props) {
    const {handleSearchShow, handleRackIdChange, plvId} = props;
    const nodeRef = React.useRef(null);
    const [objectType, setObjectType] = useState("Rack");

    const handleObjectSelect = (item) => {
        handleRackIdChange(item.value);
    };

    return (
        <Draggable nodeRef={nodeRef} cancel=".form-control">
            <div className="search" style={{ zIndex: "3" }} ref={nodeRef}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Schrankauswahl/Suche</h4>
                            <button type="button" className="btn-close" aria-label="Close" onClick={handleSearchShow}></button>
                        </div>
                        <div className="modal-body p-2">
                            <ObjectsList plvId={plvId} objectType={objectType} setObjectType={setObjectType} onObjectSelect={handleObjectSelect} />
                        </div>
                    </div>
                </div>
            </div>
        </Draggable>
    )
}

export {Search}