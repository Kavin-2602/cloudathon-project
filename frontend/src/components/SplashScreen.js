import { useEffect, useState } from "react";

export default function SplashScreen({ onFinish }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onFinish();
    }, 2500); // show for 2.5 seconds
    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0,
      width: "100%", height: "100%",
      background: "#0f172a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2000,
      animation: "fadeOutSplash 2.5s ease forwards"
    }}>
      <img
        src="/logo-bg.png"
        alt="Cloud Guardian Logo"
        style={{
          height: "120px",
          animation: "pulseLogo 2s infinite"
        }}
      />
      <style>
        {`
          @keyframes pulseLogo {
            0% { transform: scale(1); filter: drop-shadow(0 0 6px #38bdf8); }
            50% { transform: scale(1.1); filter: drop-shadow(0 0 15px #38bdf8); }
            100% { transform: scale(1); filter: drop-shadow(0 0 6px #38bdf8); }
          }

          @keyframes fadeOutSplash {
            0% { opacity: 1; }
            90% { opacity: 1; }
            100% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
}
