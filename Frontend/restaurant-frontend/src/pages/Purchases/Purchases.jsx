import "./Purchases.css";
import Sidebar from "../../components/Sidebar/Sidebar";

import {
  FaBell,
  FaSearch,
  FaShoppingCart,
  FaMoneyBillWave,
  FaTruck,
  FaCalendarAlt,
  FaPlus,
} from "react-icons/fa";

function Purchases() {

  const purchaseHistory = [
    {
      id: 1,
      date: "2026-06-24",
      supplier: "Ferme El Wiam",
      items: "Chicken Breast ×20, Beef Meat ×10",
      total: "30,200 DA",
    },
    {
      id: 2,
      date: "2026-06-23",
      supplier: "Boulangerie Atlas",
      items: "Bread Buns ×200",
      total: "5,000 DA",
    },
    {
      id: 3,
      date: "2026-06-20",
      supplier: "Ramy Beverages Distrib.",
      items: "Orange Juice ×30",
      total: "5,400 DA",
    },
  ];

  return (
    <div className="dashboard-page">

      <Sidebar />

      <div className="dashboard-main">

        {/* Topbar */}

        <header className="topbar">

          <div className="topbar-search">
            <FaSearch className="search-icon"/>
            <input
              type="text"
              placeholder="Search purchases..."
            />
          </div>

          <div className="topbar-actions">

            <button className="icon-button">
              <FaBell/>
              <span className="notif-dot"></span>
            </button>

            <div className="topbar-user">

              <div className="user-avatar">
                A
              </div>

              <div className="user-info">
                <span className="user-name">
                  Amine K.
                </span>
                <span className="user-role">
                  Owner / Admin
                </span>
              </div>

            </div>

          </div>

        </header>

        <main className="content">

          <div className="content-header">

            <div>

              <h1>Purchases</h1>

              <p>
                Record ingredient purchases from suppliers
              </p>

            </div>

            <div className="header-date">

              <FaCalendarAlt/>

              Fri, 26 Jun 2026

            </div>

          </div>

          {/* Statistics */}

          <div className="stats-grid">

            <div className="stat-card">

              <span className="stat-label">
                Purchases This Month
              </span>

              <div className="purchase-card">

                <FaShoppingCart/>

                <h2>3</h2>

              </div>

            </div>

            <div className="stat-card">

              <span className="stat-label">
                Total Spent
              </span>

              <div className="purchase-card">

                <FaMoneyBillWave/>

                <h2>40,600 DA</h2>

              </div>

            </div>

            <div className="stat-card">

              <span className="stat-label">
                Active Suppliers
              </span>

              <div className="purchase-card">

                <FaTruck/>

                <h2>3</h2>

              </div>

            </div>

          </div>

          {/* Purchase Form */}

          <div className="panel">

            <div className="panel-header">

              <h3>
                New Purchase Invoice
              </h3>

              <span className="panel-subtitle">
                Auto-updates stock
              </span>

            </div>

            <div className="purchase-form">

              <div className="form-group">

                <label>Supplier</label>

                <select>

                  <option>Ferme El Wiam</option>

                  <option>Boulangerie Atlas</option>

                  <option>Ramy Beverages Distrib.</option>

                </select>

              </div>

              <div className="form-group">

                <label>Date</label>

                <input
                  type="date"
                />

              </div>

              <div className="form-group">

                <label>Product</label>

                <select>

                  <option>Chicken Breast</option>

                  <option>Bread Buns</option>

                  <option>Orange Juice</option>

                </select>

              </div>

              <div className="form-group">

                <label>Quantity</label>

                <input
                  type="number"
                  placeholder="10"
                />

              </div>

              <div className="form-group">

                <label>Unit Price (DA)</label>

                <input
                  type="number"
                  placeholder="780"
                />

              </div>

              <button className="add-item-btn">

                <FaPlus/>

                Add Item

              </button>

            </div>

            <div className="invoice-box">

              <h4>🧾 Invoice</h4>

              <p>
                No items added yet. Add ingredients above to build this invoice.
              </p>

            </div>

            <div className="invoice-footer">

              <div>

                <span>Total Purchase Cost</span>

                <h2>0 DA</h2>

              </div>

              <button className="save-btn">

                💾 Save Invoice & Update Stock

              </button>

            </div>

          </div>
                    {/* Purchase History */}

          <div className="panel history-panel">

            <div className="panel-header">

              <div>
                <h3>Purchase History</h3>
                <p>3 invoices</p>
              </div>

            </div>

            <table className="purchase-table">

              <thead>

                <tr>
                  <th>Date</th>
                  <th>Supplier</th>
                  <th>Items</th>
                  <th>Total</th>
                </tr>

              </thead>

              <tbody>

                {purchaseHistory.map((purchase) => (

                  <tr key={purchase.id}>

                    <td>{purchase.date}</td>

                    <td>{purchase.supplier}</td>

                    <td>{purchase.items}</td>

                    <td className="amount">
                      {purchase.total}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </main>

      </div>

    </div>
  );
}

export default Purchases;