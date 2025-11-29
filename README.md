# CoinCollector AI 🪙

Web application per collezionisti di monete e banconote con analisi AI integrata nel browser.

## Funzionalità
- **Analisi AI Client-Side**: Identificazione oggetti tramite Transformers.js (nessuna API key richiesta).
- **Collezione Locale**: Salvataggio dati su IndexedDB (persistenza nel browser).
- **Stime Numismatiche**: Valutazione basata su rarità e stato di conservazione.
- **Export Excel**: Esportazione della collezione in formato .xlsx.
- **Privacy First**: Le immagini non vengono mai inviate a server esterni.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Glassmorphism UI)
- **AI**: @xenova/transformers (ONNX Runtime Web)
- **Storage**: IDB (IndexedDB wrapper)

## Installazione Locale

1. Clona il repository:
```bash
git clone https://github.com/tuo-username/coin-collector.git
cd coin-collector
```

2. Installa le dipendenze:
```bash
npm install
```

3. Avvia il server di sviluppo:
```bash
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) nel browser.

## Deploy

### Vercel (Consigliato)
1. Installa Vercel CLI: `npm i -g vercel`
2. Esegui `vercel` nella root del progetto.
3. Segui le istruzioni a schermo.

### Netlify
1. Trascina la cartella del progetto su Netlify Drop o collega il repo GitHub.
2. Build command: `npm run build`
3. Publish directory: `.next`

## Note
L'analisi AI richiede il download del modello (~100MB) al primo utilizzo. Successivamente funziona offline grazie alla cache del browser.
