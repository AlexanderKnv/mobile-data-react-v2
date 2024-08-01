import Logo from '../img/logo_infocable.png'
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../hook/useAuth';

function Header() {
    const navigate = useNavigate();
    const {signout} = useAuth();

    return (
        <div className="card-header bg-dark text-white p-3">
            <div className="row float-start">
                <div className="col">
                    <img src={Logo} className="img-fluid rounded float-start" style={{ width: "70px" }} alt="..." />
                </div>
                <div className="col bottom">
                    <h1 className="text-warning" style={{ marginTop: "10px" }}>InfoCABLE®</h1>
                </div>
            </div>
            <button type="submit" className="btn btn-warning mt-3 float-end" onClick={() => signout(() => navigate('/', {replace: true}))}>Abmelden</button>
        </div>
    )
}

export {Header}