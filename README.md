# 🧩 Product Builder Engine (Next.js)

A modular **product configuration engine** built with Next.js.

This project turns a simple list of products into an **interactive decision system** where users can build a custom setup and receive real-time feedback on:

- selection completeness
- category balance
- build score
- recommendations
- total price

---

## 🧠 What this project is

Instead of a static e-commerce list, this system behaves like a **guided configuration engine**.

Each selection updates the system state and produces:

- 📊 Build progress (% completion)
- ⚖️ Category balance score
- 🧮 Overall build score (0–100)
- 💡 Smart recommendations
- 💰 Live total price calculation

---

## 🏗 Architecture

The project is split into 3 layers:

### 1. Engine (Home.tsx)
Handles all business logic:
- selected items state
- scoring system
- progress calculation
- recommendation engine
- price calculation

---

### 2. Selected Items Panel
Displays all currently selected products:
- list of chosen items
- price per item
- selection overview

---

### 3. Dashboard Panel
Provides real-time feedback:
- build progress
- build score
- recommendations
- total price + CTA

---

## 📦 Data Model

Products are defined in a configuration object:

```ts
gymConfig = {
  sections: [
    {
      id: "strength",
      title: "Strength",
      items: [
        { id, name, price }
      ]
    }
  ]
}
