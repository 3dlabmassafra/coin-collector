'use client';

import React from 'react';
import { AIAnalysisResult } from '@/services/aiService';
import { DatabaseItem, RARITY_COLORS, RARITY_LABELS } from '@/data/numismaticDatabase';
import { Check, AlertCircle } from 'lucide-react';

interface AnalysisResultProps {
    isAnalyzing: boolean;
    aiResults: AIAnalysisResult[] | null;
    matchedItem: DatabaseItem | null;
    onSave: (condition: string, notes: string) => void;
    onDiscard: () => void;
}

export function AnalysisResult({
    isAnalyzing,
    aiResults,
    matchedItem,
    onSave,
    onDiscard
}: AnalysisResultProps) {
    const [condition, setCondition] = React.useState<string>('BB');
    const [notes, setNotes] = React.useState<string>('');

    if (isAnalyzing) {
        return (
            <div className="glass-panel p-8 rounded-xl text-center space-y-4 animate-pulse">
                <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto"></div>
                <h3 className="text-xl font-semibold text-slate-200">Analisi in corso...</h3>
                <p className="text-slate-400">L'IA sta analizzando la tua immagine per identificare la moneta.</p>
            </div>
        );
    }

    if (!aiResults && !matchedItem) return null;

    return (
        <div className="glass-panel p-6 rounded-xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gradient">Risultato Analisi</h2>
                    <p className="text-slate-400 text-sm mt-1">
                        {matchedItem ? 'Identificazione riuscita' : 'Oggetto non identificato con certezza'}
                    </p>
                </div>
                {matchedItem && (
                    <span
                        className="px-3 py-1 rounded-full text-sm font-bold text-black shadow-sm"
                        style={{ backgroundColor: RARITY_COLORS[matchedItem.rarity] }}
                    >
                        {RARITY_LABELS[matchedItem.rarity]}
                    </span>
                )}
            </div>

            {matchedItem ? (
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-white/5">
                            <h3 className="font-semibold text-slate-200 mb-2">Dettagli Oggetto</h3>
                            <dl className="space-y-2 text-sm">
                                <div className="flex justify-between"><dt className="text-slate-400">Descrizione:</dt> <dd className="text-slate-100 font-medium text-right">{matchedItem.description}</dd></div>
                                <div className="flex justify-between"><dt className="text-slate-400">Paese:</dt> <dd className="text-slate-100">{matchedItem.country} {matchedItem.flag}</dd></div>
                                <div className="flex justify-between"><dt className="text-slate-400">Anno:</dt> <dd className="text-slate-100">{matchedItem.year}</dd></div>
                                <div className="flex justify-between"><dt className="text-slate-400">Valore Nominale:</dt> <dd className="text-slate-100">{matchedItem.denomination}</dd></div>
                                {matchedItem.material && <div className="flex justify-between"><dt className="text-slate-400">Materiale:</dt> <dd className="text-slate-100">{matchedItem.material}</dd></div>}
                            </dl>
                        </div>

                        <div className="bg-slate-900/50 p-4 rounded-lg border border-white/5">
                            <h3 className="font-semibold text-slate-200 mb-2">Stima Valore</h3>
                            <div className="grid grid-cols-3 gap-2 text-center text-xs">
                                {Object.entries(matchedItem.valuations).map(([grade, value]) => (
                                    <div key={grade} className={`p-2 rounded ${grade === condition ? 'bg-emerald-500/20 border border-emerald-500/50' : 'bg-white/5'}`}>
                                        <div className="font-bold text-slate-300">{grade}</div>
                                        <div className="text-emerald-400">€ {value.toFixed(2)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Stato di Conservazione
                            </label>
                            <select
                                value={condition}
                                onChange={(e) => setCondition(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            >
                                {Object.keys(matchedItem.valuations).map(grade => (
                                    <option key={grade} value={grade}>{grade}</option>
                                ))}
                            </select>
                            <p className="text-xs text-slate-500 mt-1">Seleziona lo stato per aggiornare la stima.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Note Personali
                            </label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none h-24 resize-none"
                                placeholder="Luogo di acquisto, difetti particolari..."
                            />
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={onDiscard}
                                className="flex-1 px-4 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 transition-colors"
                            >
                                Annulla
                            </button>
                            <button
                                onClick={() => onSave(condition, notes)}
                                className="flex-1 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-colors font-medium flex items-center justify-center gap-2"
                            >
                                <Check size={18} />
                                Salva in Collezione
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-8 space-y-4">
                    <AlertCircle className="mx-auto h-12 w-12 text-amber-500" />
                    <div>
                        <h3 className="text-lg font-medium text-slate-200">Nessuna corrispondenza esatta trovata</h3>
                        <p className="text-slate-400 max-w-md mx-auto">
                            L'IA ha rilevato: {aiResults?.map(r => r.label).slice(0, 3).join(', ')}.
                            Prova a caricare una foto più nitida o cerca manualmente nel database.
                        </p>
                    </div>
                    <button
                        onClick={onDiscard}
                        className="px-6 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                    >
                        Riprova
                    </button>
                </div>
            )}
        </div>
    );
}
