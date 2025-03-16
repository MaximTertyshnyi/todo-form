import { useEffect, useState } from "react";
import "./Alert.css";

export const Alert = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose && onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div className={`alert ${isVisible ? "show" : ""}`} role="alert">
      <p>{message}</p>
    </div>
  );
};
