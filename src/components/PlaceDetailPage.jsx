// import React, { useState, useEffect, Suspense } from "react";
// import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
// import { placesData, beachesData, hotelsData } from "../data.js"; 
// import { 
//   FaClock, FaTicketAlt, FaHistory, FaStar, FaMapMarkerAlt, 
//   FaShareAlt, FaRoad, FaUtensils, FaCloudSun, FaSuitcase, 
//   FaCube, FaImages, FaArrowLeft, FaTimes, FaExpand 
// } from "react-icons/fa"; // Added FaArrowLeft, FaTimes, FaExpand

// // Lazy Load Components
// const MapView = React.lazy(() => import("../components/MapView"));
// const ModelViewer = React.lazy(() => import("../components/ModelViewer"));

// // Combine all data
// const allData = [...placesData, ...beachesData, ...hotelsData];

// // --- Helper Components ---
// const RequirementBadge = ({ icon: Icon, label, value, color = "#3b82f6" }) => (
//   <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fff', padding: '12px', borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
//     <div style={{ background: `${color}20`, padding: 10, borderRadius: '50%', color: color }}>
//         <Icon size={16} />
//     </div>
//     <div>
//         <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', fontWeight: 700, letterSpacing: 0.5 }}>{label}</div>
//         <div style={{ fontWeight: 600, color: '#334155', fontSize: 14 }}>{value}</div>
//     </div>
//   </div>
// );

// export default function PlaceDetailPage() {
//   const { id } = useParams();
//   const navigate = useNavigate(); // For Back Button logic
//   const place = allData.find((p) => p.id === id) || placesData[3]; // Fallback for demo

//   // State
//   const [imgSrc, setImgSrc] = useState(place?.image);
//   const [viewMode, setViewMode] = useState('photos'); // 'photos' or '3d'
  
//   // Modal State
//   const [modalImage, setModalImage] = useState(null); // Holds the URL of the image to show full screen

//   // 1. Scroll to top on mount
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [id]); // Re-run if ID changes

//   useEffect(() => { setImgSrc(place?.image); }, [place]);

//   // Use place photos or fallback placeholders
//   const extraPhotos = place.photos && place.photos.length >= 3 
//     ? place.photos.slice(0, 3) 
//     : [
//         `https://source.unsplash.com/random/800x600/?${place.type},1`,
//         `https://source.unsplash.com/random/800x600/?${place.type},2`,
//         `https://source.unsplash.com/random/800x600/?${place.type},3`
//       ];

//   // Mock Model URL
//   const modelUrl = place.modelUrl || "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb";

//   if (!place) return <div>Place not found</div>;

//   return (
//     <div style={{ background: "#f8f9fa", minHeight: "100vh", paddingBottom: 60, fontFamily: "'Inter', sans-serif" }}>
      
//       {/* --- FULL SCREEN IMAGE MODAL --- */}
//       {modalImage && (
//         <div 
//             style={{
//                 position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
//                 background: 'rgba(0,0,0,0.9)', zIndex: 9999,
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 animation: 'fadeIn 0.3s ease'
//             }}
//             onClick={() => setModalImage(null)} // Click outside to close
//         >
//             {/* Close Button */}
//             <button 
//                 onClick={() => setModalImage(null)}
//                 style={{
//                     position: 'absolute', top: 20, right: 20,
//                     background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%',
//                     width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center',
//                     cursor: 'pointer', color: 'white', transition: '0.2s'
//                 }}
//             >
//                 <FaTimes size={24} />
//             </button>

//             {/* Full Image */}
//             <img 
//                 src={modalImage} 
//                 alt="Full Screen" 
//                 style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain', borderRadius: 8 }}
//                 onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
//             />
//         </div>
//       )}

//       {/* --- HERO HEADER --- */}
//       <div style={{ position: "relative", height: "50vh", minHeight: "400px", background: '#222' }}>
        
//         {/* 2. Back Button */}
//         <button 
//             onClick={() => navigate(-1)} 
//             style={{
//                 position: 'absolute', top: 20, left: 20, zIndex: 10,
//                 background: 'white', border: 'none', borderRadius: '50%',
//                 width: 45, height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
//             }}
//         >
//             <FaArrowLeft size={18} color="#333" />
//         </button>

//         <img 
//             src={imgSrc} 
//             alt={place.name} 
//             onError={(e) => e.target.src='https://source.unsplash.com/random/1200x600/?landmark'}
//             style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} 
//         />
//         <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)", padding: "60px 20px 30px" }}>
//             <div style={{ maxWidth: 1200, margin: "0 auto", color: "white" }}>
//                 <span style={{ background: "#E63946", padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
//                     {place.tag || "MONUMENT"}
//                 </span>
//                 <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", margin: "12px 0", fontWeight: 800, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
//                     {place.name}
//                 </h1>
//                 <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", fontSize: "1.1rem" }}>
//                     <div style={{ display: "flex", alignItems: "center", gap: 8 }}><FaMapMarkerAlt color="#FCA311" /> {place.city}</div>
//                     <div style={{ display: "flex", alignItems: "center", gap: 8 }}><FaStar color="#FCA311" /> {place.rating} / 5.0</div>
//                 </div>
//             </div>
//         </div>
//       </div>

//       {/* --- MAIN CONTENT --- */}
//       <div style={{ maxWidth: 1200, margin: "0 auto", padding: "30px 20px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 30 }}>
          
//           {/* LEFT COLUMN */}
//           <div style={{ minWidth: '60%' }}>
            
//             {/* Description */}
//             <div style={{ background: 'white', padding: 30, borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
//                 <h2 style={{ marginTop: 0, color: '#1d3557' }}>About the Destination</h2>
//                 <p style={{ lineHeight: 1.8, color: "#4a5568", fontSize: "1.05rem" }}>{place.description}</p>
//             </div>

