'use client';

import React, { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
    onImageSelected: (file: File, previewUrl: string) => void;
    className?: string;
}

export function ImageUploader({ onImageSelected, className }: ImageUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            processFile(file);
        }
    }, []);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    }, []);

    const processFile = (file: File) => {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;
            setPreview(result);
            onImageSelected(file, result);
        };
        reader.readAsDataURL(file);
    };

    const clearImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPreview(null);
    };

    return (
        <div
            className={cn(
                "relative group cursor-pointer transition-all duration-300 ease-in-out",
                "border-2 border-dashed rounded-xl p-8 text-center",
                isDragging
                    ? "border-emerald-500 bg-emerald-500/10 scale-[1.02]"
                    : "border-slate-700 hover:border-slate-500 hover:bg-slate-800/50",
                preview ? "border-none p-0 overflow-hidden" : "",
                className
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload')?.click()}
        >
            <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileInput}
            />

            {preview ? (
                <div className="relative w-full h-64 md:h-80">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-contain bg-black/40 rounded-xl"
                    />
                    <button
                        onClick={clearImage}
                        className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full transition-colors backdrop-blur-sm"
                    >
                        <X size={20} />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-sm font-medium">Clicca o trascina per cambiare immagine</p>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center space-y-4 py-8">
                    <div className={cn(
                        "p-4 rounded-full transition-colors",
                        isDragging ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-400 group-hover:text-slate-200"
                    )}>
                        <Upload size={40} />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-slate-200">
                            Carica foto moneta/banconota
                        </h3>
                        <p className="text-sm text-slate-400 max-w-xs mx-auto">
                            Trascina qui il file o clicca per selezionare. Supporta JPG, PNG.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
