import { clsx, type ClassValue } from "clsx"
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

 export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false); // default to false

    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= 450);

      // Run it once on mount
      handleResize();

      // Update on resize
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMobile;
  }