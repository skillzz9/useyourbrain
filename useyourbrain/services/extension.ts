// services/extension.ts

export const setExtensionRecording = async (state: boolean) => {
  const EXTENSION_ID = "hfleomfalfkdcgopbihklbhlhijkolpc";

  return new Promise((resolve) => {
    // Check if the Chrome API is available (Browser context)
    const api = typeof window !== "undefined" ? (window as any).chrome?.runtime : null;

    if (api) {
      api.sendMessage(
        EXTENSION_ID, 
        { action: "setRecording", value: state }, 
        (res: any) => {
          console.log("Extension recording state updated:", res);
          resolve(res);
        }
      );
    } else {
      console.warn("Chrome API not found. Cannot update recording state.");
      resolve({ success: false, error: "Chrome API missing" });
    }
  });
};