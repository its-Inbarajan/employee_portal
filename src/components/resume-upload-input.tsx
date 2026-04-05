"use client";
import { cn } from "@/lib/utils";
import { FileTextIcon, UploadCloudIcon, X } from "lucide-react";
import React from "react";
import { Accept, useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
interface FileUploadProps {
  onFileSelect: (file: File) => void;
  maxSizeInMB?: number;
  accpect: Accept;
}

export default function ResumeUpload({
  onFileSelect,
  accpect,
  maxSizeInMB = 2,
}: Readonly<FileUploadProps>) {
  const [file, setFile] = React.useState<File | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const onDrop = React.useCallback(
    (acceptedFile: File[]) => {
      const selectedFile = acceptedFile[0];

      if (selectedFile) {
        setFile(selectedFile);
        setError(null);
        onFileSelect?.(selectedFile);
      }
    },
    [onFileSelect],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accpect,
    maxFiles: 1,
    maxSize: maxSizeInMB * 1024 * 1024,
    onDropRejected(fileRejections) {
      setError(
        fileRejections[0].errors[0].code === "file-too-large"
          ? `File is too large (Max ${maxSizeInMB}MB)`
          : "Invalid file type. Please upload PDF or DOCX.",
      );
    },
  });

  const removeFile = () => {
    setFile(null);
    // onFileSelect?.(null);
  };
  return (
    <div className="max-w-full w-full space-y-4">
      {!file ? (
        <div
          {...getRootProps()}
          className={cn(
            "group relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl transition-all duration-200 cursor-pointer",
            isDragActive
              ? "border-primary bg-primary/5 scale-[1.02]"
              : "border-muted-foreground/25 hover:border-primary/50 hover:bg-accent",
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="p-3 mb-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
              <UploadCloudIcon className="w-6 h-6" />
            </div>
            <p className="mb-1 text-sm font-medium">
              <span className="text-primary">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-muted-foreground">
              PDF, DOCX (Max {maxSizeInMB}MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 border rounded-xl bg-card animate-in fade-in zoom-in duration-300">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <FileTextIcon className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium truncate max-w-[200px]">
                {file.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {(file.size / 1024).toFixed(0)} KB •{" "}
                <span className="text-green-500">Ready</span>
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={removeFile}
            className="hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
      {error && (
        <p className="text-xs ml-2 font-medium text-destructive animate-shake">
          {error}
        </p>
      )}
    </div>
  );
}
