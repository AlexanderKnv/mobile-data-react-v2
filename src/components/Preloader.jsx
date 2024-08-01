function Preloader() {
    return (
        <div className="text-center" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export {Preloader}