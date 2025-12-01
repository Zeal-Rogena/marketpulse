import { useAuth } from "../hooks/useAuth";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // redirect to login after logout
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={{ margin: 0 }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          MarketPulse
        </Link>
      </h2>

      <div>
        {user ? (
          <>
            <span style={{ marginRight: "1rem" }}>{user.email}</span>
            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/register" style={{ ...styles.link, marginLeft: "1rem" }}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    padding: "1rem 2rem",
    backgroundColor: "#0d6efd",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
  },
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "#ffc107",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
};

export default Navbar;
