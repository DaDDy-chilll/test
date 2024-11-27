import React, { useEffect } from "react";

const DownloadApk: React.FC = () => {
  const downloadInitiated = React.useRef(false);
  const handleDownload = () => {
    try {
      // First APK download
      console.log("First APK download");
      const link = document.createElement("a");
      link.href = "/app-release.apk";
      link.download = "app-release.apk";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

  
    } catch (error) {
      console.error("Error downloading APK:", error);
    }
  };

  // Auto-trigger download when component mounts
  useEffect(() => {
    console.log("Downloading APK");
    console.log(!downloadInitiated.current);
    if (!downloadInitiated.current) {
      downloadInitiated.current = true;
      handleDownload();
    }
  }, []);

  // ... existing code ...
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">
        Thank you for downloading the app!
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
        Your download should start automatically. If it doesn't,
        you can click the button below to try again.
      </p>
      <button
        onClick={handleDownload}
        className="px-6 py-3 bg-primaryColor text-white rounded-lg font-medium
          hover:bg-blue-700 transition-colors duration-200 shadow-md"
      >
        Download Again
      </button>
    </div>
  );
// ... existing code ...
};

export default DownloadApk;
