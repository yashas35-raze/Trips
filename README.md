# 🌍 TripVIEW — Coastal Karnataka Travel Guide

> A 3D-powered travel web application for discovering places, beaches, and hotels across Mangalore & Udupi.

---

## 📌 Overview

TripVIEW is a React-based travel guide that brings Coastal Karnataka to life through interactive 3D visualization, real-time maps, and a personalized favorites system. Users can explore curated destinations, get turn-by-turn directions, view 3D models of monuments, and save their favourite places — all backed by Firebase.

---

## ✨ Features

- **3D Rotating Earth Hero** — Three.js powered globe with a 10,000-star particle field on the landing page
- **Interactive Maps** — Leaflet + OpenStreetMap with place markers and image popups
- **Turn-by-Turn Directions** — Live routing from the user's location using the OSRM API
- **3D Monument Viewer** — Rotate and explore GLB models of Gomateshwara and Chaturmukha Basadi
- **Search & Filter** — Real-time filtering by name, category (Places / Beaches / Hotels), and city
- **Favorites System** — Save places to your profile with real-time Firestore sync across devices
- **Authentication** — Email/password signup and login via Firebase Auth
- **Responsive Design** — Mobile-first CSS Grid layout that adapts across all screen sizes

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 18 + Vite |
| 3D Rendering | Three.js, @react-three/fiber, @react-three/drei |
| Maps | Leaflet, OpenStreetMap |
| Routing (Directions) | OSRM API |
| Backend / Auth | Firebase Authentication |
| Database | Cloud Firestore (real-time) |
| Page Navigation | React Router DOM v6 |
| Icons | React Icons |

---

## 📁 Project Structure
trip/
├── index.html
├── vite.config.js
├── public/
│   └── images/             # Static place photos
└── src/
├── main.jsx            # App entry point
├── App.jsx             # Routes + AuthProvider
├── firebase.js         # Firebase config
├── data.js             # Places, beaches, hotels data
├── styles.css          # Global styles
├── context/
│   └── AuthContext.jsx
├── components/
│   ├── LandingPage.jsx
│   ├── Landing3D.jsx       # Three.js Earth + starfield
│   ├── AuthModal.jsx
│   ├── MapView.jsx         # Leaflet + OSRM directions
│   ├── ModelViewer.jsx     # 3D GLB viewer
│   ├── PanoramaViewer.jsx  # 360° viewer
│   └── PlaceDetailPage.jsx
└── assets/
├── gomatesh.glb
├── Chaturmukha2.glb
└── low_poly_planet_earth.glb
---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yashas35-raze/Trips.git
cd Trips
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add Firebase config

Create a `.env` file in the root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Run locally

```bash
npm run dev
```

---

## 🗺️ How Key Features Work

**3D Earth Globe** — Three.js WebGLRenderer renders a low-poly Earth GLB model with a 10,000-particle starfield. requestAnimationFrame rotates both at different speeds for a parallax depth effect.

**Real-Time Favorites** — Each user has a Firestore document at `users/{uid}`. Firestore's `onSnapshot` pushes changes to the UI instantly. `arrayUnion` and `arrayRemove` handle adds and removals atomically.

**Route Directions** — Browser Geolocation API fetches the user's GPS coordinates. These are sent to the OSRM API which returns a GeoJSON polyline drawn on the Leaflet map.

---

## 🔮 Future Improvements

- Move place data from `data.js` to Firestore for dynamic content management
- Add lazy loading for the Three.js bundle to reduce initial load size
- Add Firestore security rules for production
- Write unit tests with React Testing Library

---

## 👤 Author

**Yashas**
- GitHub: [@yashas35-raze](https://github.com/yashas35-raze)
