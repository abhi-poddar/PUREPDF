import React, { useState } from "react";
import {
  FaFileWord,
  FaFilePdf,
  FaCloudUploadAlt,
  FaDownload,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
} from "react-icons/fa";
import axios from "axios";

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [convert, setConvert] = useState("");
  const [downloadError, setDownloadError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setConvert("");
    setDownloadError("");
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (
        file.type.includes("word") ||
        file.name.endsWith(".doc") ||
        file.name.endsWith(".docx")
      ) {
        setSelectedFile(file);
        setConvert("");
        setDownloadError("");
      } else {
        setDownloadError("Please select a Word document (.doc or .docx)");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setDownloadError("Please select a file first");
      return;
    }

    setIsLoading(true);
    setConvert("");
    setDownloadError("");

    const formData = new FormData();
    formData.append("file", selectedFile);

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
    console.log(apiUrl);

    try {
      const response = await axios.post(`${apiUrl}/convertFile`, formData, {
        responseType: "blob",
        timeout: 30000,
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        selectedFile.name.replace(/\.[^/.]+$/, "") + ".pdf"
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      setSelectedFile(null);
      setDownloadError("");
      setConvert("File converted and downloaded successfully! 🎉");
    } catch (error) {
      console.error("Conversion error:", error);
      if (error.response && error.response.status === 400) {
        setDownloadError(
          "Error occurred: " + (error.response.data.message || "Invalid file")
        );
      } else if (error.code === "ECONNABORTED") {
        setDownloadError("Conversion timeout. Please try with a smaller file.");
      } else {
        setDownloadError(
          "Conversion failed. Please check if the backend server is running."
        );
      }
      setConvert("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 pt-16 sm:pt-20 relative">
      {/* Watermark */}
      <div className="fixed inset-0 pointer-events-none z-10 flex items-center justify-center">
        <div className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold text-gray-200/10 transform rotate-45 select-none">
          Abhi Poddar
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8 lg:py-12 relative z-20">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
            Convert Word to PDF
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4">
            Transform your Word documents into professional PDFs instantly.
            Fast, secure, and completely free - no registration required!
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-8 px-4">
            <span className="px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm font-medium">
              ✨ High Quality
            </span>
            <span className="px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium">
              🚀 Lightning Fast
            </span>
            <span className="px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-purple-100 text-purple-800 rounded-full text-xs sm:text-sm font-medium">
              🔒 100% Secure
            </span>
            <span className="px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-orange-100 text-orange-800 rounded-full text-xs sm:text-sm font-medium">
              📱 Works Everywhere
            </span>
          </div>
        </div>

        {/* Main Conversion Card */}
        <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-gray-100 overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-purple-500 to-blue-600 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
              <div className="flex items-center justify-center space-x-2 sm:space-x-4">
                <FaFileWord className="text-xl sm:text-2xl lg:text-3xl text-white" />
                <div className="text-white text-lg sm:text-xl lg:text-2xl">
                  →
                </div>
                <FaFilePdf className="text-xl sm:text-2xl lg:text-3xl text-white" />
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white text-center mt-2 sm:mt-3">
                Word to PDF Converter
              </h2>
            </div>

            {/* Card Body */}
            <div className="p-4 sm:p-6 lg:p-8">
              {/* File Upload Area */}
              <div
                className={`relative border-2 sm:border-3 border-dashed rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-center transition-all duration-300 ${
                  dragActive
                    ? "border-blue-500 bg-blue-50"
                    : selectedFile
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".doc,.docx"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="FileInput"
                  disabled={isLoading}
                />

                {selectedFile ? (
                  <div className="space-y-3 sm:space-y-4">
                    <FaCheckCircle className="text-3xl sm:text-4xl lg:text-5xl text-green-500 mx-auto" />
                    <div>
                      <p className="text-base sm:text-lg font-semibold text-green-700">
                        File Selected!
                      </p>
                      <p className="text-sm sm:text-base text-gray-600 mt-1 break-all px-2">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    <FaCloudUploadAlt className="text-3xl sm:text-4xl lg:text-5xl text-gray-400 mx-auto" />
                    <div>
                      <p className="text-base sm:text-lg font-semibold text-gray-700">
                        Drop your Word file here
                      </p>
                      <p className="text-sm sm:text-base text-gray-500 mt-1">
                        or click to browse files
                      </p>
                      <p className="text-xs sm:text-sm text-gray-400 mt-2">
                        Supports .doc and .docx files up to 50MB
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Convert Button */}
              <button
                onClick={handleSubmit}
                disabled={!selectedFile || isLoading}
                className={`w-full mt-4 sm:mt-6 py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg transition-all duration-300 ${
                  !selectedFile || isLoading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                    <FaSpinner className="animate-spin text-lg sm:text-xl" />
                    <span>Converting...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                    <FaDownload className="text-base sm:text-lg" />
                    <span>Convert to PDF</span>
                  </div>
                )}
              </button>

              {/* Status Messages */}
              {convert && (
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg sm:rounded-xl">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <FaCheckCircle className="text-green-500 text-lg sm:text-xl flex-shrink-0" />
                    <p className="text-green-700 font-medium text-sm sm:text-base">
                      {convert}
                    </p>
                  </div>
                </div>
              )}

              {downloadError && (
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <FaExclamationTriangle className="text-red-500 text-lg sm:text-xl flex-shrink-0" />
                    <p className="text-red-700 font-medium text-sm sm:text-base break-words">
                      {downloadError}
                    </p>
                  </div>
                </div>
              )}

              {/* Progress Indicator */}
              {isLoading && (
                <div className="mt-4 sm:mt-6">
                  <div className="bg-gray-200 rounded-full h-1.5 sm:h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-600 h-full rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-center text-gray-600 mt-2 text-xs sm:text-sm">
                    Please wait while we convert your document...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
          <div className="text-center p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="bg-blue-100 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <FaFileWord className="text-lg sm:text-xl lg:text-2xl text-blue-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
              Multiple Formats
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Supports .doc and .docx files with perfect formatting
              preservation.
            </p>
          </div>

          <div className="text-center p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="bg-green-100 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <FaDownload className="text-lg sm:text-xl lg:text-2xl text-green-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
              Instant Download
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Get your converted PDF file immediately after processing.
            </p>
          </div>

          <div className="text-center p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg hover:shadow-xl transition-shadow duration-300 sm:col-span-2 lg:col-span-1">
            <div className="bg-purple-100 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <FaCheckCircle className="text-lg sm:text-xl lg:text-2xl text-purple-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
              High Quality
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Maintains original document quality and formatting perfectly.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Watermark */}
      <div className="text-center pb-4">
        <p className="text-xs text-gray-400/60 font-light tracking-widest">
          Developed by Abhi Poddar
        </p>
      </div>
    </div>
  );
}

export default Home;
