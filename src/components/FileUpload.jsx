import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, Image as ImageIcon, X, CheckCircle2 } from 'lucide-react';

export default function FileUpload({
  label,
  required = false,
  accept = 'image/*',
  selectedFile,
  onFileSelect,
  onFileRemove,
  previewUrl,
  helpText,
  id
}) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
          {required && <span className="text-rose-500 mr-1">*</span>}
          {label}
        </label>
        {selectedFile && (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
            <CheckCircle2 className="w-3.5 h-3.5" /> Selected
          </span>
        )}
      </div>

      {previewUrl || selectedFile ? (
        <div className="relative group rounded-xl border border-slate-200 bg-slate-50/70 p-3 flex items-center gap-4 shadow-2xs">
          {previewUrl ? (
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
              <img
                src={previewUrl}
                alt="File Preview"
                className="w-full h-full object-cover object-center"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">
              {selectedFile?.name || 'Uploaded File'}
            </p>
            {selectedFile?.size && (
              <p className="text-xs text-slate-500">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            )}
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-1 text-xs font-medium text-indigo-600 hover:text-indigo-800 underline"
            >
              Change file
            </button>
          </div>

          <button
            type="button"
            onClick={onFileRemove}
            aria-label="Remove file"
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-rose-100 hover:text-rose-600 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-4 sm:p-5 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-indigo-500 bg-indigo-50/50 scale-[0.99]'
              : 'border-slate-300 hover:border-indigo-400 bg-slate-50/40 hover:bg-slate-50'
          }`}
        >
          <div className="w-10 h-10 mx-auto rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
            <UploadCloud className="w-5 h-5" />
          </div>
          <p className="text-xs sm:text-sm font-medium text-slate-700">
            <span className="text-indigo-600 font-semibold hover:underline">Click to upload</span> or drag and drop
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            {helpText || 'PNG, JPG, JPEG or PDF (max. 10MB)'}
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
}
