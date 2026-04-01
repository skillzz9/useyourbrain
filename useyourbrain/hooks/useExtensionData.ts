import { useState, useEffect } from 'react';

const EXTENSION_ID = "hfleomfalfkdcgopbihklbhlhijkolpc";

export function useExtensionData() {
  const [prompts, setPrompts] = useState<any[]>([]);
  const [isRecording, setIsRecording] = useState(true);
  const [status, setStatus] = useState("LOADING");

  const fetchData = () => {
    // Access chrome via window casting to avoid TS errors
    const chromeAPI = typeof window !== "undefined" ? (window as any).chrome : null;

    if (chromeAPI && chromeAPI.runtime) {
      chromeAPI.runtime.sendMessage(
        EXTENSION_ID, 
        { action: "getSettings" }, 
        (res: any) => {
          // Check for error (e.g., extension disabled or wrong ID)
          if (chromeAPI.runtime.lastError) {
            setStatus("EXTENSION NOT FOUND");
            return;
          }

          if (res) {
            setPrompts(res.history || []);
            setIsRecording(res.isRecording !== false);
            setStatus("CONNECTED");
          }
        }
      );
    } else {
      setStatus("BROWSER NOT SUPPORTED");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Return all 6 items needed by page.tsx
  return { 
    prompts, 
    setPrompts, 
    status, 
    fetchData, 
    isRecording, 
    setIsRecording 
  };
}