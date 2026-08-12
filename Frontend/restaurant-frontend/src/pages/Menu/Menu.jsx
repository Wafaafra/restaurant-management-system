import { useState, useMemo } from "react";
import "./Menu.css";
import Sidebar from "../../components/Sidebar/Sidebar";

import { FaBell, FaSearch, FaUtensils, FaTags, FaMoneyBillWave, FaGem, FaPlus, FaTrash, FaPen, FaTimes } from "react-icons/fa";

import caesarSaladImg from "../../assets/images/caesar-salad.jpg";
import chickenTacosImg from "../../assets/images/chicken-tacos.webp";
import classicBeefBurgerImg from "../../assets/images/classic-beef-burger.webp";
import grilledChickenBurgerImg from "../../assets/images/grilled-chicken-burger.jpg";

const DISH_ICON_OPTIONS = ["🍔", "🌮", "🥩", "🍕", "🧃", "🥗", "🍗", "🍟", "🍝", "🥪"];

// Mirrors the ingredient list from Inventory. In a real app this should come
// from a shared source (context/API) so stock + cost stay in sync.
// unitCost is in USD.
const INGREDIENTS = [
  { id: 1, name: "Chicken Breast", unit: "kg", unitCost: 3.00 },
  { id: 2, name: "Beef Meat", unit: "kg", unitCost: 5.58 },
  { id: 3, name: "Orange Juice", unit: "litre", unitCost: 0.70 },
  { id: 4, name: "Bread Buns", unit: "piece", unitCost: 0.10 },
  { id: 5, name: "Cheese Slices", unit: "piece", unitCost: 0.07 },
  { id: 6, name: "Tomatoes", unit: "kg", unitCost: 0.46 },
  { id: 7, name: "Lettuce", unit: "kg", unitCost: 0.35 },
  { id: 8, name: "Cooking Oil", unit: "litre", unitCost: 1.62 },
];

// Dish prices are in USD.
const INITIAL_DISHES = [
  {
    id: 1,
    icon: "🍔",
    name: "Grilled Chicken Burger",
    category: "Burgers",
    price: 2.12,
    image: grilledChickenBurgerImg,
    ingredients: [
      { ingredientId: 1, qty: 0.2 },
      { ingredientId: 4, qty: 1 },
      { ingredientId: 5, qty: 1 },
      { ingredientId: 7, qty: 0.05 },
    ],
  },
  {
    id: 2,
    icon: "🍔",
    name: "Classic Beef Burger",
    category: "Burgers",
    price: 2.31,
    image: classicBeefBurgerImg,
    ingredients: [
      { ingredientId: 2, qty: 0.2 },
      { ingredientId: 4, qty: 1 },
      { ingredientId: 5, qty: 1 },
      { ingredientId: 7, qty: 0.05 },
    ],
  },
  {
    id: 3,
    icon: "🧃",
    name: "Fresh Orange Juice",
    category: "Drinks",
    price: 0.77,
    ingredients: [{ ingredientId: 3, qty: 0.3 }],
  },
  {
    id: 4,
    icon: "🌮",
    name: "Chicken Tacos",
    category: "Tacos",
    price: 1.85,
    image: chickenTacosImg,
    ingredients: [
      { ingredientId: 1, qty: 0.15 },
      { ingredientId: 6, qty: 0.05 },
      { ingredientId: 7, qty: 0.03 },
    ],
  },
  {
    id: 5,
    icon: "🥩",
    name: "Grilled Beef Plate",
    category: "Plates",
    price: 3.27,
    ingredients: [
      { ingredientId: 2, qty: 0.3 },
      { ingredientId: 8, qty: 0.01 },
    ],
  },
  {
    id: 6,
    icon: "🥗",
    name: "Caesar Salad",
    category: "Salads",
    price: 1.46,
    image: caesarSaladImg,
    ingredients: [
      { ingredientId: 7, qty: 0.1 },
      { ingredientId: 5, qty: 1 },
    ],
  },
];

