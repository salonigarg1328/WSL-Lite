import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------------------
   Data 
   --------------------- */
const ALL_LIBS = [
  { id: "bash", name: "bash" },
  { id: "curl", name: "curl" },
  { id: "git", name: "git" },
  { id: "nano", name: "nano" },
  { id: "vim", name: "vim" },
  { id: "wget", name: "wget" },
  { id: "zip", name: "zip" },
  { id: "unzip", name: "unzip" },
  { id: "tar", name: "tar" },
  { id: "coreutils", name: "coreutils" },
  { id: "util-linux", name: "util-linux" },
  { id: "grep", name: "grep" },
  { id: "sed", name: "sed" },
  { id: "less", name: "less" },
  { id: "htop", name: "htop" },

  { id: "zsh", name: "zsh" },
  { id: "sudo", name: "sudo" },
  { id: "build-base", name: "build-base" },
  { id: "make", name: "make" },
  { id: "cmake", name: "cmake" },
  { id: "gcc", name: "gcc" },
  { id: "g++", name: "g++" },
  { id: "musl-dev", name: "musl-dev" },
  { id: "nodejs", name: "nodejs" },
  { id: "npm", name: "npm" },
  { id: "openssh-client", name: "openssh-client" },
  { id: "docker-cli", name: "docker-cli" },
  { id: "python3", name: "python3" },
  { id: "py3-pip", name: "py3-pip" },
  { id: "py3-setuptools", name: "py3-setuptools" },
  { id: "py3-virtualenv", name: "py3-virtualenv" },

  { id: "py3-numpy", name: "py3-numpy" },
  { id: "py3-pandas", name: "py3-pandas" },
  { id: "py3-matplotlib", name: "py3-matplotlib" },
  { id: "py3-psutil", name: "py3-psutil" },
];

const PROFILES = {
  "cli-lite": {
    title: "CLI Lite",
    desc: "Basic command-line environment with essential utilities.",
    libs: [
      { id: "bash", name: "bash" },
      { id: "curl", name: "curl" },
      { id: "git", name: "git" },
      { id: "nano", name: "nano" },
      { id: "vim", name: "vim" },
      { id: "wget", name: "wget" },
      { id: "zip", name: "zip" },
      { id: "unzip", name: "unzip" },
      { id: "tar", name: "tar" },
      { id: "coreutils", name: "coreutils" },
      { id: "util-linux", name: "util-linux" },
      { id: "grep", name: "grep" },
      { id: "sed", name: "sed" },
      { id: "less", name: "less" },
      { id: "python3", name: "python3" },
      { id: "py3-pip", name: "py3-pip" },
      { id: "py3-setuptools", name: "py3-setuptools" },
    ],
  },
  "dev-lite": {
    title: "Dev Lite",
    desc: "Developer toolchain: compilers, build tools and Node.",
    libs: [
      { id: "bash", name: "bash" },
      { id: "curl", name: "curl" },
      { id: "git", name: "git" },
      { id: "nano", name: "nano" },
      { id: "vim", name: "vim" },
      { id: "wget", name: "wget" },
      { id: "zip", name: "zip" },
      { id: "unzip", name: "unzip" },
      { id: "tar", name: "tar" },
      { id: "sudo", name: "sudo" },
      { id: "build-base", name: "build-base" },
      { id: "make", name: "make" },
      { id: "cmake", name: "cmake" },
      { id: "gcc", name: "gcc" },
      { id: "g++", name: "g++" },
      { id: "musl-dev", name: "musl-dev" },
      { id: "py3-virtualenv", name: "py3-virtualenv" },
      { id: "nodejs", name: "nodejs" },
      { id: "npm", name: "npm" },
      { id: "openssh-client", name: "openssh-client" },
    ],
  },
  "data-lite": {
    title: "Data Lite",
    desc: "Lightweight Python data stack (Alpine packages only).",
    libs: [
      { id: "bash", name: "bash" },
      { id: "curl", name: "curl" },
      { id: "git", name: "git" },
      { id: "nano", name: "nano" },
      { id: "wget", name: "wget" },
      { id: "tar", name: "tar" },
      { id: "zip", name: "zip" },
      { id: "unzip", name: "unzip" },
      { id: "sudo", name: "sudo" },
      { id: "python3", name: "python3" },
      { id: "py3-pip", name: "py3-pip" },
      { id: "py3-setuptools", name: "py3-setuptools" },
      { id: "py3-numpy", name: "py3-numpy" },
      { id: "py3-pandas", name: "py3-pandas" },
      { id: "py3-matplotlib", name: "py3-matplotlib" },
      { id: "py3-psutil", name: "py3-psutil" },
    ],
  },
};

