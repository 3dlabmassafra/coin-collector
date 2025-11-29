'use client';

import React from 'react';
import { CollectionItem } from '@/services/storageService';
import { Trash2, ExternalLink, Coins } from 'lucide-react';
import { RARITY_COLORS, RARITY_LABELS } from '@/data/numismaticDatabase';

interface CollectionListProps {
    items: CollectionItem[];
    onDelete: (id: string) => void;
}

export function CollectionList({ items, onDelete }: CollectionListProps) {
    if (items.length === 0) {
        return (
            <div className="text-center py-12 glass-panel rounded-xl">
                <Coins className="mx-auto h-12 w-12 text-slate-500 mb-4" />
                <h3 className="text-lg font-medium text-slate-300">Nessun oggetto nella collezione</h3>
                <p className="text-slate-500">Inizia caricando e analizzando una moneta.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
                <div
                    key={item.instanceId}
                    className="glass-panel rounded-xl overflow-hidden group hover:border-emerald-500/30 transition-all duration-300"
                >
                    <div className="aspect-video relative bg-black/40">
                        {item.imageUrl ? (
                            <img
                                src={item.imageUrl}
                                alt={item.description}
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-600">
                                <ImageIcon className="h-12 w-12" />
                            </div>
                        )}
                        <div className="absolute top-2 right-2">
                            <span
                                className="px-2 py-1 rounded-md text-xs font-bold text-black shadow-sm"
                                style={{ backgroundColor: RARITY_COLORS[item.rarity] || '#ccc' }}
                            >
                                {RARITY_LABELS[item.rarity] || item.rarity}
                            </span>
                        </div>
                    </div>

                    <div className="p-4 space-y-3">
                        <div>
                            <h4 className="font-bold text-lg text-slate-100 truncate" title={item.description}>
                                {item.description}
                            </h4>
                            <p className="text-sm text-slate-400 flex justify-between">
                                <span>{item.country} • {item.year}</span>
                                <span>{item.denomination}</span>
                            </p>
                        </div>

                        <div className="flex justify-between items-end pt-2 border-t border-white/10">
                            <div>
                                <p className="text-xs text-slate-500 uppercase tracking-wider">Valore Stimato</p>
                                <p className="text-xl font-bold text-emerald-400">
                                    € {item.estimatedValue.toFixed(2)}
                                </p>
                                <p className="text-xs text-slate-400">Condizione: {item.condition}</p>
                            </div>

                            <button
                                onClick={() => onDelete(item.instanceId)}
                                className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                title="Rimuovi dalla collezione"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function ImageIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    );
}
