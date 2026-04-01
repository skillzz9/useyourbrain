interface Window {
  chrome: {
    runtime: {
      sendMessage: (
        extensionId: string,
        message: any,
        responseCallback?: (response: any) => void
      ) => void;
      lastError?: {
        message?: string;
      };
    };
  };
}