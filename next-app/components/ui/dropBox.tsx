"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File, X } from "lucide-react";

export function Dropbox() {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = (file: File) => {
    setFiles(files.filter((f) => f !== file));
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors duration-300 ${
          isDragActive
            ? "border-primary-400 bg-primary-400/10"
            : "border-gray-600 hover:border-primary-400"
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-300">
          {isDragActive
            ? "Drop the files here"
            : "Drag & drop files here, or click to select files"}
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Supported formats: PDF, DOCX, TXT, CSV
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-primary-400 mb-3">
            Selected Files:
          </h3>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-slate-700 rounded-lg p-3"
              >
                <div className="flex items-center">
                  <File className="h-5 w-5 text-primary-400 mr-2" />
                  <span className="text-gray-300 truncate">{file.name}</span>
                </div>
                <button
                  onClick={() => removeFile(file)}
                  className="text-gray-400 hover:text-red-400 transition-colors duration-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