//             {/* --- MEDIA SECTION (Gallery & 3D) --- */}
//             <div style={{ marginTop: 30, background: 'white', padding: 30, borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                
//                 {/* Toggle Tabs */}
//                 <div style={{ display: 'flex', gap: 20, borderBottom: '1px solid #e2e8f0', marginBottom: 20 }}>
//                     <button 
//                         onClick={() => setViewMode('photos')}
//                         style={{ 
//                             padding: '0 0 12px', background: 'none', border: 'none', 
//                             borderBottom: viewMode === 'photos' ? '3px solid #E63946' : '3px solid transparent',
//                             fontWeight: 700, color: viewMode === 'photos' ? '#E63946' : '#718096',
//                             cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 16
//                         }}
//                     >
//                         <FaImages /> Photo Gallery
//                     </button>
//                     <button 
//                         onClick={() => setViewMode('3d')}
//                         style={{ 
//                             padding: '0 0 12px', background: 'none', border: 'none', 
//                             borderBottom: viewMode === '3d' ? '3px solid #E63946' : '3px solid transparent',
//                             fontWeight: 700, color: viewMode === '3d' ? '#E63946' : '#718096',
//                             cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 16
//                         }}
//                     >
//                         <FaCube /> 3D View
//                     </button>
//                 </div>

