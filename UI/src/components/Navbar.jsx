export default function Navbar({ user }) {
    function logout() {
        localStorage.clear();
        window.location = "/";
    }

    return (
        <nav className="navbar navbar-dark bg-primary">
            <span className="navbar-brand logo-circle shadow-sm text-white px-3 py-2">
                EMPMS
            </span>
            <span className="text-white">
                {user ? `Welcome, ${user.full_name}` : ""}
            </span>
            <button className="btn btn-danger" onClick={logout}>
                Logout
            </button>
        </nav>
    );
}