const EMPTY_FORM = {
  id: null,
  icon: "🍔",
  name: "",
  category: "",
  price: "",
  ingredients: [],
};

function ingredientById(id) {
  return INGREDIENTS.find((i) => i.id === id);
}

function recipeCost(dish) {
  return dish.ingredients.reduce((sum, link) => {
    const ing = ingredientById(link.ingredientId);
    return sum + (ing ? ing.unitCost * link.qty : 0);
  }, 0);
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

function Menu() {
  const [dishes, setDishes] = useState(INITIAL_DISHES);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [isEditing, setIsEditing] = useState(false);
  const [pickerIngredientId, setPickerIngredientId] = useState(INGREDIENTS[0].id);
  const [pickerQty, setPickerQty] = useState("");
  const [viewDish, setViewDish] = useState(null);

  const filteredDishes = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return dishes;
    return dishes.filter(
      (d) =>
        d.name.toLowerCase().includes(query) ||
        d.category.toLowerCase().includes(query)
    );
  }, [dishes, search]);

  const stats = useMemo(() => {
    const totalDishes = dishes.length;
    const categories = new Set(dishes.map((d) => d.category)).size;
    const avgPrice = totalDishes
      ? (dishes.reduce((sum, d) => sum + d.price, 0) / totalDishes).toFixed(2)
      : "0.00";

    let mostProfitable = null;
    let bestMargin = -Infinity;
    dishes.forEach((d) => {
      const margin = d.price - recipeCost(d);
      if (margin > bestMargin) {
        bestMargin = margin;
        mostProfitable = d.name;
      }
    });

    return { totalDishes, categories, avgPrice, mostProfitable };
  }, [dishes]);

  const openAddModal = () => {
    setForm(EMPTY_FORM);
    setIsEditing(false);
    setPickerIngredientId(INGREDIENTS[0].id);
    setPickerQty("");
    setIsModalOpen(true);
  };

  const openEditModal = (dish) => {
    setForm({
      id: dish.id,
      icon: dish.icon,
      name: dish.name,
      category: dish.category,
      price: String(dish.price),
      ingredients: dish.ingredients.map((link) => ({ ...link })),
    });
    setIsEditing(true);
    setPickerIngredientId(INGREDIENTS[0].id);
    setPickerQty("");
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleDelete = (id) => {
    setDishes((prev) => prev.filter((d) => d.id !== id));
  };

  const openViewModal = (dish) => setViewDish(dish);
  const closeViewModal = () => setViewDish(null);

  const addIngredientToForm = () => {
    const qty = Number(pickerQty);
    if (!qty || qty <= 0) return;
    if (form.ingredients.some((link) => link.ingredientId === pickerIngredientId)) return;

    setForm((f) => ({
      ...f,
      ingredients: [...f.ingredients, { ingredientId: pickerIngredientId, qty }],
    }));
    setPickerQty("");
  };

  const removeIngredientFromForm = (ingredientId) => {
    setForm((f) => ({
      ...f,
      ingredients: f.ingredients.filter((link) => link.ingredientId !== ingredientId),
    }));
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.category.trim()) return;

    const payload = {
      icon: form.icon,
      name: form.name.trim(),
      category: form.category.trim(),
      price: Number(form.price) || 0,
      ingredients: form.ingredients,
    };

    if (isEditing) {
      setDishes((prev) =>
        prev.map((d) => (d.id === form.id ? { ...d, ...payload } : d))
      );
    } else {
      setDishes((prev) => [...prev, { id: Date.now(), ...payload }]);
    }

    setIsModalOpen(false);
  };

  const availableIngredients = INGREDIENTS.filter(
    (ing) => !form.ingredients.some((link) => link.ingredientId === ing.id)
  );

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
              placeholder="Search dishes..."
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
              <div className="user-avatar">B</div>

              <div className="user-info">
                <span className="user-name">Boulam</span>
                <span className="user-role">Owner / Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="content">

          <div className="content-header menu-header">
            <div>
              <h1>Menu</h1>
              <p>Manage dishes and recipes</p>
            </div>

            <div className="menu-date">
              <span>📅 {formatToday()}</span>
            </div>
          </div>

          {/* Statistics */}
          <div className="stats-grid menu-stats">
            <div className="stat-card">
              <span className="stat-label">Total Dishes</span>
              <div className="stat-value-row">
                <span className="stat-value">{stats.totalDishes}</span>
                <span className="stat-icon total"><FaUtensils /></span>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-label">Categories</span>
              <div className="stat-value-row">
                <span className="stat-value">{stats.categories}</span>
                <span className="stat-icon normal"><FaTags /></span>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-label">Avg. Price</span>
              <div className="stat-value-row">
                <span className="stat-value">${stats.avgPrice}</span>
                <span className="stat-icon low"><FaMoneyBillWave /></span>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-label">Most Profitable</span>
              <div className="stat-value-row">
                <span className="stat-value stat-value-text">{stats.mostProfitable || "—"}</span>
                <span className="stat-icon out"><FaGem /></span>
              </div>
            </div>
          </div>

          {/* Actions row */}
          <div className="menu-actions">
            <div className="topbar-search menu-search">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search dishes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button className="btn-primary" onClick={openAddModal}>
              <FaPlus /> Add Dish
            </button>
          </div>

          {/* Dish grid */}
          <div className="dish-grid">
            {filteredDishes.map((dish) => (
                <div
                  className="dish-card"
                  key={dish.id}
                  onClick={() => openViewModal(dish)}
                >
                  <div className="dish-card-media">
                    {dish.image ? (
                      <img src={dish.image} alt={dish.name} className="dish-photo" />
                    ) : (
                      <div className="dish-icon-fallback">{dish.icon}</div>
                    )}

                    <div className="dish-card-actions">
                      <button
                        className="icon-button small media-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(dish);
                        }}
                        aria-label={`Edit ${dish.name}`}
                      >
                        <FaPen />
                      </button>
                      <button
                        className="icon-button small danger media-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(dish.id);
                        }}
                        aria-label={`Delete ${dish.name}`}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  <div className="dish-card-body">
                    <span className="dish-category">{dish.category}</span>
                    <h4 className="dish-name">{dish.name}</h4>
                    <p className="dish-ingredients-count">
                      {dish.ingredients.length} ingredient{dish.ingredients.length !== 1 ? "s" : ""} linked
                    </p>

                    <div className="dish-price">${dish.price.toFixed(2)}</div>
                  </div>
                </div>
            ))}

            {filteredDishes.length === 0 && (
              <p className="empty-row">No dishes match your search.</p>
            )}
          </div>

        </main>

      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal menu-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{isEditing ? "Edit Dish" : "Add Dish"}</h3>
              <button className="icon-button small" onClick={closeModal} aria-label="Close">
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <label className="field-label">Dish Icon</label>
              <div className="icon-picker dish-icon-picker">
                {DISH_ICON_OPTIONS.map((icon) => (
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

              <label className="field-label">Dish Name</label>
              <input
                type="text"
                className="field-input"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Grilled Beef Plate"
              />

              <div className="field-row">
                <div>
                  <label className="field-label">Category</label>
                  <input
                    type="text"
                    className="field-input"
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    placeholder="e.g. Plates"
                  />
                </div>

                <div>
                  <label className="field-label">Selling Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="field-input"
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <label className="field-label">Recipe Builder — link ingredients from Inventory</label>
              <div className="recipe-picker-row">
                <select
                  className="field-input"
                  value={pickerIngredientId}
                  onChange={(e) => setPickerIngredientId(Number(e.target.value))}
                  disabled={availableIngredients.length === 0}
                >
                  {availableIngredients.map((ing) => (
                    <option key={ing.id} value={ing.id}>
                      {ing.name} ({ing.unit})
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  step="0.01"
                  className="field-input recipe-qty-input"
                  placeholder="Qty"
                  value={pickerQty}
                  onChange={(e) => setPickerQty(e.target.value)}
                  disabled={availableIngredients.length === 0}
                />

                <button
                  type="button"
                  className="btn-secondary recipe-add-btn"
                  onClick={addIngredientToForm}
                  disabled={availableIngredients.length === 0}
                >
                  <FaPlus /> Add
                </button>
              </div>

              <div className="recipe-list">
                {form.ingredients.map((link) => {
                  const ing = ingredientById(link.ingredientId);
                  if (!ing) return null;
                  return (
                    <span className="recipe-chip" key={link.ingredientId}>
                      {ing.name} — {link.qty} {ing.unit}
                      <button
                        type="button"
                        className="recipe-chip-remove"
                        onClick={() => removeIngredientFromForm(link.ingredientId)}
                        aria-label={`Remove ${ing.name}`}
                      >
                        <FaTimes />
                      </button>
                    </span>
                  );
                })}

                {form.ingredients.length === 0 && (
                  <p className="field-hint">No ingredients linked yet.</p>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={closeModal}>Cancel</button>
              <button className="btn-primary" onClick={handleSave}>Save Dish</button>
            </div>
          </div>
        </div>
      )}

      {/* View Dish Modal */}
      {viewDish && (
        <div className="modal-overlay" onClick={closeViewModal}>
          <div className="modal view-modal" onClick={(e) => e.stopPropagation()}>
            <button className="view-close" onClick={closeViewModal} aria-label="Close">
              <FaTimes />
            </button>

            <div className="view-media">
              {viewDish.image ? (
                <img src={viewDish.image} alt={viewDish.name} className="view-photo" />
              ) : (
                <div className="view-icon-fallback">{viewDish.icon}</div>
              )}
              <span className="view-category-badge">{viewDish.category}</span>
            </div>

            <div className="view-body">
              <div className="view-title-row">
                <h3>{viewDish.name}</h3>
                <span className="view-price">${viewDish.price.toFixed(2)}</span>
              </div>

              {(() => {
                const cost = recipeCost(viewDish);
                const margin = viewDish.price - cost;
                const marginPct = viewDish.price ? (margin / viewDish.price) * 100 : 0;
                return (
                  <div className="view-stats-row">
                    <div className="view-stat">
                      <span className="view-stat-label">Cost to make</span>
                      <span className="view-stat-value">${cost.toFixed(2)}</span>
                    </div>
                    <div className="view-stat">
                      <span className="view-stat-label">Margin</span>
                      <span className={`view-stat-value ${margin >= 0 ? "positive" : "negative"}`}>
                        ${margin.toFixed(2)}
                      </span>
                    </div>
                    <div className="view-stat">
                      <span className="view-stat-label">Margin %</span>
                      <span className={`view-stat-value ${margin >= 0 ? "positive" : "negative"}`}>
                        {marginPct.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                );
              })()}

              <label className="field-label view-ingredients-label">
                Ingredients ({viewDish.ingredients.length})
              </label>

              {viewDish.ingredients.length === 0 ? (
                <p className="field-hint">No ingredients linked yet — this dish won't deduct stock on sale.</p>
              ) : (
                <ul className="view-ingredient-list">
                  {viewDish.ingredients.map((link) => {
                    const ing = ingredientById(link.ingredientId);
                    if (!ing) return null;
                    return (
                      <li key={link.ingredientId} className="view-ingredient-row">
                        <span className="view-ingredient-dot"></span>
                        <span className="view-ingredient-name">{ing.name}</span>
                        <span className="view-ingredient-qty">{link.qty} {ing.unit}</span>
                        <span className="view-ingredient-cost">${(ing.unitCost * link.qty).toFixed(2)}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={closeViewModal}>Close</button>
              <button
                className="btn-primary"
                onClick={() => {
                  closeViewModal();
                  openEditModal(viewDish);
                }}
              >
                <FaPen /> Edit Dish
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Menu;