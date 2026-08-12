import { useState, useMemo } from "react";
import "./Inventory.css";
import Sidebar from "../../components/Sidebar/Sidebar";

import {
  FaBell,
  FaSearch,
  FaBoxOpen,
  FaCheckCircle,
  FaExclamationTriangle,
  FaBan,
  FaHistory,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
} from "react-icons/fa";

const ICON_OPTIONS = [
  "🍗", "🥩", "🧃", "🍞", "🧀", "🍅", "🥬", "🛢️", "🥚", "🍟", "🥓", "🍋", "🧅", "🌶️",
];

const UNIT_OPTIONS = ["kg", "litre", "piece"];

const INITIAL_PRODUCTS = [
  { id: 1, icon: "🍗", name: "Chicken Breast", unit: "kg", stock: 8, minStock: 10, unitCost: 780 },
  { id: 2, icon: "🥩", name: "Beef Meat", unit: "kg", stock: 14, minStock: 8, unitCost: 1450 },
  { id: 3, icon: "🧃", name: "Orange Juice", unit: "litre", stock: 22, minStock: 12, unitCost: 180 },
  { id: 4, icon: "🍞", name: "Bread Buns", unit: "piece", stock: 5, minStock: 30, unitCost: 25 },
  { id: 5, icon: "🧀", name: "Cheese Slices", unit: "piece", stock: 120, minStock: 50, unitCost: 18 },
  { id: 6, icon: "🍅", name: "Tomatoes", unit: "kg", stock: 0, minStock: 5, unitCost: 120 },
  { id: 7, icon: "🥬", name: "Lettuce", unit: "kg", stock: 6, minStock: 4, unitCost: 90 },
  { id: 8, icon: "🛢️", name: "Cooking Oil", unit: "litre", stock: 18, minStock: 10, unitCost: 420 },
];

const EMPTY_FORM = {
  id: null,
  icon: "🍗",
  name: "",
  unit: "kg",
  stock: "",
  minStock: "",
  unitCost: "",
};

function getStatus(product) {
  if (product.stock <= 0) return "Out of Stock";
  if (product.stock <= product.minStock) return "Low Stock";
  return "Normal";
}

function statusClass(status) {
  if (status === "Normal") return "status normal";
  if (status === "Low Stock") return "status low";
  return "status out";
}

