"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File, X } from "lucide-react";
import {
  deleteFile,
  getParsedData,
  getSignedURL,
  createData,
  getPublicUrl,
} from "@/app/create/actions";
import { useParams } from "next/navigation";
import axios from "axios";

export function Dropbox() {
  const [files, setFiles] = useState<File[]>([]);
  const { projectId } = useParams<{ projectId: string }>();

  // console.log("this is the project id" ,projectId)
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = (file: File) => {
    setFiles(files.filter((f) => f !== file));
  };

  const handleUploading = async (currentFile: File) => {
    const uploadedFileId = uuidv4();
    const signedURLResult = await getSignedURL(uploadedFileId);
    if (signedURLResult.failure !== undefined) {
      console.error(signedURLResult.failure);
      return;
    }

    const { url } = signedURLResult.success;

    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": currentFile.type,
      },
      body: currentFile,
    });

    if (currentFile.type === "text/csv") {
      const data = await getParsedData(uploadedFileId, projectId);
      console.log(data);
      await createData(data);
      await deleteFile(uploadedFileId);
    }

    if (currentFile.type === "application/pdf") {
      // send request to python backend
      const url = await getPublicUrl(uploadedFileId);
      console.log(url);
      const response = await axios.post(
        "https://19f8-49-36-187-204.ngrok-free.app/client/fetch-data",
        { fileUrl: url, fileKey :uploadedFileId },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        // await deleteFile(uploadedFileId);
      } else {
        console.error("pdf data was not extracted");
      }
    }
  };

  const handleSubmit = async () => {
    files.map((file: File) => {
      handleUploading(file);
    });
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
        <p className="text-sm text-gray-400 mt-2">Supported formats: CSV</p>
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
      <button
        onClick={handleSubmit}
        className={`rounded-lg px-4 py-2 text-lg bg-primary-800 hover:bg-primary-700 mt-6 ${
          files.length > 0 ? "" : "hidden"
        } `}
      >
        Submit
      </button>
    </div>
  );
}

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  );
}
