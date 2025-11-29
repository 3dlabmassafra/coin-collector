'use client';

import React, { useEffect, useState } from 'react';
import { ImageUploader } from '@/components/ImageUploader';
import { CollectionList } from '@/components/CollectionList';
import { AnalysisResult } from '@/components/AnalysisResult';
import { analyzeImage, mapToNumismaticData, AIAnalysisResult } from '@/services/aiService';
import { saveItem, getAllItems, deleteItem, CollectionItem } from '@/services/storageService';
import { DatabaseItem, NUMISMATIC_DATABASE } from '@/data/numismaticDatabase';
import * as XLSX from 'xlsx';
import { Download, Coins, Search } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'analyze' | 'collection'>('analyze');
  const [collection, setCollection] = useState<CollectionItem[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [aiResults, setAiResults] = useState<AIAnalysisResult[] | null>(null);
  const [matchedItem, setMatchedItem] = useState<DatabaseItem | null>(null);

  useEffect(() => {
    loadCollection();
  }, []);

  const loadCollection = async () => {
    const items = await getAllItems();
    // Sort by date added descending
    setCollection(items.sort((a, b) => b.dateAdded - a.dateAdded));
  };

  const handleImageSelected = async (file: File, previewUrl: string) => {
    setCurrentImage(previewUrl);
    setIsAnalyzing(true);
    setAiResults(null);
    setMatchedItem(null);

    try {
      // 1. Run AI Analysis
      const results = await analyzeImage(previewUrl);
      setAiResults(results);

      // 2. Map to Database (Mock logic for now, finding a random match or based on keywords)
      // In a real app, we'd use the AI labels to fuzzy search the database
      const mappedData = mapToNumismaticData(results);

      if (mappedData.isNumismatic) {
        // DEMO: Simulate finding a match. 
        // We'll pick a random item from the DB to demonstrate the flow
        // In reality, we would match based on 'results' labels
        const randomMatch = NUMISMATIC_DATABASE[Math.floor(Math.random() * NUMISMATIC_DATABASE.length)];
        setMatchedItem(randomMatch);
      } else {
        // Fallback if not identified as coin
        console.warn("Not identified as a coin");
      }

    } catch (error) {
      console.error("Analysis failed", error);
      alert("Errore durante l'analisi dell'immagine.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveToCollection = async (condition: string, notes: string) => {
    if (!matchedItem || !currentImage) return;

    const valuation = matchedItem.valuations[condition as keyof typeof matchedItem.valuations] || 0;

    const newItem: CollectionItem = {
      ...matchedItem,
      instanceId: crypto.randomUUID(),
      dateAdded: Date.now(),
      condition,
      estimatedValue: valuation,
      userNotes: notes,
      imageUrl: currentImage
    };

    await saveItem(newItem);
    await loadCollection();

    // Reset state and switch to collection view
    setCurrentImage(null);
    setAiResults(null);
    setMatchedItem(null);
    setActiveTab('collection');
  };

  const handleDeleteItem = async (id: string) => {
    if (confirm('Sei sicuro di voler rimuovere questo oggetto dalla collezione?')) {
      await deleteItem(id);
      await loadCollection();
    }
  };

  const handleExportExcel = () => {
    const dataToExport = collection.map(item => ({
      ID: item.instanceId,
      Descrizione: item.description,
      Paese: item.country,
      Anno: item.year,
      Valore_Nominale: item.denomination,
      Conservazione: item.condition,
      Valore_Stimato: item.estimatedValue,
      Note: item.userNotes,
      Data_Aggiunta: new Date(item.dateAdded).toLocaleDateString()
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Collezione");
    XLSX.writeFile(wb, "CoinCollector_Export.xlsx");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400">
            <Coins size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-100 tracking-tight">CoinCollector</h1>
            <p className="text-slate-400">AI Numismatic Assistant</p>
          </div>
        </div>

        <div className="flex bg-slate-900/50 p-1 rounded-lg border border-white/10">
          <button
            onClick={() => setActiveTab('analyze')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'analyze'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-slate-200'
              }`}
          >
            Analizza
          </button>
          <button
            onClick={() => setActiveTab('collection')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'collection'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-slate-200'
              }`}
          >
            Collezione ({collection.length})
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-[600px]">
        {activeTab === 'analyze' ? (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2 mb-8">
              <h2 className="text-2xl font-bold text-slate-200">Nuova Analisi</h2>
              <p className="text-slate-400">Carica una foto per identificare e valutare la tua moneta</p>
            </div>

            <ImageUploader
              onImageSelected={handleImageSelected}
              className={currentImage ? "hidden" : ""}
            />

            {(currentImage || isAnalyzing) && (
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="glass-panel p-4 rounded-xl">
                  <img
                    src={currentImage!}
                    alt="Analysis Target"
                    className="w-full rounded-lg shadow-lg"
                  />
                  <button
                    onClick={() => {
                      setCurrentImage(null);
                      setMatchedItem(null);
                    }}
                    className="mt-4 w-full py-2 text-sm text-slate-400 hover:text-white border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    Carica un'altra foto
                  </button>
                </div>

                <AnalysisResult
                  isAnalyzing={isAnalyzing}
                  aiResults={aiResults}
                  matchedItem={matchedItem}
                  onSave={handleSaveToCollection}
                  onDiscard={() => {
                    setCurrentImage(null);
                    setMatchedItem(null);
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-200">La tua Collezione</h2>
              <button
                onClick={handleExportExcel}
                disabled={collection.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={18} />
                Esporta Excel
              </button>
            </div>

            <CollectionList
              items={collection}
              onDelete={handleDeleteItem}
            />
          </div>
        )}
      </main>
    </div>
  );
}