function formatToday() {
  const today = new Date();
  return today.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function Inventory() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [isEditing, setIsEditing] = useState(false);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return products;
    return products.filter((p) => p.name.toLowerCase().includes(query));
  }, [products, search]);

  const stats = useMemo(() => {
    const total = products.length;
    let normal = 0;
    let low = 0;
    let out = 0;

    products.forEach((p) => {
      const status = getStatus(p);
      if (status === "Normal") normal += 1;
      else if (status === "Low Stock") low += 1;
      else out += 1;
    });

    return { total, normal, low, out };
  }, [products]);

  const openAddModal = () => {
    setForm(EMPTY_FORM);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setForm({
      id: product.id,
      icon: product.icon,
      name: product.name,
      unit: product.unit,
      stock: String(product.stock),
      minStock: String(product.minStock),
      unitCost: String(product.unitCost),
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSave = () => {
    if (!form.name.trim()) return;

    const payload = {
      icon: form.icon,
      name: form.name.trim(),
      unit: form.unit,
      stock: Number(form.stock) || 0,
      minStock: Number(form.minStock) || 0,
      unitCost: Number(form.unitCost) || 0,
    };

    if (isEditing) {
      setProducts((prev) =>
        prev.map((p) => (p.id === form.id ? { ...p, ...payload } : p))
      );
    } else {
      setProducts((prev) => [...prev, { id: Date.now(), ...payload }]);
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
              placeholder="Search products..."
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

          <div className="content-header inventory-header">
            <div>
              <h1>Inventory</h1>
              <p>Track stock levels across all products</p>
            </div>

            <div className="inventory-date">
              <span>📅 {formatToday()}</span>
            </div>
          </div>

          {/* Statistics */}
          <div className="stats-grid inventory-stats">
            <div className="stat-card">
              <span className="stat-label">Total Products</span>
              <div className="stat-value-row">
                <span className="stat-value">{stats.total}</span>
                <span className="stat-icon total"><FaBoxOpen /></span>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-label">Normal Stock</span>
              <div className="stat-value-row">
                <span className="stat-value">{stats.normal}</span>
                <span className="stat-icon normal"><FaCheckCircle /></span>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-label">Low Stock</span>
              <div className="stat-value-row">
                <span className="stat-value">{stats.low}</span>
                <span className="stat-icon low"><FaExclamationTriangle /></span>
              </div>
              <p className="stat-sub">Needs reordering soon</p>
            </div>

            <div className="stat-card">
              <span className="stat-label">Out of Stock</span>
              <div className="stat-value-row">
                <span className="stat-value">{stats.out}</span>
                <span className="stat-icon out"><FaBan /></span>
              </div>
              <p className="stat-sub">Reorder immediately</p>
            </div>
          </div>

          {/* Actions row */}
          <div className="inventory-actions">
            <div className="topbar-search inventory-search">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="inventory-actions-buttons">
              <button className="btn-secondary">
                <FaHistory /> Stock History
              </button>
              <button className="btn-primary" onClick={openAddModal}>
                <FaPlus /> Add Product
              </button>
            </div>
          </div>

          {/* Product cards strip */}
          <div className="product-strip">
            {filteredProducts.map((product) => {
              const status = getStatus(product);
              return (
                <div className="product-card" key={product.id}>
                  <div className="product-card-top">
                    <span className="product-icon">{product.icon}</span>
                    <span className="product-stock">
                      {product.stock} {product.unit}
                    </span>
                  </div>
                  <h4 className="product-name">{product.name}</h4>
                  <div className="product-card-bottom">
                    <span className="product-cost">{product.unitCost} DA</span>
                    <span className={statusClass(status)}>{status}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* All Inventory table */}
          <div className="panel inventory-panel">
            <div className="panel-header">
              <h3>All Inventory</h3>
              <span className="panel-subcount">{filteredProducts.length} products</span>
            </div>

            <table className="orders-table inventory-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Stock</th>
                  <th>Min Stock</th>
                  <th>Unit Cost</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((product) => {
                  const status = getStatus(product);
                  return (
                    <tr key={product.id}>
                      <td>
                        <div className="table-product-cell">
                          <span className="product-icon small">{product.icon}</span>
                          <div>
                            <div className="table-product-name">{product.name}</div>
                            <div className="table-product-unit">{product.unit}</div>
                          </div>
                        </div>
                      </td>

                      <td>{product.stock} {product.unit}</td>
                      <td>{product.minStock} {product.unit}</td>
                      <td>{product.unitCost} DA</td>

                      <td>
                        <span className={statusClass(status)}>{status}</span>
                      </td>

                      <td className="table-actions">
                        <button
                          className="icon-button small"
                          onClick={() => openEditModal(product)}
                          aria-label={`Edit ${product.name}`}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="icon-button small danger"
                          onClick={() => handleDelete(product.id)}
                          aria-label={`Delete ${product.name}`}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="empty-row">
                      No products match your search.
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
              <h3>{isEditing ? "Update Product" : "Add Product"}</h3>
              <button className="icon-button small" onClick={closeModal} aria-label="Close">
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <label className="field-label">Product Icon</label>
              <div className="icon-picker">
                {ICON_OPTIONS.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    className={`icon-option ${form.icon === icon ? "selected" : ""}`}
                    onClick={() => setForm((f) => ({ ...f, icon }))}
                  >
                    {icon}
                  </button>
                ))}
              </div>

              <label className="field-label">Product Name</label>
              <input
                type="text"
                className="field-input"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Tomatoes"
              />

              <div className="field-row">
                <div>
                  <label className="field-label">Unit</label>
                  <select
                    className="field-input"
                    value={form.unit}
                    onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))}
                  >
                    {UNIT_OPTIONS.map((unit) => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="field-label">Unit Cost (DA)</label>
                  <input
                    type="number"
                    className="field-input"
                    value={form.unitCost}
                    onChange={(e) => setForm((f) => ({ ...f, unitCost: e.target.value }))}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="field-row">
                <div>
                  <label className="field-label">Current Stock</label>
                  <input
                    type="number"
                    className="field-input"
                    value={form.stock}
                    onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="field-label">Minimum Stock</label>
                  <input
                    type="number"
                    className="field-input"
                    value={form.minStock}
                    onChange={(e) => setForm((f) => ({ ...f, minStock: e.target.value }))}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={closeModal}>Cancel</button>
              <button className="btn-primary" onClick={handleSave}>Save Product</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Inventory;