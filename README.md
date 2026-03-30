# 📏 Quantity Measurement App - Frontend

A simple web app to **compare, convert, and perform arithmetic operations** on different units of measurement like **Length, Weight, Temperature, and Volume**. 

---

## 📂 Project Structure

```bash
QuantityMeasurementApp-Frontend/
│
├── index.html          # Login & Signup page
├── dashboard.html      # Main app page
│
├── css/
│   ├── auth.css        # Styles for login/signup page
│   └── dashboard.css   # Styles for main app page
│
└── js/
    ├── auth.js         # Logic for login/signup
    └── dashboard.js    # Logic for main app
```

---

## 📄 Pages

### 🔐 1. index.html — Login & Signup Page

This is the first page the user sees with two tabs:

#### 🔹 Login Tab

* Email input
* Password input (with show/hide eye icon)
* Login button
* Switch to Signup

#### 🔹 Signup Tab

* Full Name
* Email
* Password (with validation)
* Mobile Number (10 digits only)
* Signup button

#### ✅ Validation Rules

* Email must be valid (`example@mail.com`)
* Password:

  * Minimum 6 characters
  * At least 1 uppercase, 1 lowercase, 1 special character
* Mobile: exactly 10 digits
* Errors shown below fields

#### 💾 Data Storage

* Stored in **localStorage**
* Key: `qm_user`

#### 🔄 After Success

➡️ Redirect to `dashboard.html`

---

### 📊 2. dashboard.html — Main App Page

#### 🔹 Section 1: Choose Type

* 📏 Length
* ⚖️ Weight
* 🌡️ Temperature
* 🧴 Volume

👉 Selected card → teal border
👉 Hover → blue border

---

#### 🔹 Section 2: Choose Action

* Comparison
* Conversion
* Arithmetic

👉 Active button → blue

---

## ⚙️ Features

### 🔍 Comparison

* Compare two values
* Example: `1 Kilometer > 500 Meter`

---

### 🔁 Conversion

* Convert one unit to another
* Example: `1 Kilometer = 1000 Meter`

---

### ➕ Arithmetic

* Add, Subtract, Multiply, Divide
* Example:

  ```
  1 Kilometer + 1 Kilometer = 2 Kilometer
  ```

---

## 📐 Measurement Units

### 📏 Length (in meters)

| Unit       | Factor  |
| ---------- | ------- |
| Kilometer  | 1000    |
| Meter      | 1       |
| Centimeter | 0.01    |
| Millimeter | 0.001   |
| Mile       | 1609.34 |
| Foot       | 0.3048  |
| Inch       | 0.0254  |

---

### ⚖️ Weight (in kilograms)

| Unit      | Factor    |
| --------- | --------- |
| Kilogram  | 1         |
| Gram      | 0.001     |
| Milligram | 0.000001  |
| Pound     | 0.453592  |
| Ounce     | 0.0283495 |
| Tonne     | 1000      |

---

### 🌡️ Temperature

* Celsius
* Fahrenheit
* Kelvin

👉 Uses **formula-based conversion**

---

### 🧴 Volume (in liters)

| Unit       | Factor    |
| ---------- | --------- |
| Liter      | 1         |
| Milliliter | 0.001     |
| Gallon     | 3.78541   |
| Cup        | 0.236588  |
| Tablespoon | 0.0147868 |

---

## 📜 JavaScript Files

### 🔹 auth.js

Handles authentication:

* switchTab()
* togglePw()
* isValidEmail()
* setError()
* clearAllErrors()
* doLogin()
* doSignup()

---

### 🔹 dashboard.js

Handles app logic:

* selectType()
* selectAction()
* populateSelects()
* compute()
* computeComparison()
* computeConversion()
* computeArithmetic()
* convertUnits()
* convertTemp()
* logout()

---

## 🎨 CSS Files

### 🔹 auth.css

* Login UI styling
* Tabs, forms, buttons

### 🔹 dashboard.css

* Layout, cards, panels
* Result display

---

## ▶️ How to Run

```bash
1. Open index.html in browser
2. Signup
3. Login
4. Use the app
```

👉 No backend required
👉 Runs fully in browser

---

## 🛠️ Technologies Used

* HTML
* CSS
* JavaScript (Vanilla)
* Google Fonts (Poppins)
* localStorage

---

## ⭐ Features Summary

✔ No backend required
✔ Clean UI
✔ Real-time calculations
✔ Multiple unit types
✔ Local storage authentication

---


