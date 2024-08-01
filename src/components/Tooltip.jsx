import React, { useEffect, useState } from 'react';
import {API_URL} from "../config";

function Tooltip(props) {
    const {isEntpatchOpen, isInfoOpen, isPatchOpen} = props;

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [showDiv, setShowDiv] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const [poiId, setPoiId] = useState('');
    const [instance, setInstance] = useState('');
    const [portName, setPortName] = useState('');
    const [katalogname, setKatalogname] = useState('');
    const [zielPortName, setZielPortName] = useState('');
    const [ppv, setPpv] = useState({});
    const [instanceInfo, setInstanceInfo] = useState({});

    const fetchTooltipInfo = async () => {
        try {
            const res = await fetch(API_URL + `tooltip?type=${instance}&portId=${poiId}`);
            const data = await res.json();
            if (instance === 'PortInstance') {
                setPortName(data.portName)
                setZielPortName(data.zielportName)
                setKatalogname(data.katalogname)
            }
            if (instance === 'Ppv') {
                setPpv(data)
            }
            if (instance === 'Instance') {
                setInstanceInfo(data)
            }
        } catch (error) {
            console.error('Error while tooltip:', error);
        }
    }

    useEffect(() => {
        if(!isEntpatchOpen && !isInfoOpen && !isPatchOpen) {
            window.onmessage = function(ev){
                if(ev.data.event === 'onmouseover') {
                    const typeIdTitle = ev.data;
                    let mouseX = typeIdTitle.x + 10;
                    let mouseY = typeIdTitle.y + 20;
                    setPosition({ x: mouseX, y: mouseY });
            
                    if (timeoutId) clearTimeout(timeoutId);
                    const newTimeoutId = setTimeout(() => {
                    setPoiId(typeIdTitle.id);
                    setInstance(typeIdTitle.type);
                    setShowDiv(true);
                    }, 1000);
                    setTimeoutId(newTimeoutId);
                }
                if(ev.data.event === 'onmouseout') {
                    clearTimeout(timeoutId);
                    setShowDiv(false);
                    setPoiId('');
                    setInstance('');
                }
            };
            if(poiId && instance) {
                if(instance === 'PortInstance' || instance === 'Ppv' || instance === 'Instance') {
                    fetchTooltipInfo();
                }
            }
            return () => clearTimeout(timeoutId);
        }
    }, [timeoutId, showDiv, isEntpatchOpen, isInfoOpen, isPatchOpen]);

    return (
        <>
            {showDiv && (
                <div style={{position: 'absolute', top: position.y, left: position.x, padding: '0px', borderRadius: '5px', zIndex: '2', background: "white"}}>

                {portName && instance === 'PortInstance' ? <p style={{padding: '5px', margin: '0'}}>Port Name: {portName} </p> : ''}
                {portName && instance === 'PortInstance' ? <p style={{padding: '0 5px 5px 5px', margin: '0'}}>Katalogname: {katalogname} </p> : ''}
                {zielPortName && instance === 'PortInstance' ? <p style={{padding: '0 5px 5px 5px', margin: '0'}}>Zielport Name: {zielPortName} </p> : ''}
        
                {ppv && instance === 'Ppv' ? <p style={{padding: '5px', margin: '0'}}>{ppv.ports} </p> : ''}
                {ppv && instance === 'Ppv' ? <p style={{padding: '0 5px 0 5px', margin: '0'}}>Konfektionskabel: {ppv.konfektionskabel} </p> : ''}
                {ppv && instance === 'Ppv' ? <p style={{padding: '5px', margin: '0'}}>Signalweg: {ppv.signalweg} </p> : ''}
        
                {instanceInfo && instance === 'Instance' ? <p style={{padding: '5px', margin: '0'}}>{`${instanceInfo.structureText}: ${instanceInfo.name}`} </p> : ''}
                {instanceInfo && instance === 'Instance' ? <p style={{padding: '0 5px 0 5px', margin: '0'}}>{instanceInfo.description} </p> : ''}
                {instanceInfo && instance === 'Instance' ? <p style={{padding: '5px', margin: '0'}}>{instanceInfo.catalogName} </p> : ''}

                </div>
            )}
        </> 
    );
}

export {Tooltip};