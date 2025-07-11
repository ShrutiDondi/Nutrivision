import React, { useCallback, useState } from 'react';
import { Upload, Camera } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      onImageUpload(imageFile);
    }
  }, [onImageUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Camera className="w-5 h-5 mr-2 text-green-600" />
        Upload Food Image
      </h2>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
          isDragOver
            ? 'border-green-500 bg-green-50'
            : 'border-gray-300 hover:border-green-400 hover:bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-4">
          Drag and drop your food image here, or click to select
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
        >
          <Upload className="w-4 h-4 mr-2" />
          Choose Image
        </label>
        <p className="text-sm text-gray-500 mt-2">
          Supports JPEG, PNG files up to 10MB
        </p>
      </div>
    </div>
  );
};

export default ImageUpload;