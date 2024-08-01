function Footer() {
    return (
        <div className="card-footer bg-dark text-warning bottom" style={{ textAlign: "center" }}>
            © {new Date().getFullYear()} GFaI e.V.
        </div>
    );
}

export {Footer}