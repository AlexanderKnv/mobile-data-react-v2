import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {useAuth} from '../hook/useAuth';
import {API_URL} from "../config";
import { Search } from "../components/Search";
import { Setting } from "../components/Setting";
import { Patch } from "../components/Patch";
import { Entpatch } from "../components/Entpatch";
import { Info } from "../components/Info";
import { SchrankInfo } from "../components/SchrankInfo";
import { Tooltip } from "../components/Tooltip";
import { Footer } from "../components/Footer";
import { Preloader } from "../components/Preloader";
import Logo from '../img/logo_infocable.png';
import SearchImg from '../img/search.png';
import SettingImg from '../img/setting.png';
import PatchImg from '../img/patch_dialog.png';
import EntpatchImg from '../img/entschalten.png';
import InfoImg from '../img/info.png';
import SchrankInfoImg from '../img/Schrankbestückung.png';
import AktualisierenImg from '../img/Aktualisieren.png';
import AbmeldenImg from '../img/system-log-out-2.png';
import useWindowSize from '../hook/useWindowSize';
import "./SvgPage.css";

const SvgPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {signout} = useAuth();
    const [svgContent, setSvgContent] = useState("");
    const [rackId, setRackId] = useState(location.state.item.value);
    const [plvId, setPlvId] = useState(location.state.plvId);
    const [rechte, setRechte] = useState(location.state.rechte);
    const [isLoading, setIsLoading] = useState(false);

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isSettingOpen, setIsSettingOpen] = useState(false);
    const [isPatchOpen, setIsPatchOpen] = useState(false);
    const [isEntpatchOpen, setIsEntpatchOpen] = useState(false);
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [isSchrankInfoOpen, setIsSchrankInfoOpen] = useState(false);

    const [isPpvVisibility, setIsPpvVisibility] = useState("1");
    const [isInstanceTextObject, setIsInstanceTextObject] = useState(false);
    const [isInstanceTextPort, setIsInstanceTextPort] = useState(false);
    const [isFreeTextObject, setIsFreeTextObject] = useState(true);
    const [isFreeTextPort, setIsFreeTextPort] = useState(false);
    const [isRuleTextObject, setIsRuleTextObject] = useState(true);
    const [isRuleTextPort, setIsRuleTextPort] = useState(true);
    const [randomParam, setRandomParam] = useState(false);
    const [aufschlagKabellänge, setAufschlagKabellänge] = useState(localStorage.getItem('aufschlagKabellänge') || '0');

    const { width, height } = useWindowSize();

    const authUser = async () => {
        try {
            const response = await fetch(API_URL + `connect?dbName=${location.state.selectedDB}&proId=${location.state.proId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Basic " + btoa(`${localStorage.getItem('username')}:${location.state.password}`),
                    },
            });
            if (response.ok) {
                openSvg();
            }
        } catch (error) {
            console.error("Error during authentication:", error);
        }
    };

    const openSvg = async () => {
        setIsLoading(true);
        const url = API_URL + `svg?type=Rack&id=${rackId}&ppvvisibility=${isPpvVisibility === '1' ? false : true}&instancetextobject=${isInstanceTextObject}&instancetextport=${isInstanceTextPort}&freetextobject=${isFreeTextObject}&freetextport=${isFreeTextPort}&ruletextobject=${isRuleTextObject}&ruletextport=${isRuleTextPort}&width=${width}&height=${height}`;
        try {
            const response = await fetch(url);
            console.log(response)
            setSvgContent(url);
        } catch (error) {
            console.error('Error fetching SVG:', error);
        } finally {
            setIsLoading(false);
            // setSvgContent(url);
        }
    };
    
    const neuVisualisieren = () => {
        const url = API_URL + `svg?type=Rack&id=${rackId}&ppvvisibility=${isPpvVisibility === '1' ? false : true}&instancetextobject=${isInstanceTextObject}&instancetextport=${isInstanceTextPort}&freetextobject=${isFreeTextObject}&freetextport=${isFreeTextPort}&ruletextobject=${isRuleTextObject}&ruletextport=${isRuleTextPort}&width=${width}&height=${height}`;
        setSvgContent(url);
    }

    const mandatoryNeuVisualisieren = () => {
        setRandomParam(Math.random());
        const url = API_URL + `svg?type=Rack&id=${rackId}&ppvvisibility=${isPpvVisibility === '1' ? false : true}&instancetextobject=${isInstanceTextObject}&instancetextport=${isInstanceTextPort}&freetextobject=${isFreeTextObject}&freetextport=${isFreeTextPort}&ruletextobject=${isRuleTextObject}&ruletextport=${isRuleTextPort}&random=${randomParam}&width=${width}&height=${height}`;
        setSvgContent(url);
    }

    useEffect(() => {
        authUser();
    }, [rackId]);

    const handleRackIdChange = (item) => {
        setRackId(item);
        setIsSearchOpen(false)
    };

    const handleSearchShow = () => {
        setIsSearchOpen(!isSearchOpen)
        setIsSettingOpen(false)
        setIsPatchOpen(false)
        setIsEntpatchOpen(false)
        setIsInfoOpen(false)
        setIsSchrankInfoOpen(false)
    };
    const handleSettingShow = () => {
        setIsSearchOpen(false)
        setIsSettingOpen(!isSettingOpen)
        setIsPatchOpen(false)
        setIsEntpatchOpen(false)
        setIsInfoOpen(false)
        setIsSchrankInfoOpen(false)
    };
    const handlePatchShow = () => {
        setIsSearchOpen(false)
        setIsSettingOpen(false)
        setIsPatchOpen(!isPatchOpen)
        setIsEntpatchOpen(false)
        setIsInfoOpen(false)
        setIsSchrankInfoOpen(false)
    };
    const handleEntpatchShow = () => {
        setIsSearchOpen(false)
        setIsSettingOpen(false)
        setIsPatchOpen(false)
        setIsEntpatchOpen(!isEntpatchOpen)
        setIsInfoOpen(false)
        setIsSchrankInfoOpen(false)
    };
    const handleInfoShow = () => {
        setIsSearchOpen(false)
        setIsSettingOpen(false)
        setIsPatchOpen(false)
        setIsEntpatchOpen(false)
        setIsInfoOpen(!isInfoOpen)
        setIsSchrankInfoOpen(false)
    };
    const handleSchrankInfoShow = () => {
        setIsSearchOpen(false)
        setIsSettingOpen(false)
        setIsPatchOpen(false)
        setIsEntpatchOpen(false)
        setIsInfoOpen(false)
        setIsSchrankInfoOpen(!isSchrankInfoOpen)
    };

    const handlePpvVisibilityChange = (event) => {
        setIsPpvVisibility(event);
    };
    const handleInstanceTextObjectChange = () => {
        setIsInstanceTextObject(!isInstanceTextObject);
    };
    const handleInstanceTextPortChange = () => {
        setIsInstanceTextPort(!isInstanceTextPort);
    };
    const handleFreeTextObjectChange = () => {
        setIsFreeTextObject(!isFreeTextObject);
    };
    const handleFreeTextPortChange = () => {
        setIsFreeTextPort(!isFreeTextPort);
    };
    const handleRuleTextObjectChange = () => {
        setIsRuleTextObject(!isRuleTextObject);
    };
    const handleRuleTextPortChange = () => {
        setIsRuleTextPort(!isRuleTextPort);
    };
    const handleAufschlagKabellängeChange = (event) => {
        if (/^\d*\.?\d*$/.test(event)) {
            setAufschlagKabellänge(event);
            localStorage.setItem('aufschlagKabellänge', event);
        }
    };

    const handleAktualisieren = () => {
        authUser();
      };
    
    return (
        <div className="container-fluid" style={{ padding: "0" }}>
            <div className="card bg-dark" style={{ minHeight: "100vh" }}>
                {/* <div className="card-header bg-dark text-white">
                    <div className="row float-start">
                        <div className="col" style={{ padding: "0 0 0 60px" }}>
                            <img src={Logo} className="img-fluid rounded float-start" style={{ width: "50px" }} alt="..." />
                        </div>
                        <div className="col bottom">
                            <h3 className="text-warning" style={{ marginTop: "10px" }}>InfoCABLE®</h3>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-warning mt-2 float-end" onClick={() => signout(() => navigate('/', {replace: true}))}>Abmelden</button>
                </div> */}
                <div className="card-body row cont" style={{ padding: "0" }}>

                    {isSearchOpen ? <Search handleSearchShow={handleSearchShow} handleRackIdChange={handleRackIdChange} plvId={plvId}/> : ""}

                    {isSettingOpen ? <Setting handleSettingShow={handleSettingShow} 
                    handlePpvVisibilityChange={handlePpvVisibilityChange}
                    handleInstanceTextObjectChange={handleInstanceTextObjectChange}
                    handleInstanceTextPortChange={handleInstanceTextPortChange}
                    handleFreeTextObjectChange={handleFreeTextObjectChange} 
                    handleFreeTextPortChange={handleFreeTextPortChange}
                    handleRuleTextObjectChange={handleRuleTextObjectChange}
                    handleRuleTextPortChange={handleRuleTextPortChange}
                    isPpvVisibility={isPpvVisibility} 
                    isInstanceTextObject={isInstanceTextObject}
                    isInstanceTextPort={isInstanceTextPort}
                    isFreeTextObject={isFreeTextObject}
                    isFreeTextPort={isFreeTextPort}
                    isRuleTextObject={isRuleTextObject}
                    isRuleTextPort={isRuleTextPort}
                    neuVisualisieren={neuVisualisieren}
                    aufschlagKabellänge={aufschlagKabellänge}
                    handleAufschlagKabellängeChange={handleAufschlagKabellängeChange}/> : ""}

                    {isPatchOpen ? <Patch handlePatchShow={handlePatchShow} mandatoryNeuVisualisieren={mandatoryNeuVisualisieren} aufschlagKabellänge={aufschlagKabellänge}/> : ""}

                    {isEntpatchOpen ? <Entpatch handleEntpatchShow={handleEntpatchShow} mandatoryNeuVisualisieren={mandatoryNeuVisualisieren}/> : ""}

                    {isSchrankInfoOpen ? <SchrankInfo handleSchrankInfoShow={handleSchrankInfoShow} rackId={rackId}/> : ""}


                    {isInfoOpen ? <Info handleInfoShow={handleInfoShow}></Info> : ""}

                    <div className="col bg-dark panel" style={{ maxWidth: "60px", padding: "0"}}>
                        <div className="card border border-3 border-warning iconContainer m-1" onClick={handleSearchShow}>
                            <img src={SearchImg} className="card-img-top" alt="..."/>
                            <span className="iconTooltip">Schrankauswahl / Suche</span>
                        </div>
                        <div className="card border border-3 border-warning iconContainer m-1" onClick={handleSettingShow}>
                            <img src={SettingImg} className="card-img-top" alt="..."/>
                            <span className="iconTooltip">Optionen</span>
                        </div>
                        {rechte === 's' && (
                            <div className="card border border-3 border-warning iconContainer m-1" onClick={handlePatchShow}>
                                <img src={PatchImg} className="card-img-top" alt="..."/>
                                <span className="iconTooltip">Patchen</span>
                            </div>
                        )}
                        {rechte === 's' && (
                            <div className="card border border-3 border-warning iconContainer m-1" onClick={handleEntpatchShow}>
                                <img src={EntpatchImg} className="card-img-top" alt="..."/>
                                <span className="iconTooltip">Entpatchen</span>
                            </div>
                        )}
                        <div className="card border border-3 border-warning iconContainer m-1" onClick={handleInfoShow}>
                            <img src={InfoImg} className="card-img-top" alt="..."/>
                            <span className="iconTooltip">Objektinformation</span>
                        </div>
                        <div className="card border border-3 border-warning iconContainer m-1" onClick={handleSchrankInfoShow}>
                            <img src={SchrankInfoImg} className="card-img-top" alt="..."/>
                            <span className="iconTooltip">Schrankbestückung</span>
                        </div>
                        <div className="card border border-3 border-warning iconContainer m-1" onClick={handleAktualisieren}>
                            <img src={AktualisierenImg} className="card-img-top" alt="..."/>
                            <span className="iconTooltip">Aktualisieren</span>
                        </div>
                        <div className="card border border-3 border-warning iconContainer m-1" onClick={() => signout(() => navigate('/', {replace: true}))}>
                            <img src={AbmeldenImg} className="card-img-top" alt="..."/>
                            <span className="iconTooltip">Abmelden</span>
                        </div>
                    </div>
                    <div className="col svg-container" style={{ paddingLeft: "0", paddingRight: "0" }}>
                        <Tooltip isEntpatchOpen={isEntpatchOpen} isInfoOpen={isInfoOpen} isPatchOpen={isPatchOpen}/>
                        {!isLoading && svgContent && (<iframe src={svgContent} title="SVG" width="101%" height="100%"/>)}
                    </div>
                    {isLoading && <Preloader />}
                </div>
                {/* <Footer/>   */}
            </div>
        </div>
    );
};

export { SvgPage };