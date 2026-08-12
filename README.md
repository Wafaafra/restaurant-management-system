# Restaurant Management System

**Status: In Development**

A full-stack restaurant management system designed to centralize restaurant operations, including inventory, purchases, sales, menu management, suppliers, expenses, employees, and financial reporting.

The system is currently under active development. The architecture and features are being progressively implemented and improved.

## Overview

Restaurant operations involve multiple interconnected processes, including stock management, purchasing, sales, expenses, suppliers, and financial monitoring.

This project aims to provide a centralized management platform that allows restaurant staff and management to monitor these operations through a unified web interface.

The system is designed with a modular architecture so that additional functionality, including analytics and AI-based features, can be integrated in future versions.

## Features

### Dashboard

The dashboard provides an overview of the restaurant's current activity and financial performance.

Planned and implemented metrics include:

* Daily sales
* Daily expenses
* Net profit
* Available cash
* Stock levels
* Low-stock alerts
* Business performance indicators

### Inventory Management

* Product and ingredient management
* Stock tracking
* Minimum stock thresholds
* Stock movement tracking
* Automatic stock updates
* Low-stock monitoring

### Purchase Management

* Purchase creation and management
* Purchase item tracking
* Supplier association
* Purchase cost tracking
* Automatic inventory updates

### Menu and Recipe Management

* Menu item management
* Menu categories
* Recipe management
* Ingredient association
* Ingredient consumption tracking

### Sales Management

* Sales recording
* Sale item management
* Sales totals
* Revenue tracking
* Inventory deduction based on product or recipe consumption

### Supplier Management

* Supplier records
* Supplier contact information
* Purchase history
* Supplier-related purchasing data

### Expense Management

Management of operational expenses, including:

* Electricity
* Water
* Gas
* Rent
* Other expenses

### Employee Management

* Employee records
* User roles
* Access management
* Role-based system permissions

### Reports and Analytics

The reporting module is designed to provide:

* Daily sales reports
* Monthly revenue reports
* Expense reports
* Purchase reports
* Inventory reports
* Ingredient cost analysis
* Profit analysis

### AI Module

AI-based functionality is planned for future development.

Potential applications include:

* Sales analysis
* Demand forecasting
* Inventory recommendations
* Product performance analysis
* Business performance insights

## Architecture

The project follows a client-server architecture composed of a React frontend and a Django REST backend.

```text
restaurant_management/
│
├── backend/
│   ├── users/
│   ├── inventory/
│   ├── suppliers/
│   ├── purchases/
│   ├── menu/
│   ├── sales/
│   ├── employees/
│   ├── expenses/
│   ├── dashboard/
│   ├── reports/
│   ├── ai_module/
│   ├── manage.py
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

## Technology Stack

### Backend

* Python
* Django
* Django REST Framework

### Frontend

* React
* JavaScript
* HTML5
* CSS3

### Database

* MySQL

### Development

* Git
* GitHub
* Visual Studio Code
* REST API

## User Roles

The application is designed to support role-based access.

| Role    | Description                                        |
| ------- | -------------------------------------------------- |
| Admin   | Full access to system configuration and management |
| Manager | Access to operational and management features      |
| Cashier | Access to sales and transaction-related features   |

## Inventory Workflow

Inventory management is designed to be connected to purchasing and sales operations.

```text
Purchase
    |
    v
Inventory Increase
    |
    v
Sale
    |
    v
Ingredient / Product Consumption
    |
    v
Inventory Decrease
    |
    v
Minimum Stock Threshold
    |
    v
Low-Stock Alert
```

This workflow is intended to reduce manual inventory updates and maintain consistency between purchasing, sales, and stock levels.

## Financial Management

The system provides daily and monthly financial calculations.

### Daily

```text
Total Sales
    -
Total Expenses
    =
Net Profit
```

### Monthly

```text
Revenue
    -
Ingredient Costs
    -
Operational Expenses
    =
Net Profit
```

Operational expenses may include electricity, water, gas, rent, and other business expenses.

## Project Status

The project is currently under development.

Current development priorities include:

* Completing backend APIs
* Improving frontend implementation
* Connecting frontend and backend modules
* Completing inventory automation
* Improving authentication and authorization
* Completing reporting functionality
* Improving UI/UX
* Testing and debugging
* Preparing the architecture for AI integration

Features and architecture may change during development.

## Installation

### Prerequisites

Make sure the following are installed:

* Python
* Node.js and npm
* MySQL
* Git

### Clone the Repository

```bash
git clone https://github.com/Wafaafra/restaurant-management-system.git
cd restaurant-management-system
```

## Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment on Windows:

```powershell
venv\Scripts\activate
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

Apply database migrations:

```bash
python manage.py migrate
```

Start the development server:

```bash
python manage.py runserver
```

The backend will be available at:

```text
http://127.0.0.1:8000/
```

## Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend URL will be displayed in the terminal.

## Environment Configuration

Sensitive configuration should be stored in environment variables and should not be committed to the repository.

Example:

```text
SECRET_KEY=
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_HOST=
DATABASE_PORT=
API_KEY=
```

The `.env` file should be included in `.gitignore`.

## Database

The application uses MySQL as its relational database.

Before starting the backend, configure the database connection and ensure that the MySQL server is running.

## Roadmap

### Core Management

* [x] Initial project structure
* [x] Backend setup
* [x] Frontend setup
* [x] MySQL integration
* [x] Authentication and authorization (including Google OAuth-based email authentication)
* [x] Inventory management
* [x] Purchase management
* [x] Sales management
* [x] Supplier management
* [x] Menu and recipe management

### Financial Management

* [x] Expense management
* [ ] Financial reports
* [ ] Profit analysis
* [ ] Advanced dashboard metrics

### AI and Analytics

* [ ] Sales analysis
* [ ] Demand forecasting
* [ ] Inventory recommendations
* [ ] Business performance analysis

### Future Development

* [ ] Mobile application support
* [ ] Advanced analytics
* [ ] Additional integrations
* [ ] Production deployment

## Security

Security improvements will be implemented before production deployment.

The production version should include:

* Secure environment variable management
* Authentication and authorization
* Role-based access control
* API validation
* HTTPS
* Secure database configuration
* Input validation
* Proper error handling

## License

This project is currently under development. Licensing terms will be defined before production or commercial distribution.

## Author

**Wafa Afra**

GitHub: https://github.com/Wafaafra
