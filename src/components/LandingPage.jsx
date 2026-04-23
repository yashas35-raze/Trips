// src/components/LandingPage.jsx

import React, { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHotel,
  FaUmbrellaBeach,
  FaMapMarkerAlt,
  FaHeart,
  FaRegHeart,
  FaUser,
  FaSignOutAlt,
  FaChevronDown
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

// Firebase Firestore Imports
import { doc, updateDoc, arrayUnion, arrayRemove, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase"; 

import Landing3D from "./Landing3D"; 
import AuthModal from "./AuthModal";
import { useAuth } from "../context/AuthContext";
import { placesData, beachesData, hotelsData } from "../data.js";

/* -----------------------
   Small reusable helpers
------------------------*/
const flattenAll = () => [
  ...placesData.map((p) => ({ ...p, category: "place" })),
  ...beachesData.map((b) => ({ ...b, category: "beach" })),
  ...hotelsData.map((h) => ({ ...h, category: "hotel" })),
];

const highlight = (text, q) => {
  if (!q) return text;
  const re = new RegExp(`(${q})`, "ig");
  return text.split(re).map((s, idx) =>
    re.test(s) ? (
      <mark key={idx} style={{ background: "rgba(0,224,255,0.3)", color: "#000", borderRadius: 2 }}>
        {s}
      </mark>
    ) : (
      <span key={idx}>{s}</span>
    )
  );
};

/* ------------------------------------------------------
   Main Landing Page component
------------------------------------------------------*/
export default function LandingPage() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  
  // Auth Modal State
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  // Dropdown State
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Data & Search State
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all"); 
  const [onlyCity, setOnlyCity] = useState("any"); 
  
  // Favorites State (Set of IDs)
  const [favorites, setFavorites] = useState(new Set());

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ---------------------------------------------------------
  //  FIREBASE FAVORITES LOGIC (Real-time Sync)
  // ---------------------------------------------------------
  useEffect(() => {
    if (!currentUser) {
      setFavorites(new Set()); // Clear favorites on logout
      return;
    }

    const userDocRef = doc(db, "users", currentUser.uid);
    
    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        if (userData.favorites && Array.isArray(userData.favorites)) {
          setFavorites(new Set(userData.favorites));
        }
      }
    }, (error) => {
      console.error("Error fetching favorites:", error);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const toggleFavorite = async (e, itemId) => {
    e.stopPropagation(); // Prevent card click triggers navigation
    
    if (!currentUser) {
      setAuthMode("login");
      setAuthOpen(true);
      return;
    }

    setFavorites(prev => {
      const newFavs = new Set(prev);
      if (newFavs.has(itemId)) newFavs.delete(itemId);
      else newFavs.add(itemId);
      return newFavs;
    });

    const userDocRef = doc(db, "users", currentUser.uid);
    const isFav = favorites.has(itemId); 

    try {
      if (isFav) {
        await updateDoc(userDocRef, { favorites: arrayRemove(itemId) });
      } else {
        await setDoc(userDocRef, { favorites: arrayUnion(itemId) }, { merge: true });
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  // Flatten Data
  const allItems = useMemo(flattenAll, []);

  // Handlers
  const handleLogout = async () => {
    try {
      await logout();
      setProfileDropdownOpen(false);
      setCategory("all"); 
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  // --- FIXED: Debugging added here ---
  const handleCardClick = (id) => {
    console.log("Card clicked! Navigating to ID:", id); // Check your console F12
    if (id) {
      navigate(`/place/${id}`);
    } else {
      console.error("Error: Item ID is missing");
    }
  };

  // Filtering Logic
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allItems.filter((item) => {
      if (category === "favorites") {
        if (!favorites.has(item.id)) return false;
      } else if (category !== "all" && item.category !== category) {
        return false;
      }
      if (onlyCity !== "any" && item.city.toLowerCase().indexOf(onlyCity.toLowerCase()) === -1) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        (item.tag && item.tag.toLowerCase().includes(q)) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.city && item.city.toLowerCase().includes(q))
      );
    });
  }, [allItems, query, category, onlyCity, favorites]);

  const counts = useMemo(() => {
    return {
      all: allItems.length,
      places: placesData.length,
      beaches: beachesData.length,
      hotels: hotelsData.length,
      favorites: favorites.size
    };
  }, [allItems.length, favorites.size]);

  const getUserDisplayName = () => {
    if (!currentUser) return "";
    if (currentUser.name) return currentUser.name;
    if (currentUser.displayName) return currentUser.displayName;
    return currentUser.email ? currentUser.email.split('@')[0] : "User";
  };

  const getUserAvatar = () => {
    if (!currentUser) return null;
    if (currentUser.avatar) return currentUser.avatar;
    if (currentUser.photoURL) return currentUser.photoURL;
    return `https://api.dicebear.com/7.x/thumbs/svg?seed=${currentUser.uid || 'default'}`;
  }

  return (
    <div className="app-container">
      <style>{`
        .app-container { font-family: 'Inter', sans-serif; color: #1f2937; background: #f9fafb; min-height: 100vh; }
        .nav-container {
          position: relative; z-index: 50; display: flex; justify-content: space-between; alignItems: center;
          padding: 24px 40px; max-width: 1400px; margin: 0 auto;
        }
        .hero-title {
          font-size: 56px; font-weight: 800; margin-bottom: 16px; color: white; letter-spacing: -1px;
          text-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }
        .hero-sub {
          font-size: 18px; color: rgba(255,255,255,0.9); max-width: 600px; margin: 0 auto 40px; line-height: 1.6;
        }
        .search-wrapper {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 24px;
          padding: 8px;
          display: flex;
          align-items: center;
          max-width: 860px;
          margin: 0 auto;
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5);
        }
        .search-input-group { flex: 1; display: flex; align-items: center; padding-left: 20px; }
        .search-divider { height: 32px; width: 1px; background: rgba(255,255,255,0.3); }
        .search-btn {
          background: #00e0ff; color: #000; border: none;
          padding: 14px 32px; border-radius: 20px; font-size: 16px; font-weight: 700;
          cursor: pointer; margin-left: 8px; transition: transform 0.1s;
        }
        .filter-container { margin-top: 32px; display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }
        @media (max-width: 768px) {
          .nav-container { padding: 20px; }
          .hero-title { font-size: 36px; }
          .hero-sub { font-size: 16px; margin-bottom: 30px; }
          .search-wrapper { flex-direction: column; border-radius: 16px; padding: 12px; gap: 12px; }
          .search-input-group { width: 100%; padding-left: 10px; box-sizing: border-box; }
          .search-divider { display: none; }
          .search-select { width: 100%; border-top: 1px solid rgba(255,255,255,0.1); padding: 10px 0; text-align: left; }
          .search-btn { width: 100%; margin-left: 0; padding: 12px; }
          .filter-container { gap: 8px; }
          .results-grid { grid-template-columns: 1fr; }
        }
        ::placeholder { color: rgba(255,255,255,0.7) !important; }
      `}</style>

      <AuthModal isOpen={isAuthOpen} onClose={() => setAuthOpen(false)} initialMode={authMode} />

      <header style={{ position: "relative", width: "100%", overflow: "hidden", background: "#020205", paddingBottom: 60 }}>
        <div style={{ position: "absolute", inset: 0, height: "100%", zIndex: 0 }}>
           <Landing3D />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(2,2,5,0.3) 0%, rgba(2,2,5,0.8) 80%, #f9fafb 100%)", zIndex: 1, pointerEvents: "none" }} />

        <nav className="nav-container">
          <div style={{ color: "white", fontWeight: 800, fontSize: 28, letterSpacing: "-0.5px" }}>
            trip<span style={{ color: "#00e0ff" }}>VIEW</span>
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            {currentUser ? (
              <div style={{ position: "relative" }} ref={dropdownRef}>
                <button 
                  onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
                  style={{
                    display: "flex", alignItems: "center", gap: 10, 
                    background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.1)",
                    padding: "6px 12px 6px 6px", borderRadius: 999, color: "white", cursor: "pointer",
                    transition: "all 0.2s", backdropFilter: "blur(4px)"
                  }}
                >
                  <img src={getUserAvatar()} alt="avatar" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(255,255,255,0.2)" }} />
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{getUserDisplayName()}</span>
                  <FaChevronDown size={12} style={{ opacity: 0.7 }} />
                </button>
                {isProfileDropdownOpen && (
                  <div style={{
                    position: "absolute", top: "120%", right: 0, width: 220,
                    background: "white", borderRadius: 12, boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                    overflow: "hidden", zIndex: 100, animation: "fadeIn 0.2s ease"
                  }}>
                    <div style={{ padding: "16px", borderBottom: "1px solid #f3f4f6" }}>
                      <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 2 }}>Signed in as</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#111", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {currentUser.email}
                      </div>
                    </div>
                    <button style={dropdownItemStyle}><FaUser size={14} /> My Profile</button>
                    <button onClick={handleLogout} style={{ ...dropdownItemStyle, color: "#ef4444" }}><FaSignOutAlt size={14} /> Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button onClick={() => { setAuthMode("login"); setAuthOpen(true); }} style={navBtnStyle(false)}>Log in</button>
                <button onClick={() => { setAuthMode("signup"); setAuthOpen(true); }} style={navBtnStyle(true)}>Sign up</button>
              </>
            )}
          </div>
        </nav>

        <div style={{ position: "relative", zIndex: 10, textAlign: "center", paddingTop: 60, paddingBottom: 40, paddingLeft: 20, paddingRight: 20 }}>
          <h1 className="hero-title">Discover Coastal <span style={{ color: "#00e0ff" }}>Karnataka</span></h1>
          <p className="hero-sub">Curated beaches, temples, and luxury stays in Mangalore & Udupi.</p>
          <div className="search-wrapper">
            <div className="search-input-group">
              <FiSearch size={22} color="white" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search places, hotels, or vibes..." style={{ width: "100%", border: "none", outline: "none", fontSize: 16, padding: "12px 16px", background: "transparent", color: "white" }} />
            </div>
            <div className="search-divider"></div>
            <div className="search-select">
              <select value={onlyCity} onChange={(e) => setOnlyCity(e.target.value)} style={cleanSelectStyle}>
                <option value="any">Any City</option>
                <option value="Mangalore">Mangalore</option>
                <option value="Udupi">Udupi</option>
              </select>
            </div>
            <button className="search-btn">Search</button>
          </div>
          <div className="filter-container">
             <FilterPill label="All" count={counts.all} active={category === "all"} onClick={() => setCategory("all")} />
             <FilterPill label="Places" count={counts.places} active={category === "place"} onClick={() => setCategory("place")} />
             <FilterPill label="Beaches" count={counts.beaches} active={category === "beach"} onClick={() => setCategory("beach")} />
             <FilterPill label="Hotels" count={counts.hotels} active={category === "hotel"} onClick={() => setCategory("hotel")} />
             <div style={{ width: 1, background: "rgba(255,255,255,0.2)", margin: "0 10px", display: window.innerWidth < 768 ? 'none' : 'block' }}></div>
             <button 
               onClick={() => currentUser ? setCategory("favorites") : setAuthOpen(true)}
               style={{
                 display: "flex", alignItems: "center", gap: 8,
                 background: category === "favorites" ? "#f43f5e" : "rgba(255,255,255,0.1)",
                 border: "none", borderRadius: 50, padding: "8px 20px",
                 color: "white", fontWeight: 600, fontSize: 14, cursor: "pointer",
                 transition: "all 0.2s"
               }}
             >
               <FaHeart /> My Favorites <span style={{ opacity: 0.8, fontSize: 12, marginLeft: 4 }}>{counts.favorites}</span>
             </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1280, margin: "-40px auto 0", padding: "0 24px 80px", position: "relative", zIndex: 20 }}>
        {results.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px", background: "white", borderRadius: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
             <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
             <h3 style={{ fontSize: 20, color: "#1e293b", marginBottom: 8 }}>No matches found</h3>
             <p style={{ color: "#64748b" }}>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="results-grid">
            {results.map(item => (
              <div 
                key={item.id} 
                onClick={() => handleCardClick(item.id)}
                style={{
                  background: "white", borderRadius: 20, overflow: "hidden",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                  cursor: "pointer", position: "relative", transition: "transform 0.2s",
                  border: "1px solid #f1f5f9"
                }}
                onMouseEnter={(e) => { if(window.innerWidth > 768) e.currentTarget.style.transform = "translateY(-5px)"; }}
                onMouseLeave={(e) => { if(window.innerWidth > 768) e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
                  <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", left: 12, top: 12, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", color: "white", padding: "6px 10px", borderRadius: 8, display: "flex", gap: 6, alignItems: "center", fontSize: 12, fontWeight: 600 }}>
                    {item.category === "hotel" ? <FaHotel /> : item.category === "beach" ? <FaUmbrellaBeach /> : <FaMapMarkerAlt />}
                    <span>{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</span>
                  </div>
                  <button onClick={(e) => toggleFavorite(e, item.id)} style={{ position: "absolute", right: 12, top: 12, width: 36, height: 36, borderRadius: "50%", background: "white", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
                    {favorites.has(item.id) ? <FaHeart color="#ef4444" size={18} /> : <FaRegHeart color="#64748b" size={18} />}
                  </button>
                </div>
                <div style={{ padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 8 }}>
                    <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#1e293b", lineHeight: 1.3 }}>{highlight(item.name, query)}</h3>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12, fontSize: 13, color: "#64748b" }}>
                    <FaMapMarkerAlt size={12} /> {item.city}
                  </div>
                  <p style={{ margin: 0, color: "#475569", fontSize: 14, lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {highlight(item.description, query)}
                  </p>
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#0ea5e9", background: "#e0f2fe", padding: "4px 8px", borderRadius: 4 }}>{item.tag || "Popular"}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>View Details →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer style={{ textAlign: "center", padding: "40px 20px", color: "#94a3b8", fontSize: 14 }}>
        © {new Date().getFullYear()} TripVIEW — Premium Coastal Guide
      </footer>
    </div>
  );
}

const FilterPill = ({ label, count, active, onClick }) => (
  <button onClick={onClick} style={{ background: active ? "white" : "rgba(255,255,255,0.1)", color: active ? "#0f172a" : "white", border: "none", padding: "8px 16px", borderRadius: 50, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s ease" }}>
    {label} <span style={{ fontSize: 11, background: active ? "#e2e8f0" : "rgba(255,255,255,0.2)", padding: "2px 6px", borderRadius: 10, color: active ? "#0f172a" : "white" }}>{count}</span>
  </button>
);

const navBtnStyle = (primary) => ({ padding: "10px 20px", borderRadius: 99, border: primary ? "none" : "1px solid rgba(255,255,255,0.3)", background: primary ? "#00e0ff" : "transparent", color: primary ? "#0f172a" : "white", fontWeight: 700, cursor: "pointer", fontSize: 14, transition: "all 0.2s" });
const dropdownItemStyle = { display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "12px 16px", background: "transparent", border: "none", textAlign: "left", cursor: "pointer", color: "#374151", fontSize: 14, fontWeight: 500, transition: "background 0.1s" };
const cleanSelectStyle = { border: "none",borderRadius:"20px", outline: "none", background: "white", fontSize: 15, fontWeight: 500, color: "black", padding: "0 16px", cursor: "pointer", width: "100%" };