import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaTruck,
  FaReceipt,
  FaShoppingCart,
  FaUtensils,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaUsers,
} from "react-icons/fa";
import logo from "../../assets/images/chickentaki-logo.png";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  // Grouped nav — matches your existing routes in App.jsx.
  // Add new groups/items here later as you build Sales, Analytics, AI Insights pages.
  const navGroups = [
    {
      title: "Overview",
      items: [{ label: "Overview", icon: <FaHome />, path: "/dashboard" }],
    },
    {
      title: "Operations",
      items: [
        { label: "Menu", icon: <FaUtensils />, path: "/menu" },
        { label: "Inventory", icon: <FaBoxOpen />, path: "/inventory" },
        { label: "Purchases", icon: <FaShoppingCart />, path: "/purchases" },
        { label: "Suppliers", icon: <FaTruck />, path: "/suppliers" },
      ],
    },
    {
      title: "Finance & Team",
      items: [
        { label: "Expenses", icon: <FaReceipt />, path: "/expenses" },
        { label: "Employees", icon: <FaUsers />, path: "/employees" },
      ],
    },
    {
      title: "Insights",
      items: [{ label: "Reports", icon: <FaChartBar />, path: "/reports" }],
    },
  ];

  return (
    <aside
      className={`sidebar ${expanded ? "expanded" : ""}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="sidebar-logo">
        <img src={logo} className="sidebar-logo-icon" alt="ChickenTaki logo" />
        <h2>ChickenTaki Manager</h2>
      </div>

      <nav className="sidebar-nav">
        {navGroups.map((group) => (
          <div className="nav-group" key={group.title}>
            <span className="nav-group-title">{group.title}</span>

            {group.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "nav-item active" : "nav-item"
                }
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <NavLink
        to="/settings"
        className={({ isActive }) =>
          isActive ? "nav-item settings-item active" : "nav-item settings-item"
        }
      >
        <span className="nav-icon">
          <FaCog />
        </span>
        <span className="nav-label">Settings</span>
      </NavLink>

      <button className="sidebar-logout" onClick={logout}>
        <span className="nav-icon">
          <FaSignOutAlt />
        </span>
        <span className="nav-label">Log Out</span>
      </button>
    </aside>
  );
}

export default Sidebar;