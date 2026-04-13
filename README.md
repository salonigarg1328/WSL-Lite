# 🐧 WSL Lite — Modern UI for Windows Subsystem Setup

**WSL Lite** is a sleek, minimal React-based interface designed to make setting up and managing lightweight WSL (Windows Subsystem for Linux) environments simple and intuitive.  
It provides predefined profiles (CLI Lite, Dev Lite, and Data Lite) and lets you build your own custom environments with just a few clicks.

---

## 🚀 Features

- **🧱 Predefined Profiles**
  - **CLI Lite** – Minimal shell environment with essential tools like `bash`, `curl`, `git`, and `python3`.  
  - **Dev Lite** – Developer-focused setup with compilers, build tools, and Node.js.  
  - **Data Lite** – Lightweight Python stack for data workflows (`numpy`, `pandas`, `matplotlib`).

- **🧩 Custom Profile Builder**  
  Pick and install exactly the packages you need using the custom selection interface.

- **💡 Dynamic Hover Popups**  
  Instantly preview each profile’s toolset with elegant Framer Motion animations.

- **⚙️ Smooth Install Flow**  
  Installs run via a backend (`/install-profile` endpoint), with real-time logs and progress tracking.

- **🎨 Modern UI Stack**
  - Built with **React + Tailwind CSS + Framer Motion**
  - Responsive design and fluid transitions
  - Icons dynamically rendered for each package

---

## ⚙️ Installation & Setup

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Run the Backend
```bash
cd backend
node server.js
```
✅ This starts the backend on port `5000`, ready to handle installation requests.

### 4️⃣ Run the Frontend
```bash
cd ..
npm start
```
Access the app at **http://localhost:3000**.

---

## 🧩 Usage
![demo](demo.gif)


1. Launch the UI.  
2. Scroll or click to switch between:
   - **Home View** – Introduction and navigation
   - **Profile Selection** – Choose a predefined or custom setup  
3. Hover over a profile to see included libraries.  
4. Click **Install** to begin setup.  
   The backend will handle package installation and show a live progress log.

---

## 📡 Backend API

### POST `/install-profile`

**Request Body**
```json
{
  "profileName": "cli-lite",
  "packages": ["bash", "curl", "git", "python3"]
}
```

**Response**
- Logs installation progress.
- Returns success or error message.

---

## 🎨 UI Highlights

- **Animated Slide Transitions** using Framer Motion  
- **Responsive Popup Windows** with smooth hover detection  
- **Custom Icons** for all supported libraries  
- **Lightweight State Management** with React hooks  

---

## 🧭 Clone and Update the Repository

### 📥 Clone the Repository
To get started, clone the WSL Lite project from GitHub:
```bash
git clone https://github.com/salonigarg1328/WSL-Lite.git
cd wsl-lite
```
---
## Deploy Link
https://wsl-lite.vercel.app/

---
---

## 🌟 Acknowledgements

- Built with ❤️ using **React** and **Framer Motion**  
- Inspired by minimal WSL workflows  
- Designed for developers who love clean UI and fast setups  
