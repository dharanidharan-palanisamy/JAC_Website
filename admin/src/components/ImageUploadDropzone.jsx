import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Link as LinkIcon, X, Check, FileUp } from 'lucide-react';

/**
 * Reusable Drag-and-Drop Image Upload Component
 * Supports:
 * - Drag and drop local image files (PNG, JPG, SVG, WebP, GIF)
 * - Click to browse local file system
 * - Direct Image URL / Local path mode
 * - Live preview with file details (size, name) and easy removal
 */
const ImageUploadDropzone = ({
  value = '',
  onChange,
  label = 'Logo / Image Asset',
  hint = 'PNG, JPG, SVG, WebP up to 10MB',
  required = false
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [activeMode, setActiveMode] = useState('upload'); // 'upload' | 'url'
  const [fileDetails, setFileDetails] = useState(null);
  const fileInputRef = useRef(null);

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const processFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, SVG, WebP, etc.)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB. Please upload a smaller image.');
      return;
    }

    setFileDetails({
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type
    });

    const reader = new FileReader();
    reader.onload = (e) => {
      if (onChange) {
        onChange(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setFileDetails(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (onChange) onChange('');
  };

  const hasImage = Boolean(value && value.trim());

  return (
    <div className="space-y-2">
      {/* Header with Mode Switcher */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-neutral-800">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>

        <div className="inline-flex items-center p-0.5 rounded-lg bg-neutral-100 border border-neutral-200 text-[11px] font-medium">
          <button
            type="button"
            onClick={() => setActiveMode('upload')}
            className={`px-2 py-0.5 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
              activeMode === 'upload'
                ? 'bg-white text-neutral-950 font-bold shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <FileUp className="w-3 h-3" />
            <span>Drag & Drop File</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('url')}
            className={`px-2 py-0.5 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
              activeMode === 'url'
                ? 'bg-white text-neutral-950 font-bold shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>Image URL</span>
          </button>
        </div>
      </div>

      {/* MODE 1: DRAG & DROP UPLOAD ZONE */}
      {activeMode === 'upload' && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
            onChange={handleFileChange}
            className="hidden"
          />

          {!hasImage ? (
            <div
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-black bg-neutral-100 scale-[1.01]'
                  : 'border-neutral-300 hover:border-black bg-neutral-50/60 hover:bg-neutral-50'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-white border border-neutral-200 text-neutral-800 flex items-center justify-center mx-auto mb-2 shadow-xs">
                <UploadCloud className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-neutral-900">
                Drag and drop your logo image here, or{' '}
                <span className="text-black underline underline-offset-2">Browse Files</span>
              </p>
              <p className="text-[11px] text-neutral-500 mt-1">{hint}</p>
            </div>
          ) : (
            <div className="relative bg-white border border-neutral-200 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-16 h-16 rounded-xl bg-neutral-50 border border-neutral-200 p-1.5 flex items-center justify-center shrink-0">
                  <img
                    src={value}
                    alt="Uploaded preview"
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="9">Preview</text></svg>';
                    }}
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-neutral-900 truncate">
                    {fileDetails?.name || 'Uploaded Image'}
                  </p>
                  <p className="text-[11px] font-mono text-neutral-500">
                    {fileDetails?.size || (value.startsWith('data:') ? 'Custom Upload' : value)}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 mt-0.5">
                    <Check className="w-3 h-3" /> Ready
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="py-1.5 px-3 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-medium transition-colors cursor-pointer"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODE 2: DIRECT URL / PATH INPUT */}
      {activeMode === 'url' && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange && onChange(e.target.value)}
              placeholder="e.g. /Logos/optimized/1.png or https://example.com/logo.png"
              className="flex-1 bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-xs font-mono focus:outline-none focus:border-black transition-colors"
            />
            {hasImage && (
              <button
                type="button"
                onClick={handleRemove}
                className="p-2.5 rounded-xl bg-neutral-100 hover:bg-rose-50 text-neutral-600 hover:text-rose-600 border border-neutral-200 transition-colors"
                title="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {hasImage && (
            <div className="h-16 rounded-xl bg-neutral-50 border border-neutral-200 p-2 flex items-center justify-center">
              <img
                src={value}
                alt="URL preview"
                className="max-h-12 max-w-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="30" viewBox="0 0 100 30"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23f43f5e" font-size="9">Invalid URL</text></svg>';
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploadDropzone;
