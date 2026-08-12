import { useState, useMemo } from "react";
import "./Suppliers.css";
import Sidebar from "../../components/Sidebar/Sidebar";

import {
  FaBell,
  FaSearch,
  FaTruck,
  FaShoppingCart,
  FaMoneyBillWave,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
} from "react-icons/fa";

const INITIAL_SUPPLIERS = [
  {
    id: 1,
    name: "Ferme El Wiam",
    phone: "023 45 67 89",
    address: "Zone Industrielle, Rouiba, Alger",
    products: ["Chicken", "Beef", "Eggs"],
  },
  {
    id: 2,
    name: "Boulangerie Atlas",
    phone: "023 11 22 33",
    address: "Rue des Frères, Alger Centre",
    products: ["Bread", "Buns"],
  },
  {
    id: 3,
    name: "Ramy Beverages Distrib.",
    phone: "021 98 76 54",
    address: "Birkhadem, Alger",
    products: ["Juice", "Soft Drinks"],
  },
];

const EMPTY_FORM = {
  id: null,
  name: "",
  phone: "",
  address: "",
  products: "",
};

function formatToday() {
  const today = new Date();
  return today.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function Suppliers() {
  const [suppliers, setSuppliers] = useState(INITIAL_SUPPLIERS);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [isEditing, setIsEditing] = useState(false);

  const filteredSuppliers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return suppliers;
    return suppliers.filter((s) =>
      s.name.toLowerCase().includes(query) ||
      s.products.some((p) => p.toLowerCase().includes(query))
    );
  }, [suppliers, search]);

  const openAddModal = () => {
    setForm(EMPTY_FORM);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openEditModal = (supplier) => {
    setForm({
      id: supplier.id,
      name: supplier.name,
      phone: supplier.phone,
      address: supplier.address,
      products: supplier.products.join(", "),
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setSuppliers((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSave = () => {
    if (!form.name.trim()) return;

    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      products: form.products
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean),
    };

    if (isEditing) {
      setSuppliers((prev) =>
        prev.map((s) => (s.id === form.id ? { ...s, ...payload } : s))
      );
    } else {
      setSuppliers((prev) => [...prev, { id: Date.now(), ...payload }]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="dashboard-page">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="dashboard-main">

        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-search">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search suppliers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="topbar-actions">
            <button className="icon-button">
              <FaBell />
              <span className="notif-dot"></span>
            </button>

            <div className="topbar-user">
              <div className="user-avatar">A</div>

              <div className="user-info">
                <span className="user-name">Amine K.</span>
                <span className="user-role">Owner / Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="content">

          <div className="content-header suppliers-header">
            <div>
              <h1>Suppliers</h1>
              <p>Manage your supplier relationships</p>
            </div>

            <div className="suppliers-date">
              <span>📅 {formatToday()}</span>
            </div>
          </div>

          {/* Statistics */}
          <div className="stats-grid suppliers-stats">
            <div className="stat-card">
              <span className="stat-label">Total Suppliers</span>
              <div className="stat-value-row">
                <span className="stat-value">{suppliers.length}</span>
                <span className="stat-icon total"><FaTruck /></span>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-label">Purchases This Month</span>
              <div className="stat-value-row">
                <span className="stat-value">3</span>
                <span className="stat-icon normal"><FaShoppingCart /></span>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-label">Total Spent</span>
              <div className="stat-value-row">
                <span className="stat-value">40,600 DA</span>
                <span className="stat-icon low"><FaMoneyBillWave /></span>
              </div>
            </div>
          </div>

          {/* Actions row */}
          <div className="suppliers-actions">
            <div className="topbar-search suppliers-search">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search suppliers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button className="btn-primary" onClick={openAddModal}>
              <FaPlus /> Add Supplier
            </button>
          </div>

          {/* Suppliers table */}
          <div className="panel suppliers-panel">
            <table className="orders-table suppliers-table">
              <thead>
                <tr>
                  <th>Supplier</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Products Supplied</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {filteredSuppliers.map((supplier) => (
                  <tr key={supplier.id}>
                    <td>
                      <div className="table-supplier-cell">
                        <span className="supplier-icon"><FaTruck /></span>
                        <span className="table-supplier-name">{supplier.name}</span>
                      </div>
                    </td>

                    <td>{supplier.phone}</td>
                    <td>{supplier.address}</td>

                    <td>
                      <div className="products-tags">
                        {supplier.products.map((product) => (
                          <span className="product-tag" key={product}>{product}</span>
                        ))}
                      </div>
                    </td>

                    <td className="table-actions">
                      <button
                        className="icon-button small"
                        onClick={() => openEditModal(supplier)}
                        aria-label={`Edit ${supplier.name}`}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="icon-button small danger"
                        onClick={() => handleDelete(supplier.id)}
                        aria-label={`Delete ${supplier.name}`}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredSuppliers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="empty-row">
                      No suppliers match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </main>

      </div>

      {/* Add / Update Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{isEditing ? "Update Supplier" : "Add Supplier"}</h3>
              <button className="icon-button small" onClick={closeModal} aria-label="Close">
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <label className="field-label">Supplier Name</label>
              <input
                type="text"
                className="field-input"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Ferme El Wiam"
              />

              <label className="field-label">Phone</label>
              <input
                type="text"
                className="field-input"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="e.g. 023 45 67 89"
              />

              <label className="field-label">Address</label>
              <input
                type="text"
                className="field-input"
                value={form.address}
                onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                placeholder="e.g. Zone Industrielle, Rouiba, Alger"
              />

              <label className="field-label">Products Supplied</label>
              <input
                type="text"
                className="field-input"
                value={form.products}
                onChange={(e) => setForm((f) => ({ ...f, products: e.target.value }))}
                placeholder="e.g. Chicken, Beef, Eggs"
              />
              <p className="field-hint">Separate multiple products with commas.</p>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={closeModal}>Cancel</button>
              <button className="btn-primary" onClick={handleSave}>Save Supplier</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Suppliers;