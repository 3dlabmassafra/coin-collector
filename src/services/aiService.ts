import { env, pipeline, Pipeline } from '@xenova/transformers';

// Configure to use local models if possible, or download from CDN
env.allowLocalModels = false;
env.useBrowserCache = true;

// Singleton to hold the pipeline
let classifier: any = null;

export interface AIAnalysisResult {
    label: string;
    score: number;
    tags: string[];
}

export const initAI = async (progressCallback?: (progress: number) => void) => {
    if (classifier) return classifier;

    try {
        // Using a general purpose image classification model for demo purposes
        // Ideally we would use a fine-tuned model for coins
        classifier = await pipeline('image-classification', 'Xenova/vit-base-patch16-224', {
            progress_callback: (data: any) => {
                if (data.status === 'progress' && progressCallback) {
                    progressCallback(data.progress);
                }
            }
        });
        return classifier;
    } catch (error) {
        console.error("Failed to load AI model:", error);
        throw error;
    }
};

export const analyzeImage = async (imageUrl: string): Promise<AIAnalysisResult[]> => {
    const model = await initAI();
    const result = await model(imageUrl);
    // Result is usually [{ label: '...', score: ... }, ...]
    return result;
};

// Heuristic to map generic labels to numismatic terms (Mock logic for now)
export const mapToNumismaticData = (aiResults: AIAnalysisResult[]) => {
    // In a real scenario, we would check for 'coin', 'currency', 'silver', 'gold' etc.
    const topResult = aiResults[0];
    const isCoin = topResult.label.toLowerCase().includes('coin') ||
        topResult.label.toLowerCase().includes('money') ||
        topResult.label.toLowerCase().includes('round');

    return {
        isNumismatic: isCoin,
        suggestedTags: aiResults.map(r => r.label),
        confidence: topResult.score
    };
};
