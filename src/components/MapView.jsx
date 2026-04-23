import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { 
  FaDirections, FaLocationArrow, FaSearch, FaTimes, FaUndo, 
  FaCar, FaWalking, FaExpand, FaCompress 
} from "react-icons/fa";

// Fix for default Leaflet marker icons
const fixLeafletIcons = () => {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png",
  });
};
fixLeafletIcons();

const MapView = forwardRef(({ places = [], scrollWheelZoom = true }, ref) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const routeRef = useRef(null);
  const markersRef = useRef([]);

  const [steps, setSteps] = useState([]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    routeToPlace: () => {
      if (places.length) getRouteTo(places[0].coords);
    },
    resize: () => {
      setTimeout(() => mapInstanceRef.current?.invalidateSize(), 200);
    }
  }));

  // --- 1. Routing Logic (OSRM) ---
  const drawRoute = async (origin, dest) => {
    const url = `https://router.project-osrm.org/route/v1/driving/${origin[1]},${origin[0]};${dest[1]},${dest[0]}?steps=true&overview=full&geometries=geojson`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!data.routes?.length) {
        alert("No route found on road network.");
        return;
      }

      const route = data.routes[0];
      const coords = route.geometry.coordinates.map((c) => [c[1], c[0]]);

      setDistance((route.distance / 1000).toFixed(1)); // km
      setDuration(Math.ceil(route.duration / 60)); // mins
      setSteps(route.legs[0].steps);
      setSidebarOpen(true);

      const map = mapInstanceRef.current;
      if (routeRef.current) routeRef.current.remove();

      // Google Maps style blue route
      routeRef.current = L.polyline(coords, {
        color: "#4285F4", 
        weight: 6,
        opacity: 0.8,
        lineJoin: 'round'
      }).addTo(map);

      map.fitBounds(routeRef.current.getBounds(), { padding: [50, 50] });
    } catch (e) {
      console.error(e);
      alert("Could not fetch directions.");
    }
  };

  // --- 2. Location Logic ---
  const getRouteTo = (dest) => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const origin = [pos.coords.latitude, pos.coords.longitude];
        setIsLocating(false);
        
        const map = mapInstanceRef.current;
        // Add User Dot
        L.circleMarker(origin, {
            radius: 8,
            fillColor: "#4285F4",
            color: "#fff",
            weight: 2,
            fillOpacity: 1
        }).addTo(map).bindPopup("Your Location");

        drawRoute(origin, dest);
      },
      (err) => {
        setIsLocating(false);
        alert("Please enable location services.");
      },
      { enableHighAccuracy: true }
    );
  };

  // --- 3. Search Logic (Local + Nominatim) ---
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;

    // A. Search Internal Data First
    const localMatch = places.find(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (localMatch) {
        mapInstanceRef.current.setView(localMatch.coords, 16);
        setSearchResults([]); 
        return;
    }

    // B. Search OpenStreetMap API
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`);
        const data = await res.json();
        if(data && data.length > 0) {
            const { lat, lon } = data[0];
            const coords = [parseFloat(lat), parseFloat(lon)];
            mapInstanceRef.current.setView(coords, 14);
            L.marker(coords).addTo(mapInstanceRef.current).bindPopup(searchQuery).openPopup();
        } else {
            alert("Place not found");
        }
    } catch(err) { console.error(err); }
  };

  // --- 4. Reset Logic ---
  const handleReset = () => {
      const map = mapInstanceRef.current;
      if(routeRef.current) routeRef.current.remove();
      setDistance(null);
      setSteps([]);
      if(places.length > 0) {
          map.setView(places[0].coords, 14);
      }
  };

  // --- Initialize Map ---
  useEffect(() => {
    if (mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      scrollWheelZoom: scrollWheelZoom,
      zoomControl: false 
    }).setView([13.15, 74.85], 13);

    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 20,
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);
  }, []);

  // --- Markers with Images & Actions ---
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    if (!places.length) return;

    places.forEach(p => {
      const marker = L.marker(p.coords).addTo(map);
      
      // Create Custom Popup HTML
      const popupContent = `
        <div style="width: 200px; font-family: sans-serif;">
            <div style="height: 100px; width: 100%; overflow: hidden; border-radius: 8px 8px 0 0; background: #eee;">
                <img src="${p.image || 'https://source.unsplash.com/random?travel'}" 
                     style="width:100%; height:100%; object-fit:cover;" 
                     onerror="this.src='https://source.unsplash.com/random?landmark'"
                />
            </div>
            <div style="padding: 10px;">
                <h3 style="margin:0; font-size:16px; color:#202124;">${p.name}</h3>
                <div style="display:flex; align-items:center; gap:4px; margin: 4px 0; font-size:13px; color: #faaf00;">
                   ★ <b>${p.rating || 4.5}</b> <span style="color:#70757a;">(${p.city})</span>
                </div>
                <button id="btn-${p.id}" style="
                    width: 100%; margin-top:8px; padding: 8px;
                    background: #1a73e8; color: white; border: none;
                    border-radius: 4px; font-weight: 600; cursor: pointer;
                ">
                   Get Directions
                </button>
            </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      
      // Bind Click Event to Button inside Popup
      marker.on('popupopen', () => {
          const btn = document.getElementById(`btn-${p.id}`);
          if(btn) {
              btn.onclick = () => getRouteTo(p.coords);
          }
      });

      markersRef.current.push(marker);
    });

    if (places.length > 0 && !routeRef.current) {
        map.setView(places[0].coords, 14);
    }
  }, [places]);

  return (
    <div style={{ position: 'relative', height: "100%", width: "100%", overflow: 'hidden', borderRadius: '12px', border: '1px solid #dadce0' }}>
      
      {/* Search Bar Overlay */}
      <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 500, width: 'calc(100% - 70px)', maxWidth: '320px' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', background: 'white', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.3)', padding: '2px' }}>
              <input 
                type="text" 
                placeholder="Search here..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ border: 'none', padding: '10px 12px', flex: 1, borderRadius: '8px', outline: 'none', fontSize: '14px' }}
              />
              <button type="submit" style={{ background: 'transparent', border: 'none', padding: '0 12px', cursor: 'pointer', color: '#1a73e8' }}>
                  <FaSearch />
              </button>
          </form>
      </div>

      {/* Map Area */}
      <div ref={mapRef} style={{ height: "100%", width: "100%", zIndex: 1 }} />

      {/* Right Side Controls */}
      <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 400, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button onClick={handleReset} style={controlBtnStyle} title="Reset View">
            <FaUndo size={16} />
        </button>
        <button 
          onClick={() => {
             navigator.geolocation.getCurrentPosition(pos => {
                mapInstanceRef.current.setView([pos.coords.latitude, pos.coords.longitude], 15);
             });
          }}
          style={controlBtnStyle}
          title="Locate Me"
        >
          <FaLocationArrow size={16} />
        </button>
      </div>

      {/* Directions Panel (Slide Up) */}
      {distance && (
        <div className={`directions-panel ${isSidebarOpen ? 'open' : 'closed'}`} style={panelStyle}>
            <div onClick={() => setSidebarOpen(!isSidebarOpen)} style={panelHeaderStyle}>
                <div style={{display:'flex', gap: 12, alignItems:'center'}}>
                    <div style={{background: '#1a73e8', color:'white', padding: '8px', borderRadius: '50%'}}><FaCar /></div>
                    <div>
                        <span style={{fontWeight: 700, color: '#202124', fontSize: '16px'}}>{duration} min</span> 
                        <span style={{color:'#70757a', fontSize: '14px', marginLeft: 6}}>({distance} km)</span>
                    </div>
                </div>
                <div style={{color: '#70757a', cursor: 'pointer'}}>
                    {isSidebarOpen ? <FaCompress /> : <FaExpand />}
                </div>
            </div>

            {isSidebarOpen && (
                <div style={{ overflowY: 'auto', flex: 1, padding: '0 16px 16px' }}>
                    <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {steps.map((step, i) => (
                            <li key={i} style={{ padding: '12px 0', borderBottom: '1px solid #f1f3f4', display: 'flex', gap: 12, fontSize: '14px' }}>
                            <span style={{color: '#1a73e8', fontWeight: 600}}>{i+1}.</span>
                            <span style={{color: '#3c4043'}}>{step.maneuver.instruction}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
      )}
    </div>
  );
});

// Styles
const controlBtnStyle = {
    background: '#fff', border: 'none', width: '40px', height: '40px', 
    borderRadius: '4px', boxShadow: '0 1px 4px rgba(0,0,0,0.3)', 
    cursor: 'pointer', color: '#5f6368', display: 'flex', alignItems: 'center', justifyContent: 'center'
};

const panelStyle = {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    background: '#fff', zIndex: 500,
    borderRadius: '16px 16px 0 0', boxShadow: '0 -2px 10px rgba(0,0,0,0.2)',
    display: 'flex', flexDirection: 'column', maxHeight: '60%', transition: 'height 0.3s'
};

const panelHeaderStyle = {
    padding: '16px', cursor: 'pointer', 
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
    borderBottom: '1px solid #f1f3f4'
};

export default MapView;