/* ---------------------
   Small icon helper (covers all ids used above)
   --------------------- */
function Icon({ id, className = "w-6 h-6" }) {
  switch (id) {
    case "bash":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.5" y="4" width="19" height="16" rx="2" fill="#0f172a" stroke="#10b981" strokeWidth="0.8" />
          <path d="M7 9h10M7 12h10M7 15h6" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "git":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12.5v2.5h7.2" stroke="#f97316" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="6.5" cy="9.5" r="1.5" fill="#f97316" />
          <circle cx="12.5" cy="6.5" r="1.5" fill="#f97316" />
          <circle cx="17.5" cy="11.5" r="1.5" fill="#f97316" />
          <path d="M12.5 6.5L9 10" stroke="#f97316" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "python3":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 3h6v3a2 2 0 0 1-2 2H9" stroke="#3776AB" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17 21h-6v-3a2 2 0 0 1 2-2h2" stroke="#FFD43B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="9" cy="7.5" r="0.6" fill="#fff" />
          <circle cx="15" cy="16.5" r="0.6" fill="#fff" />
        </svg>
      );

    case "docker-cli":
    case "nodejs":
    case "npm":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="3" stroke="#06b6d4" strokeWidth="1.4" />
          <path d="M7 8h10M7 12h10M7 16h6" stroke="#06b6d4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "curl":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 12c2-4 8-6 12-4" stroke="#0ea5e9" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 16c1.2-0.8 2.5-2.8 3-5" stroke="#0ea5e9" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="6.5" cy="13.5" r="1.1" fill="#0ea5e9" />
        </svg>
      );

    case "nano":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3.5" y="4" width="17" height="16" rx="1.2" stroke="#94a3b8" strokeWidth="1.2" />
          <path d="M7 8h10M7 12h10" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
          <text x="8" y="18" fontSize="7" fill="#94a3b8" fontFamily="monospace">N</text>
        </svg>
      );

    case "vim":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 6l4 12 4-8 4 8 4-12" stroke="#22c55e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );

    case "wget":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4v10" stroke="#6366f1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 12l4 4 4-4" stroke="#6366f1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="4" y="18" width="16" height="2" rx="1" fill="#6366f1" />
        </svg>
      );

    case "zip":
    case "unzip":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6h10l4 4v8a2 2 0 0 1-2 2H4V6z" stroke="#f43f5e" strokeWidth="1.2" strokeLinejoin="round" />
          <rect x="9" y="3" width="6" height="4" rx="0.6" fill="#f43f5e" />
          <path d="M12 11v5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case "tar":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3.5" y="6" width="17" height="12" rx="1" stroke="#f97316" strokeWidth="1.2" />
          <path d="M7 8v8M12 8v8M17 8v8" stroke="#f97316" strokeWidth="0.9" strokeLinecap="round" />
        </svg>
      );

    case "coreutils":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3.5" y="3.5" width="17" height="17" rx="2" stroke="#64748b" strokeWidth="1.2" />
          <path d="M7 8h10M7 12h10M7 16h6" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case "util-linux":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="7" stroke="#8b5cf6" strokeWidth="1.2" />
          <path d="M12 8v4l2 2" stroke="#8b5cf6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "grep":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10.5" cy="10.5" r="4" stroke="#10b981" strokeWidth="1.2" />
          <path d="M14 14l5 5" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M6 10h6" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case "sed":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 7c4 6 10 6 16 0" stroke="#ef4444" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M8 17c1-2 3-2 5 0" stroke="#ef4444" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );

    case "less":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3.5" y="4.5" width="17" height="15" rx="1" stroke="#94a3b8" strokeWidth="1.2" />
          <path d="M7 8h10M7 12h6" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case "htop":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3.5" y="4" width="17" height="16" rx="1.2" stroke="#06b6d4" strokeWidth="1.2" />
          <path d="M7 16V10M10 16V8M13 16V12M16 16V6" stroke="#06b6d4" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case "zsh":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 7l8-3 8 3-8 11L4 7z" stroke="#7c3aed" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="9.5" y="15" fontSize="7" fill="#7c3aed" fontFamily="monospace">%</text>
        </svg>
      );

    case "sudo":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" stroke="#f59e0b" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
          <path d="M12 9v6" stroke="#f59e0b" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );

    case "build-base":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 14l6-6 6 6" stroke="#ef4444" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 20h12" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case "make":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6h16M4 12h8M4 18h12" stroke="#0ea5e9" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case "cmake":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6h16v12H4z" stroke="#ef4444" strokeWidth="1.2" />
          <path d="M7 9l5 3 5-3" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "gcc":
    case "g++":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="8" stroke="#ef4444" strokeWidth="1.2" />
          <path d="M9 9h6M9 12h6" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case "musl-dev":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="6" width="16" height="12" rx="1" stroke="#64748b" strokeWidth="1.2" />
          <path d="M8 10h8M8 14h5" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case "openssh-client":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12h10" stroke="#0ea5e9" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M13 7l6 5-6 5V7z" stroke="#0ea5e9" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="6" cy="12" r="0.8" fill="#0ea5e9" />
        </svg>
      );

    case "py3-pip":
    case "py3-setuptools":
    case "py3-virtualenv":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3.5" y="5" width="17" height="14" rx="1" stroke="#06b6d4" strokeWidth="1.2" />
          <path d="M7 9h10M7 13h6" stroke="#06b6d4" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case "py3-numpy":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4.5" y="5" width="15" height="14" rx="1" stroke="#2563eb" strokeWidth="1.2" />
          <path d="M7 8h10M7 12h10M7 16h10" stroke="#2563eb" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case "py3-pandas":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="6" width="16" height="12" rx="1" stroke="#0ea5e9" strokeWidth="1.2" />
          <path d="M7 9h10M7 12h10" stroke="#0ea5e9" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M7 15h4" stroke="#0ea5e9" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case "py3-matplotlib":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3.5" y="5" width="17" height="14" rx="1" stroke="#ef4444" strokeWidth="1.2" />
          <path d="M6 16c2-3 4-4 6-2 2 2 4 0 6-3" stroke="#ef4444" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );

    case "py3-psutil":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="6" width="16" height="12" rx="1" stroke="#7c3aed" strokeWidth="1.2" />
          <path d="M7 14h3l1-2 2 4 3-6" stroke="#7c3aed" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );

    default:
      return (
        <div className={`flex items-center justify-center rounded-full bg-slate-700 ${className}`}>
          <span className="text-xs font-medium text-slate-200">{id.charAt(0).toUpperCase()}</span>
        </div>
      );
  }
}