//                 {/* Content Area */}
//                 <div style={{ minHeight: 300 }}>
//                     {viewMode === 'photos' ? (
//                         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
//                             {extraPhotos.map((photo, idx) => (
//                                 <div key={idx} style={{ position: 'relative', aspectRatio: '4/3', borderRadius: 8, overflow: 'hidden', cursor: 'pointer' }}>
//                                     <img 
//                                         src={photo} 
//                                         alt={`View ${idx+1}`} 
//                                         style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
//                                         onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
//                                         onMouseOut={e => e.target.style.transform = 'scale(1)'}
//                                         onClick={() => setImgSrc(photo)} // Click to set as hero
//                                     />
//                                     {/* 3. Full Screen Trigger Button on Thumbnail */}
//                                     <button 
//                                         onClick={(e) => { e.stopPropagation(); setModalImage(photo); }}
//                                         style={{
//                                             position: 'absolute', top: 5, right: 5,
//                                             background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none',
//                                             borderRadius: 4, padding: 6, cursor: 'pointer', display: 'flex'
//                                         }}
//                                         title="View Fullscreen"
//                                     >
//                                         <FaExpand size={12} />
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <div style={{ height: 400, background: '#f0f4f8', borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
//                             <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10, background: 'rgba(0,0,0,0.6)', color: 'white', padding: '4px 8px', borderRadius: 4, fontSize: 12 }}>
//                                 Use mouse to rotate & zoom
//                             </div>
//                             <Suspense fallback={<div style={{height:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>Loading 3D Engine...</div>}>
//                                 <ModelViewer modelPath={modelUrl} />
//                             </Suspense>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Requirements */}
//             <div style={{ marginTop: 30 }}>
//                 <h3 style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#1d3557' }}>
//                     <FaSuitcase color="#457b9d"/> Trip Requirements
//                 </h3>
//                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginTop: 16 }}>
//                     <RequirementBadge icon={FaCloudSun} label="Weather Forecast" value="28°C Sunny" color="#f59e0b" />
//                     <RequirementBadge icon={FaRoad} label="Road Condition" value="Good - Ghat Section" color="#64748b" />
//                     <RequirementBadge icon={FaUtensils} label="Food & Water" value="Limited Options Nearby" color="#e63946" />
//                 </div>

//                 <div style={{ marginTop: 20, padding: 20, background: '#fff5f5', borderRadius: 12, border: '1px solid #fed7d7' }}>
//                     <h4 style={{ fontSize: 15, color: '#c53030', margin: '0 0 12px 0' }}>🎒 Packing Checklist</h4>
//                     <ul style={{ margin: 0, paddingLeft: 20, color: '#9b2c2c', fontSize: 14.5, lineHeight: 1.6 }}>
//                         <li>Water bottles (Hydration is key on the climb)</li>
//                         <li>Comfortable walking shoes (approx 500 steps)</li>
//                         <li>Hat and Sunglasses (Open area)</li>
//                         <li>Cash (UPI might fluctuate)</li>
//                     </ul>
//                 </div>
//             </div>

//             {/* Visitor Info */}
//             <div style={{ background: 'white', padding: 30, borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginTop: 30 }}>
//                  <h3 style={{marginTop:0, color: '#1d3557'}}>Visitor Information</h3>
//                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 20 }}>
//                     {[
//                         {icon: FaClock, l: "Opening Hours", v: place.openingHours},
//                         {icon: FaTicketAlt, l: "Entry Fee", v: place.ticketPrice},
//                         {icon: FaHistory, l: "Duration", v: place.duration}
//                     ].map((item, i) => (
//                         <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, borderBottom: i<2?'1px solid #edf2f7':'none', paddingBottom: i<2?12:0 }}>
//                             <item.icon color="#a0aec0" size={18} />
//                             <div>
//                                 <span style={{fontWeight: 700, color: '#2d3748', marginRight: 8}}>{item.l}:</span>
//                                 <span style={{color: '#4a5568'}}>{item.v}</span>
//                             </div>
//                         </div>
//                     ))}
//                  </div>
//             </div>
//           </div>

//           {/* RIGHT SIDEBAR (MAP) */}
//           <div style={{ minWidth: '300px' }}>
//              <div style={{ position: 'sticky', top: 20 }}>
                
//                 {/* MAP CARD */}
//                 <div style={{ height: 500, background: '#e2e8f0', borderRadius: 16, overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
//                     <Suspense fallback={<div style={{height:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>Loading Map...</div>}>
//                         <MapView places={[place]} />
//                     </Suspense>
//                 </div>

//                 {/* Quick Actions */}
//                 <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
//                     <button onClick={() => alert("Booking feature coming soon!")} style={{ background: '#E63946', color: 'white', border: 'none', padding: 14, borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>
//                         {place.bookingLink ? "Book Now" : "Check Options"}
//                     </button>
//                     <button onClick={() => {navigator.clipboard.writeText(window.location.href); alert("Link Copied!");}} style={{ background: 'white', border: '1px solid #cbd5e0', padding: 14, borderRadius: 8, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
//                         <FaShareAlt /> Share
//                     </button>
//                 </div>

//              </div>
//           </div>
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect, Suspense } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { placesData, beachesData, hotelsData } from "../data.js"; 
// import { 
//   FaClock, FaTicketAlt, FaHistory, FaStar, FaMapMarkerAlt, 
//   FaShareAlt, FaRoad, FaUtensils, FaCloudSun, FaSuitcase, 
//   FaCube, FaImages, FaArrowLeft, FaTimes, FaExpand, FaHeart, FaRegHeart 
// } from "react-icons/fa";

// // Firebase Imports
// import { doc, updateDoc, arrayUnion, arrayRemove, setDoc, onSnapshot } from "firebase/firestore";
// import { db } from "../firebase"; 
// import { useAuth } from "../context/AuthContext";
// import AuthModal from "./AuthModal"; // Ensure you have this component available

// // Lazy Load Components
// const MapView = React.lazy(() => import("../components/MapView"));
// const ModelViewer = React.lazy(() => import("../components/ModelViewer"));

// // Combine all data
// const allData = [...placesData, ...beachesData, ...hotelsData];

// // --- Helper Component: Requirement Badge ---
// const RequirementBadge = ({ icon: Icon, label, value, color = "#3b82f6" }) => (
//   <div className="req-badge">
//     <div style={{ background: `${color}20`, padding: 10, borderRadius: '50%', color: color }}>
//         <Icon size={16} />
//     </div>
//     <div>
//         <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', fontWeight: 700, letterSpacing: 0.5 }}>{label}</div>
//         <div style={{ fontWeight: 600, color: '#334155', fontSize: 14 }}>{value}</div>
//     </div>
//   </div>
// );

// export default function PlaceDetailPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { currentUser } = useAuth();

//   // Find Place (Loose equality for string vs number IDs)
//   // eslint-disable-next-line eqeqeq
//   const place = allData.find((p) => p.id == id) || placesData[0]; 

//   // --- State ---
//   const [imgSrc, setImgSrc] = useState(place?.image);
//   const [viewMode, setViewMode] = useState('photos'); 
//   const [modalImage, setModalImage] = useState(null);
//   const [isFavorite, setIsFavorite] = useState(false);
  
//   // Auth Modal State (if user tries to fav without login)
//   const [isAuthOpen, setAuthOpen] = useState(false);

//   // --- Effects ---

//   // 1. Scroll to top
//   useEffect(() => { window.scrollTo(0, 0); }, [id]);

//   // 2. Update Image if place changes
//   useEffect(() => { setImgSrc(place?.image); }, [place]);

//   // 3. Firebase: Check if this specific place is in favorites
//   useEffect(() => {
//     if (!currentUser) {
//       setIsFavorite(false);
//       return;
//     }

//     const userDocRef = doc(db, "users", currentUser.uid);
//     const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
//       if (docSnapshot.exists()) {
//         const data = docSnapshot.data();
//         if (data.favorites && Array.isArray(data.favorites)) {
//           // Check if current ID exists in the array
//           // eslint-disable-next-line eqeqeq
//           const isFav = data.favorites.some(favId => favId == id);
//           setIsFavorite(isFav);
//         }
//       }
//     });

//     return () => unsubscribe();
//   }, [currentUser, id]);

//   // --- Handlers ---

//   const toggleFavorite = async () => {
//     if (!currentUser) {
//       setAuthOpen(true);
//       return;
//     }

//     // Optimistic UI Update
//     setIsFavorite(!isFavorite);

//     const userDocRef = doc(db, "users", currentUser.uid);
//     try {
//       if (isFavorite) {
//         // Remove
//         await updateDoc(userDocRef, { favorites: arrayRemove(place.id) });
//       } else {
//         // Add
//         await setDoc(userDocRef, { favorites: arrayUnion(place.id) }, { merge: true });
//       }
//     } catch (error) {
//       console.error("Error updating favorite:", error);
//       setIsFavorite(!isFavorite); // Revert on error
//     }
//   };

//   // --- Data Prep ---
//   const extraPhotos = place.photos && place.photos.length >= 3 
//     ? place.photos.slice(0, 3) 
//     : [
//         `https://source.unsplash.com/random/800x600/?${place.type || 'nature'},1`,
//         `https://source.unsplash.com/random/800x600/?${place.type || 'nature'},2`,
//         `https://source.unsplash.com/random/800x600/?${place.type || 'nature'},3`
//       ];

//   const modelUrl = place.modelUrl || "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb";

//   if (!place) return <div>Place not found</div>;

//   return (
//     <div className="page-container">
//       {/* --- CSS STYLES FOR RESPONSIVENESS --- */}
//       <style>{`
//         .page-container { background: #f8f9fa; min-height: 100vh; font-family: 'Inter', sans-serif; padding-bottom: 80px; }
        
//         /* Layout Grid */
//         .content-grid {
//           max-width: 1200px; margin: 0 auto; padding: 30px 20px;
//           display: grid; grid-template-columns: 1fr; gap: 30px;
//         }
//         @media (min-width: 900px) {
//           .content-grid { grid-template-columns: 2fr 1fr; }
//         }

//         /* Requirements Grid */
//         .req-grid { display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 16px; }
//         @media (min-width: 600px) {
//           .req-grid { grid-template-columns: repeat(3, 1fr); }
//         }

//         /* Requirement Badge */
//         .req-badge {
//           display: flex; align-items: center; gap: 12px; background: #fff; 
//           padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; 
//           box-shadow: 0 1px 2px rgba(0,0,0,0.05);
//         }

//         /* Hero Text */
//         .hero-title {
//           font-size: 2.5rem; margin: 12px 0; fontWeight: 800; text-shadow: 0 2px 10px rgba(0,0,0,0.5);
//         }
//         @media (max-width: 600px) {
//           .hero-title { font-size: 1.8rem; }
//         }

//         /* Mobile Sticky Actions */
//         .mobile-sticky-actions {
//           display: none;
//           position: fixed; bottom: 0; left: 0; width: 100%;
//           background: white; padding: 12px 20px;
//           box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
//           z-index: 100;
//           display: flex; gap: 10px;
//         }
//         @media (min-width: 900px) {
//           .mobile-sticky-actions { display: none !important; }
//         }
        
//         /* Desktop Actions */
//         .desktop-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 20px; }
//         @media (max-width: 899px) {
//           .desktop-actions { display: none; }
//         }

//         /* Gallery Grid */
//         .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
//         @media (max-width: 500px) {
//           .gallery-grid { grid-template-columns: 1fr; }
//         }
//       `}</style>

//       <AuthModal isOpen={isAuthOpen} onClose={() => setAuthOpen(false)} initialMode="login" />

//       {/* --- FULL SCREEN IMAGE MODAL --- */}
//       {modalImage && (
//         <div 
//             style={{
//                 position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
//                 background: 'rgba(0,0,0,0.95)', zIndex: 9999,
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 animation: 'fadeIn 0.3s ease'
//             }}
//             onClick={() => setModalImage(null)}
//         >
//             <button 
//                 onClick={() => setModalImage(null)}
//                 style={{
//                     position: 'absolute', top: 20, right: 20,
//                     background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%',
//                     width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center',
//                     cursor: 'pointer', color: 'white', transition: '0.2s'
//                 }}
//             >
//                 <FaTimes size={24} />
//             </button>
//             <img 
//                 src={modalImage} 
//                 alt="Full Screen" 
//                 style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain', borderRadius: 8 }}
//                 onClick={(e) => e.stopPropagation()} 
//             />
//         </div>
//       )}

//       {/* --- HERO HEADER --- */}
//       <div style={{ position: "relative", height: "50vh", minHeight: "350px", background: '#222' }}>
        
//         {/* Back Button */}
//         <button 
//             onClick={() => navigate(-1)} 
//             style={{
//                 position: 'absolute', top: 20, left: 20, zIndex: 10,
//                 background: 'white', border: 'none', borderRadius: '50%',
//                 width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
//             }}
//         >
//             <FaArrowLeft size={16} color="#333" />
//         </button>

//         {/* Favorite Button (Top Right) */}
//         <button 
//             onClick={toggleFavorite}
//             style={{
//                 position: 'absolute', top: 20, right: 20, zIndex: 10,
//                 background: 'white', border: 'none', borderRadius: '50%',
//                 width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
//                 transition: 'transform 0.1s'
//             }}
//             onMouseDown={e => e.currentTarget.style.transform = 'scale(0.9)'}
//             onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
//         >
//             {isFavorite ? <FaHeart size={20} color="#E63946" /> : <FaRegHeart size={20} color="#64748b" />}
//         </button>

//         <img 
//             src={imgSrc} 
//             alt={place.name} 
//             onError={(e) => e.target.src='https://source.unsplash.com/random/1200x600/?landmark'}
//             style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} 
//         />
        
//         <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)", padding: "60px 20px 30px" }}>
//             <div style={{ maxWidth: 1200, margin: "0 auto", color: "white" }}>
//                 <span style={{ background: "#E63946", padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
//                     {place.tag || "DESTINATION"}
//                 </span>
//                 <h1 className="hero-title">
//                     {place.name}
//                 </h1>
//                 <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", fontSize: "1rem" }}>
//                     <div style={{ display: "flex", alignItems: "center", gap: 8 }}><FaMapMarkerAlt color="#FCA311" /> {place.city}</div>
//                     <div style={{ display: "flex", alignItems: "center", gap: 8 }}><FaStar color="#FCA311" /> {place.rating} / 5.0</div>
//                 </div>
//             </div>
//         </div>
//       </div>

//       {/* --- MAIN CONTENT GRID --- */}
//       <div className="content-grid">
          
//           {/* LEFT COLUMN */}
//           <div>
            
//             {/* Description */}
//             <div style={{ background: 'white', padding: 30, borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
//                 <h2 style={{ marginTop: 0, color: '#1d3557' }}>About the Destination</h2>
//                 <p style={{ lineHeight: 1.8, color: "#4a5568", fontSize: "1.05rem" }}>{place.description}</p>
//             </div>

//             {/* --- MEDIA SECTION (Gallery & 3D) --- */}
//             <div style={{ marginTop: 30, background: 'white', padding: 30, borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                
//                 {/* Toggle Tabs */}
//                 <div style={{ display: 'flex', gap: 20, borderBottom: '1px solid #e2e8f0', marginBottom: 20, overflowX: 'auto' }}>
//                     <button 
//                         onClick={() => setViewMode('photos')}
//                         style={{ 
//                             padding: '0 0 12px', background: 'none', border: 'none', 
//                             borderBottom: viewMode === 'photos' ? '3px solid #E63946' : '3px solid transparent',
//                             fontWeight: 700, color: viewMode === 'photos' ? '#E63946' : '#718096',
//                             cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 16, whiteSpace: 'nowrap'
//                         }}
//                     >
//                         <FaImages /> Photo Gallery
//                     </button>
//                     <button 
//                         onClick={() => setViewMode('3d')}
//                         style={{ 
//                             padding: '0 0 12px', background: 'none', border: 'none', 
//                             borderBottom: viewMode === '3d' ? '3px solid #E63946' : '3px solid transparent',
//                             fontWeight: 700, color: viewMode === '3d' ? '#E63946' : '#718096',
//                             cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 16, whiteSpace: 'nowrap'
//                         }}
//                     >
//                         <FaCube /> 3D View
//                     </button>
//                 </div>

//                 {/* Content Area */}
//                 <div style={{ minHeight: 300 }}>
//                     {viewMode === 'photos' ? (
//                         <div className="gallery-grid">
//                             {extraPhotos.map((photo, idx) => (
//                                 <div key={idx} style={{ position: 'relative', aspectRatio: '4/3', borderRadius: 8, overflow: 'hidden', cursor: 'pointer' }}>
//                                     <img 
//                                         src={photo} 
//                                         alt={`View ${idx+1}`} 
//                                         style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
//                                         onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
//                                         onMouseOut={e => e.target.style.transform = 'scale(1)'}
//                                         onClick={() => setImgSrc(photo)}
//                                     />
//                                     <button 
//                                         onClick={(e) => { e.stopPropagation(); setModalImage(photo); }}
//                                         style={{
//                                             position: 'absolute', top: 5, right: 5,
//                                             background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none',
//                                             borderRadius: 4, padding: 6, cursor: 'pointer'
//                                         }}
//                                     >
//                                         <FaExpand size={12} />
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <div style={{ height: 400, background: '#f0f4f8', borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
//                             <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10, background: 'rgba(0,0,0,0.6)', color: 'white', padding: '4px 8px', borderRadius: 4, fontSize: 12 }}>
//                                 Use mouse to rotate & zoom
//                             </div>
//                             <Suspense fallback={<div style={{height:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>Loading 3D Engine...</div>}>
//                                 <ModelViewer modelPath={modelUrl} />
//                             </Suspense>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Requirements */}
//             <div style={{ marginTop: 30 }}>
//                 <h3 style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#1d3557' }}>
//                     <FaSuitcase color="#457b9d"/> Trip Requirements
//                 </h3>
//                 <div className="req-grid">
//                     <RequirementBadge icon={FaCloudSun} label="Weather" value="28°C Sunny" color="#f59e0b" />
//                     <RequirementBadge icon={FaRoad} label="Roads" value="Good Condition" color="#64748b" />
//                     <RequirementBadge icon={FaUtensils} label="Food" value="Limited Options" color="#e63946" />
//                 </div>

//                 <div style={{ marginTop: 20, padding: 20, background: '#fff5f5', borderRadius: 12, border: '1px solid #fed7d7' }}>
//                     <h4 style={{ fontSize: 15, color: '#c53030', margin: '0 0 12px 0' }}>🎒 Packing Checklist</h4>
//                     <ul style={{ margin: 0, paddingLeft: 20, color: '#9b2c2c', fontSize: 14.5, lineHeight: 1.6 }}>
//                         <li>Water bottles (Hydration is key)</li>
//                         <li>Comfortable walking shoes</li>
//                         <li>Hat and Sunglasses</li>
//                         <li>Cash (UPI might fluctuate)</li>
//                     </ul>
//                 </div>
//             </div>

//             {/* Visitor Info */}
//             <div style={{ background: 'white', padding: 30, borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginTop: 30 }}>
//                 <h3 style={{marginTop:0, color: '#1d3557'}}>Visitor Information</h3>
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 20 }}>
//                     {[
//                         {icon: FaClock, l: "Opening Hours", v: place.openingHours},
//                         {icon: FaTicketAlt, l: "Entry Fee", v: place.ticketPrice},
//                         {icon: FaHistory, l: "Duration", v: place.duration}
//                     ].map((item, i) => (
//                         <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, borderBottom: i<2?'1px solid #edf2f7':'none', paddingBottom: i<2?12:0 }}>
//                             <item.icon color="#a0aec0" size={18} />
//                             <div>
//                                 <span style={{fontWeight: 700, color: '#2d3748', marginRight: 8}}>{item.l}:</span>
//                                 <span style={{color: '#4a5568'}}>{item.v}</span>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//           </div>

//           {/* RIGHT SIDEBAR (MAP) - Sticky on Desktop */}
//           <div style={{ minWidth: '300px' }}>
//             <div style={{ position: 'sticky', top: 20 }}>
                
//                 {/* MAP CARD */}
//                 <div style={{ height: 400, background: '#e2e8f0', borderRadius: 16, overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
//                     <Suspense fallback={<div style={{height:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>Loading Map...</div>}>
//                         <MapView places={[place]} />
//                     </Suspense>
//                 </div>

//                 {/* Desktop Actions */}
//                 <div className="desktop-actions">
//                     <button onClick={() => alert("Booking feature coming soon!")} style={{ background: '#E63946', color: 'white', border: 'none', padding: 14, borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>
//                         {place.bookingLink ? "Book Now" : "Check Options"}
//                     </button>
//                     <button onClick={() => {navigator.clipboard.writeText(window.location.href); alert("Link Copied!");}} style={{ background: 'white', border: '1px solid #cbd5e0', padding: 14, borderRadius: 8, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
//                         <FaShareAlt /> Share
//                     </button>
//                 </div>

//             </div>
//           </div>
//       </div>

//       {/* MOBILE STICKY BOTTOM BAR */}
//       <div className="mobile-sticky-actions">
//         <button onClick={() => {navigator.clipboard.writeText(window.location.href); alert("Link Copied!");}} style={{ flex: 1, background: 'white', border: '1px solid #cbd5e0', padding: 12, borderRadius: 8, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
//             <FaShareAlt /> Share
//         </button>
//         <button onClick={() => alert("Booking feature coming soon!")} style={{ flex: 2, background: '#E63946', color: 'white', border: 'none', padding: 12, borderRadius: 8, fontWeight: 700 }}>
//             Book Now
//         </button>
//       </div>
//     </div>
//   );
// }

// PlaceDetailPage.jsx
import React, { useState, useEffect, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { placesData, beachesData, hotelsData } from "../data.js";
import {
  FaClock,
  FaTicketAlt,
  FaHistory,
  FaStar,
  FaMapMarkerAlt,
  FaShareAlt,
  FaRoad,
  FaUtensils,
  FaCloudSun,
  FaSuitcase,
  FaCube,
  FaImages,
  FaArrowLeft,
  FaTimes,
  FaExpand,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";

// Firebase Imports
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal"; // Ensure you have this component available

// Lazy Load Components
const MapView = React.lazy(() => import("../components/MapView"));
const ModelViewer = React.lazy(() => import("../components/ModelViewer"));

// Combine all data
const allData = [...placesData, ...beachesData, ...hotelsData];

// --- Helper Component: Requirement Badge ---
const RequirementBadge = ({ icon: Icon, label, value, color = "#3b82f6" }) => (
  <div className="req-badge" style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <div style={{ background: `${color}20`, padding: 10, borderRadius: "50%", color: color }}>
      <Icon size={16} />
    </div>
    <div>
      <div
        style={{
          fontSize: 11,
          color: "#64748b",
          textTransform: "uppercase",
          fontWeight: 700,
          letterSpacing: 0.5,
        }}
      >
        {label}
      </div>
      <div style={{ fontWeight: 600, color: "#334155", fontSize: 14 }}>{value}</div>
    </div>
  </div>
);

export default function PlaceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Find Place (Loose equality for string vs number IDs)
  // eslint-disable-next-line eqeqeq
  const place = allData.find((p) => p.id == id) || placesData[0];

  // --- State ---
  const [imgSrc, setImgSrc] = useState(place?.image);
  const [viewMode, setViewMode] = useState("photos");
  const [modalImage, setModalImage] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // Auth Modal State (if user tries to fav without login)
  const [isAuthOpen, setAuthOpen] = useState(false);

  // --- Effects ---

  // 1. Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // 2. Update Image if place changes
  useEffect(() => {
    setImgSrc(place?.image);
  }, [place]);

  // 3. Firebase: Check if this specific place is in favorites
  useEffect(() => {
    if (!currentUser) {
      setIsFavorite(false);
      return;
    }

    const userDocRef = doc(db, "users", currentUser.uid);
    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        if (data.favorites && Array.isArray(data.favorites)) {
          // Check if current ID exists in the array
          // eslint-disable-next-line eqeqeq
          const isFav = data.favorites.some((favId) => favId == id);
          setIsFavorite(isFav);
        } else {
          setIsFavorite(false);
        }
      } else {
        setIsFavorite(false);
      }
    });

    return () => unsubscribe();
  }, [currentUser, id]);

  // --- Handlers ---

  const toggleFavorite = async () => {
    if (!currentUser) {
      setAuthOpen(true);
      return;
    }

    // Optimistic UI Update
    setIsFavorite((prev) => !prev);

    const userDocRef = doc(db, "users", currentUser.uid);
    try {
      if (isFavorite) {
        // Remove
        await updateDoc(userDocRef, { favorites: arrayRemove(place.id) });
      } else {
        // Add (merge to avoid overwriting)
        await setDoc(userDocRef, { favorites: arrayUnion(place.id) }, { merge: true });
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
      setIsFavorite((prev) => !prev); // Revert on error
    }
  };

  // --- Data Prep ---

  // FIX: Ensure we always output an array of objects { url, title }
  const extraPhotos =
    place.photos && place.photos.length > 0
      ? place.photos.map((p) => ({
          url: (typeof p === "string" ? p : p.url) || p,
          title: p.title || place.name,
        }))
      : [
          { url: `https://source.unsplash.com/random/800x600/?${place.type || "nature"}`, title: place.name },
          { url: `https://source.unsplash.com/random/800x600/?${place.type || "nature"}`, title: place.name },
          { url: `https://source.unsplash.com/random/800x600/?${place.type || "nature"}`, title: place.name },
        ];

  // Limit to 6 thumbnails for layout
  const visiblePhotos = extraPhotos.slice(0, 6);

  const modelUrl =
    place.modelUrl ||
    "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb";

  if (!place) return <div style={{ padding: 40 }}>Place not found</div>;

  return (
    <div className="page-container">
      {/* --- CSS STYLES FOR RESPONSIVENESS --- */}
      <style>{`
        .page-container { background: #f8f9fa; min-height: 100vh; font-family: 'Inter', sans-serif; padding-bottom: 80px; }
        
        /* Layout Grid */
        .content-grid {
          max-width: 1200px; margin: 0 auto; padding: 30px 20px;
          display: grid; grid-template-columns: 1fr; gap: 30px;
        }
        @media (min-width: 900px) {
          .content-grid { grid-template-columns: 2fr 1fr; }
        }

        /* Requirements Grid */
        .req-grid { display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 16px; }
        @media (min-width: 600px) {
          .req-grid { grid-template-columns: repeat(3, 1fr); }
        }

        /* Requirement Badge */
        .req-badge {
          display: flex; align-items: center; gap: 12px; background: #fff; 
          padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; 
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }

        /* Hero Text */
        .hero-title {
          font-size: 2.5rem; margin: 12px 0; font-weight: 800; text-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
        @media (max-width: 600px) {
          .hero-title { font-size: 1.8rem; }
        }

        /* Mobile Sticky Actions */
        .mobile-sticky-actions {
          display: none;
          position: fixed; bottom: 0; left: 0; width: 100%;
          background: white; padding: 12px 20px;
          box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
          z-index: 100;
          display: flex; gap: 10px;
        }
        @media (min-width: 900px) {
          .mobile-sticky-actions { display: none !important; }
        }
        
        /* Desktop Actions */
        .desktop-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 20px; }
        @media (max-width: 899px) {
          .desktop-actions { display: none; }
        }

        /* Gallery Grid */
        .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        @media (max-width: 500px) {
          .gallery-grid { grid-template-columns: 1fr; }
        }

        /* Thumbnail strip */
        .thumb-strip { display: flex; gap: 8px; margin-top: 12px; overflow-x: auto; padding-bottom: 6px; }
        .thumb { width: 96px; height: 72px; flex: 0 0 auto; border-radius: 6px; overflow: hidden; cursor: pointer; border: 2px solid transparent; }
        .thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* Small helper */
        .muted { color: #64748b; font-size: 0.95rem; }
        .card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 6px 20px rgba(2,6,23,0.04); }

      `}</style>

      <AuthModal isOpen={isAuthOpen} onClose={() => setAuthOpen(false)} initialMode="login" />

      {/* --- FULL SCREEN IMAGE MODAL --- */}
      {modalImage && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.95)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setModalImage(null)}
        >
          <button
            onClick={() => setModalImage(null)}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              background: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: "50%",
              width: 50,
              height: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "white",
              transition: "0.2s",
            }}
          >
            <FaTimes size={24} />
          </button>
          <img
            src={modalImage}
            alt="Full Screen"
            style={{ maxHeight: "90vh", maxWidth: "90vw", objectFit: "contain", borderRadius: 8 }}
            onClick={(e) => e.stopPropagation()}
            onError={(e) => (e.target.src = `https://source.unsplash.com/random/1200x800/?${place.type || "landmark"}`)}
          />
        </div>
      )}

      {/* --- HERO HEADER --- */}
      <div style={{ position: "relative", height: "50vh", minHeight: 350, background: "#222" }}>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            zIndex: 10,
            background: "white",
            border: "none",
            borderRadius: "50%",
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          <FaArrowLeft size={16} color="#333" />
        </button>

        {/* Favorite Button (Top Right) */}
        <button
          onClick={toggleFavorite}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            zIndex: 10,
            background: "white",
            border: "none",
            borderRadius: "50%",
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            transition: "transform 0.1s",
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {isFavorite ? <FaHeart size={20} color="#E63946" /> : <FaRegHeart size={20} color="#64748b" />}
        </button>

        <img
          src={imgSrc}
          alt={place.name}
          onError={(e) => (e.target.src = `https://source.unsplash.com/random/1200x600/?${place.type || "landmark"}`)}
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.95 }}
        />

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
            padding: "60px 20px 30px",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto", color: "white" }}>
            <span
              style={{
                background: "#E63946",
                padding: "6px 14px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              {place.tag || "DESTINATION"}
            </span>
            <h1 className="hero-title">{place.name}</h1>
            <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", fontSize: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <FaMapMarkerAlt color="#FCA311" /> {place.city}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <FaStar color="#FCA311" /> {place.rating} / 5.0
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="content-grid">
        {/* LEFT COLUMN */}
        <div>
          {/* Description */}
          <div className="card">
            <h2 style={{ marginTop: 0, color: "#1d3557" }}>About the Destination</h2>
            <p style={{ lineHeight: 1.8, color: "#4a5568", fontSize: "1.05rem" }}>{place.description}</p>
          </div>

          {/* --- MEDIA SECTION (Gallery & 3D) --- */}
          <div style={{ marginTop: 30 }} className="card">
            {/* Toggle Tabs */}
            <div style={{ display: "flex", gap: 20, borderBottom: "1px solid #e2e8f0", marginBottom: 20, overflowX: "auto" }}>
              <button
                onClick={() => setViewMode("photos")}
                style={{
                  padding: "0 0 12px",
                  background: "none",
                  border: "none",
                  borderBottom: viewMode === "photos" ? "3px solid #E63946" : "3px solid transparent",
                  fontWeight: 700,
                  color: viewMode === "photos" ? "#E63946" : "#718096",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 16,
                  whiteSpace: "nowrap",
                }}
              >
                <FaImages /> Photo Gallery
              </button>
              <button
                onClick={() => setViewMode("3d")}
                style={{
                  padding: "0 0 12px",
                  background: "none",
                  border: "none",
                  borderBottom: viewMode === "3d" ? "3px solid #E63946" : "3px solid transparent",
                  fontWeight: 700,
                  color: viewMode === "3d" ? "#E63946" : "#718096",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 16,
                  whiteSpace: "nowrap",
                }}
              >
                <FaCube /> 3D View
              </button>
            </div>

            {/* Content Area */}
            <div style={{ minHeight: 300 }}>
              {viewMode === "photos" ? (
                <>
                  <div className="gallery-grid">
                    {visiblePhotos.map((photo, idx) => (
                      <div
                        key={idx}
                        style={{
                          position: "relative",
                          aspectRatio: "4/3",
                          borderRadius: 8,
                          overflow: "hidden",
                          cursor: "pointer",
                          background: "#e6edf3",
                        }}
                        onClick={() => setImgSrc(photo.url)}
                      >
                        <img
                          src={photo.url}
                          alt={photo.title || `View ${idx + 1}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.3s",
                            display: "block",
                          }}
                          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                          onError={(e) => (e.currentTarget.src = `https://source.unsplash.com/random/800x600/?${place.type || "landmark"}`)}
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalImage(photo.url);
                          }}
                          style={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            background: "rgba(0,0,0,0.6)",
                            color: "white",
                            border: "none",
                            borderRadius: 4,
                            padding: 6,
                            cursor: "pointer",
                          }}
                        >
                          <FaExpand size={12} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Thumbnail strip (mobile friendly) */}
                  <div className="thumb-strip" aria-hidden={visiblePhotos.length === 0}>
                    {visiblePhotos.map((photo, idx) => (
                      <div
                        className="thumb"
                        key={`t-${idx}`}
                        onClick={() => {
                          setImgSrc(photo.url);
                          window.scrollTo({ top: 200, behavior: "smooth" });
                        }}
                        title={photo.title}
                        role="button"
                      >
                        <img
                          src={photo.url}
                          alt={photo.title || `Thumb ${idx + 1}`}
                          onError={(e) => (e.currentTarget.src = `https://source.unsplash.com/random/200x150/?${place.type || "landmark"}`)}
                        />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div style={{ height: 400, background: "#f0f4f8", borderRadius: 12, overflow: "hidden", position: "relative" }}>
                  <div style={{ position: "absolute", top: 10, left: 10, zIndex: 10, background: "rgba(0,0,0,0.6)", color: "white", padding: "4px 8px", borderRadius: 4, fontSize: 12 }}>
                    Use mouse to rotate & zoom
                  </div>
                  <Suspense
                    fallback={<div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading 3D Engine...</div>}
                  >
                    <ModelViewer modelPath={modelUrl} />
                  </Suspense>
                </div>
              )}
            </div>
          </div>

          {/* Requirements */}
          <div style={{ marginTop: 30 }}>
            <h3 style={{ display: "flex", alignItems: "center", gap: 10, color: "#1d3557" }}>
              <FaSuitcase color="#457b9d" /> Trip Requirements
            </h3>
            <div className="req-grid">
              <RequirementBadge icon={FaCloudSun} label="Weather" value="28°C Sunny" color="#f59e0b" />
              <RequirementBadge icon={FaRoad} label="Roads" value="Good Condition" color="#64748b" />
              <RequirementBadge icon={FaUtensils} label="Food" value="Limited Options" color="#e63946" />
            </div>

            <div style={{ marginTop: 20, padding: 20, background: "#fff5f5", borderRadius: 12, border: "1px solid #fed7d7" }}>
              <h4 style={{ fontSize: 15, color: "#c53030", margin: "0 0 12px 0" }}>🎒 Packing Checklist</h4>
              <ul style={{ margin: 0, paddingLeft: 20, color: "#9b2c2c", fontSize: 14.5, lineHeight: 1.6 }}>
                <li>Water bottles (Hydration is key)</li>
                <li>Comfortable walking shoes</li>
                <li>Hat and Sunglasses</li>
                <li>Cash (UPI might fluctuate)</li>
              </ul>
            </div>
          </div>

          {/* Visitor Info */}
          <div style={{ background: "white", padding: 30, borderRadius: 16, boxShadow: "0 4px 20px rgba(0,0,0,0.04)", marginTop: 30 }}>
            <h3 style={{ marginTop: 0, color: "#1d3557" }}>Visitor Information</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 20 }}>
              {[
                { icon: FaClock, l: "Opening Hours", v: place.openingHours },
                { icon: FaTicketAlt, l: "Entry Fee", v: place.ticketPrice },
                { icon: FaHistory, l: "Duration", v: place.duration },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, borderBottom: i < 2 ? "1px solid #edf2f7" : "none", paddingBottom: i < 2 ? 12 : 0 }}>
                  <item.icon color="#a0aec0" size={18} />
                  <div>
                    <span style={{ fontWeight: 700, color: "#2d3748", marginRight: 8 }}>{item.l}:</span>
                    <span style={{ color: "#4a5568" }}>{item.v}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR (MAP) - Sticky on Desktop */}
        <div style={{ minWidth: 300 }}>
          <div style={{ position: "sticky", top: 20 }}>
            {/* MAP CARD */}
            <div style={{ height: 400, background: "#e2e8f0", borderRadius: 16, overflow: "hidden", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}>
              <Suspense fallback={<div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading Map...</div>}>
                <MapView places={[place]} />
              </Suspense>
            </div>

            {/* Desktop Actions */}
            <div className="desktop-actions" style={{ marginTop: 16 }}>
              <button onClick={() => alert("Booking feature coming soon!")} style={{ background: "#E63946", color: "white", border: "none", padding: 14, borderRadius: 8, fontWeight: 700, cursor: "pointer" }}>
                {place.bookingLink ? "Book Now" : "Check Options"}
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link Copied!");
                }}
                style={{ background: "white", border: "1px solid #cbd5e0", padding: 14, borderRadius: 8, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
              >
                <FaShareAlt /> Share
              </button>
            </div>

            {/* Quick Info Card */}
            <div style={{ marginTop: 20, background: "white", padding: 16, borderRadius: 12 }}>
              <h4 style={{ margin: "0 0 8px 0" }}>Quick Info</h4>
              <div style={{ display: "flex", gap: 8, alignItems: "center", color: "#475569" }}>
                <FaMapMarkerAlt /> <div>{place.city}</div>
              </div>

              <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                <button style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #e2e8f0", background: "white", cursor: "pointer" }} onClick={() => setViewMode("photos")}>
                  View Photos
                </button>
                <button style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #e2e8f0", background: "white", cursor: "pointer" }} onClick={() => setViewMode("3d")}>
                  View 3D
                </button>
              </div>
            </div>

            {/* Contact / Nearby */}
            <div style={{ marginTop: 16, background: "white", padding: 16, borderRadius: 12 }}>
              <h4 style={{ margin: "0 0 8px 0" }}>Nearby</h4>
              <div style={{ display: "grid", gap: 8 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <FaUtensils /> <div className="muted">Restaurants nearby</div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <FaRoad /> <div className="muted">Good road access</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}