/* ---------------------
   Component
   --------------------- */
export default function WslLiteLanding() {
  // states
  const [popupProfileKey, setPopupProfileKey] = useState(null); // key: "cli-lite" | "dev-lite" | "data-lite"
  const [customQuery, setCustomQuery] = useState("");
  const [customLibs, setCustomLibs] = useState(() => new Set());
  const [selectedLibs, setSelectedLibs] = useState({
    "cli-lite": new Set(),
    "dev-lite": new Set(),
    "data-lite": new Set(),
  });

  const [installLog, setInstallLog] = useState([]);
  const [installing, setInstalling] = useState(false);
  const [progress, setProgress] = useState(0);

  const [currentSlide, setCurrentSlide] = useState(0); // 0 = home, 1 = profiles
  const [direction, setDirection] = useState(1);
  const isTransitioning = useRef(false);

  // navigation helper: jump to "profiles" slide
  const goToProfiles = () => {
    if (isTransitioning.current) return;
    setDirection(1);
    isTransitioning.current = true;
    setCurrentSlide(1);
    setTimeout(() => (isTransitioning.current = false), 900);
  };

  // toggles
  const toggleCustomLib = (id) => {
    setCustomLibs((prev) => {
      const s = new Set(prev);
      if (s.has(id)) s.delete(id);
      else s.add(id);
      return s;
    });
  };
  
  // installer
 async function install(profileKey) {
  setInstalling(true);
  const title =
    profileKey === "custom"
      ? "Custom Profile"
      : PROFILES[profileKey]?.title ?? profileKey;

  setInstallLog((l) => [...l, `Starting install for ${title}...`]);
  setProgress(0);

  const libs =
    profileKey === "custom"
      ? Array.from(customLibs)
      : PROFILES[profileKey]?.libs.map((lib) => lib.name) ?? [];

  try {
    const response = await fetch("http://localhost:5000/install-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profileName: profileKey === "custom" ? "custom-lite" : profileKey,
        packages: libs,
      }),
    });

    if (!response.ok) {
      throw new Error("Backend installation failed");
    }

    const result = await response.text();

    setInstallLog((l) => [...l, "📦 Installing via backend..."]);
    setInstallLog((l) => [...l, result]);
    setProgress(100);
    setInstallLog((l) => [...l, "✅ Installation complete."]);
  } catch (err) {
    console.error(err);
    setInstallLog((l) => [...l, `❌ Error: ${err.message}`]);
  } finally {
    setInstalling(false);
    setProgress(0);
  }
}

  /* ---------------------
     Wheel handler
     --------------------- */
  useEffect(() => {
    const getScrollableParent = (el) => {
      while (el && el !== document.body) {
        const style = window.getComputedStyle(el);
        const overflowY = style.overflowY;
        if ((overflowY === "auto" || overflowY === "scroll") && el.scrollHeight > el.clientHeight) return el;
        el = el.parentElement;
      }
      return null;
    };

    const THRESH = 40;
    const handleWheel = (e) => {
      if (isTransitioning.current) return;

      const delta = typeof e.deltaY === "number" ? e.deltaY : (typeof e.wheelDelta === "number" ? -e.wheelDelta : e.detail || 0);
      const scrollParent = getScrollableParent(e.target);

      if (scrollParent) {
        // allow inner scroll when not at boundary
        if (delta > 0 && scrollParent.scrollTop + scrollParent.clientHeight < scrollParent.scrollHeight) return;
        if (delta < 0 && scrollParent.scrollTop > 0) return;
      }

      if (delta > THRESH && currentSlide === 0) {
        setDirection(1);
        isTransitioning.current = true;
        setCurrentSlide(1);
        setTimeout(() => (isTransitioning.current = false), 900);
      } else if (delta < -THRESH && currentSlide === 1) {
        setDirection(-1);
        isTransitioning.current = true;
        setCurrentSlide(0);
        setTimeout(() => (isTransitioning.current = false), 900);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentSlide]);

  /* ---------------------
     Slide animation variants
     --------------------- */
  const variants = {
    enter: (dir) => ({
      y: dir === 1 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { y: "0%", opacity: 1 },
    exit: (dir) => ({
      y: dir === 1 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  /* ---------------------
     Render
     --------------------- */
  return (
    <div className="relative bg-[#0b1220] text-slate-200 font-sans min-h-screen">
<AnimatePresence>
  {popupProfileKey && PROFILES[popupProfileKey] && currentSlide === 1 && (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.12 }}
      className="absolute inset-0 z-50"
      onMouseEnter={() => {}}
      onMouseLeave={() => setPopupProfileKey(null)}
    >
      <div className="bg-slate-900/95 border border-slate-700 rounded-xl p-4 shadow-2xl h-full flex flex-col items-center justify-center">
        <h4 className="text-lg font-semibold text-white mb-3">
          {PROFILES[popupProfileKey].title}
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {PROFILES[popupProfileKey].libs.map((lib) => (
            <div
              key={lib.id}
              className="bg-slate-800 px-3 py-2 rounded-md text-sm flex items-center justify-center gap-2"
            >
              <Icon id={lib.id} className="w-4 h-4" />
              <span>{lib.name}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>


      {/* ---------- Slide container (home / profiles) ---------- */}
      <AnimatePresence initial={false} mode="wait" custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {currentSlide === 0 ? (
            /* --------------------- HOME --------------------- */
            <div className="min-h-screen">
              <header className="max-w-6xl mx-auto p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-black font-bold">
                    WL
                  </div>
                  <div>
                    <div className="text-lg font-bold">WSL-Lite</div>
                    <div className="text-sm text-slate-400">Lightweight, Customizable WSL distributions</div>
                  </div>
                </div>
                  <button
                    onClick={goToProfiles}
                    className="bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2 rounded-md"
                  >
                    Download
                  </button>

              </header>

              <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Left - hero */}
                <section className="space-y-6">
                  <h1 className="text-4xl sm:text-4xl font-extrabold leading-tight">
                    WSL-Lite - Lightweight, Fast, and Fully Customizable WSL Distros
                  </h1>
                  <p className="text-lg text-slate-400">
                    Create lightweight Alpine-based WSL installations with pre-configured profiles and optimized
                    terminal setups for a streamlined experience.
                  </p>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={goToProfiles}
                      className="bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-3 rounded-md font-semibold"
                    >
                      Get the installer
                    </button>

                    <button
                      className="border border-slate-700 px-5 py-3 rounded-md text-slate-300 hover:border-slate-500"
                      onClick={() => {
                        setDirection(1);
                        setCurrentSlide(1);
                        isTransitioning.current = true;
                        setTimeout(() => (isTransitioning.current = false), 900);
                      }}
                    >
                      Explore Profiles ↓
                    </button>
                  </div>

                  <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 font-mono text-slate-300 shadow-2xl overflow-hidden">
                    <p className="text-cyan-400"> Starting WSL-Lite setup...</p>
                    <p className="animate-pulse">Installing nano... ✔️</p>
                    <p>Installing git... ✔️</p>
                    <p>Installing python3... ✔️</p>
                    <p className="text-slate-500">Ready in 5 seconds ⚡</p>
                  </div>


                </section>

                {/* Right - ASCII preview + stats */}
                <aside className="space-y-4">
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <div className="ascii-box text-white flex-1 overflow-x-auto">
                      <pre className="text-xs leading-tight text-center">
                        <span style={{ fontFamily: "Times New Roman, serif", fontSize: "2rem", color: "#ffc519e2", fontWeight: "bold" }}>
                          WSL-LITE
                        </span>
                        <br />
                        <span style={{ color: "#00ff33ff", whiteSpace: "pre", display: "inline-block" }}>
{`                      ⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣖⣤⣶⣶⣿⠟⠉⠉⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣠⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣷ⶶ⣶⣦⣤⣀⠀⠀⠀⠀
⠀⠀⠀⢰⣿⣶⣾⣿⣿⣿⣿⣿⣿⡿⠿⣿⣿⣿⣿⣯⣍⠁⠀⠀⠀
⠀⠀⠀⠹⣿⠻⡅⠀⣠⠉⣹⣿⠿⠛⠃⠀⢹⣿⣿⣿⣿⣷⣄⠀⠀
⠀⠀⠀⢰⣄⣠⣴⠟⠁⢀⣿⠁⠀⠀⠀⣠⣿⣿⣿⣿⣿⣏⠉⠓⠀
⠀⠀⠀⠰⢿⡿⠋⠐⠿⣿⡿⣋⣤⣶⣿⣿⣿⣿⠏⣼⣿⣿⣇⠀⠀
⠀⠀⠀⢀⣠⣴⣶⠞⣠⣶⣿⣿⣿⣿⣿⡿⠋⣡⣾⣿⡿⠈⢿⠀⠀
⠀⠀⢈⣽⣿⠏⣰⣿⣿⣿⣿⣿⠟⠉⠀⠰⠚⠋⢁⣿⠃⠀⠀⢸⠀
⠀⢠⣿⣿⢃⣼⣿⣿⣿⣿⠏⠀⡀⠀⠀⠀⠀⠀⠞⠁⠀⠀⢠⣿⠁
⠠⠟⣾⡏⣼⣿⣿⣿⣿⠃⣠⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⡟⠀
⠀⠀⢹⡇⣿⣿⣿⣿⣿⠀⣿⣿⣷⣄⣀⠀⢀⣀⣠⣴⣿⣿⠟⠀⠀
⠀⠀⠀⠃⢻⣿⣿⣿⣿⣆⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⣁⣤⡶⠃
⠀⠀⠀⠀⠀⢯⠘⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠛⠁⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⢿⣿⣿⣿⣿⣿⣷⡶⠶⠂⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀`}
                        </span>
                      </pre>
                    </div>

                    <div className="mt-10 bg-slate-900 p-6 rounded">
                      <div id="stats" className="text-sm text-slate-300 space-y-1">
                        <div>
                          <span className="text-yellow-400">OS</span>: <span className="text-green-400">Alpine Linux v3.20 • WSL-Lite</span>
                        </div>
                        <div>
                          <span className="text-yellow-400">Kernel</span>: <span className="text-green-400">6.6.87.2-microsoft-standard-WSL2</span>
                        </div>
                        <div>
                          <span className="text-yellow-400">Uptime</span>: <span className="text-green-400">24 mins</span>
                        </div>
                        <div>
                          <span className="text-yellow-400">Memory</span>: <span className="text-green-400">322MiB / 7794MiB</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </aside>
              </main>

              <footer className="max-w-6xl mx-auto p-6 text-center text-slate-500 text-sm">
                Built with ❤️ by WSL-Lite — <a className="text-cyan-300" href="https://github.com/ReaalSATYAM/WSL-Lite" target="_b">Contribute on GitHub</a>
              </footer>
            </div>
          ) : 
          (
  <div className="min-h-screen px-6 py-12 flex flex-col">
    <h2 className="text-4xl font-extrabold mb-8 text-center text-cyan-400">
      Choose Your WSL-Lite Profile
    </h2>

    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch">
  
        {/* Left Column — Simple Hover Popup */}
        <div className="relative lg:w-1/3 flex flex-col gap-6 h-[65vh]">
          {Object.keys(PROFILES).map((key) => {
            const profile = PROFILES[key];
            return (
            <div
                key={key}
                className="relative flex-1 group"
              >
                {/* Base Card */}
                <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-5 shadow-md hover:shadow-cyan-700/30 cursor-pointer flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{profile.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">{profile.desc}</p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        install(key);
                      }}
                      className="bg-cyan-500 hover:bg-cyan-400 text-black py-1 px-3 rounded-md text-sm font-semibold"
                    >
                      Install
                    </button>
                  </div>
                </div>

                {/* Simple Popup Window (Left Side) */}
              <div
                className="absolute right-full top-1/2 -translate-y-1/2 translate-x-[12px] z-50 hidden group-hover:flex items-center justify-center 
bg-slate-900/95 border border-slate-700 rounded-xl p-4 shadow-2xl w-72 transition-all duration-200
"
              >
                <div className="text-center">
                  <h4 className="text-cyan-400 font-semibold mb-3 text-sm">
                    {profile.title} Includes:
                  </h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {profile.libs.map((lib) => (
                      <div
                        key={lib.id}
                        className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-md px-2 py-1 
                                  text-xs text-slate-300 hover:bg-slate-700/60 transition-colors"
                      >
                        <Icon id={lib.id} className="w-3.5 h-3.5" />
                        {lib.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>


            </div>
            );
          })}
        </div>

      {/* RIGHT: customize*/}
      <div className="lg:flex-1">
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.12 }}
          className="bg-slate-800/85 border border-slate-700 rounded-2xl p-6 shadow-xl hover:shadow-cyan-700/20 h-[65vh] overflow-hidden flex flex-col"
        >
          <div>
            <h3 className="text-2xl font-bold text-cyan-300 mb-2">Customize</h3>
            <p className="text-slate-400 text-sm mb-4">
              Build your own WSL-Lite setup by selecting the libraries you want.
            </p>

            <input
              type="text"
              placeholder="Search libraries..."
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              className="w-full bg-slate-900/70 border border-slate-700 rounded-md px-3 py-2 mb-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex-1 overflow-y-auto pr-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {ALL_LIBS.filter((lib) => lib.name.toLowerCase().includes(customQuery.toLowerCase())).map((lib) => {
                const selected = customLibs.has(lib.id);
                return (
                  <div
                    key={lib.id}
                    className={`relative group rounded-md p-2 border ${selected ? "bg-cyan-700/10 border-cyan-500" : "bg-slate-900/60 border-slate-700"
                      } flex items-center justify-center text-sm cursor-pointer`}
                    onClick={() => toggleCustomLib(lib.id)}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <Icon id={lib.id} className="w-5 h-5" />
                      <span className="text-xs text-slate-200">{lib.name}</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCustomLib(lib.id);
                      }}
                      className={`absolute inset-0 flex items-center justify-center rounded-md transition-opacity ${selected ? "opacity-100 bg-cyan-600 text-black font-semibold" : "opacity-0 group-hover:opacity-100 bg-black/30 text-white"}`}
                      aria-pressed={selected}
                    >
                      {selected ? "Selected" : "Add"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={() => install("custom")}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-2 rounded-md transition-all"
            >
              Install Custom Profile
            </button>
          </div>
        </motion.div>
      </div>
    </div>

    <div className="text-center mt-8">
      <button
        onClick={() => {
          setDirection(-1);
          setCurrentSlide(0);
        }}
        className="text-cyan-400 hover:text-cyan-300 text-lg"
      >
        ↑ Back to Home
      </button>
    </div>
  </div>
)
}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
