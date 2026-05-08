import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileBox, BrainCircuit, CheckCircle2 } from 'lucide-react';
import { useNotes } from '../../contexts/NotesContext';
import { useFlashcards } from '../../contexts/FlashcardContext';

export default function CreateDeckModal({ isOpen, onClose }) {
  const { notes } = useNotes();
  const { generateDeck } = useFlashcards();
  
  const pdfNotes = notes.filter(n => n.type === 'pdf');
  
  const [selectedPdfs, setSelectedPdfs] = useState([]);
  const [cardCount, setCardCount] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const togglePdf = (id) => {
    setSelectedPdfs(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleGenerate = async () => {
    if (selectedPdfs.length === 0) return;
    
    setIsGenerating(true);
    try {
      const selectedTitles = pdfNotes
        .filter(n => selectedPdfs.includes(n.id))
        .map(n => n.title);
        
      await generateDeck(selectedPdfs, selectedTitles, cardCount);
      onClose();
    } catch (e) {
      console.error("Failed to generate deck", e);
    } finally {
      setIsGenerating(false);
      setSelectedPdfs([]);
      setCardCount(10);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={e => e.stopPropagation()}
            className="bg-(--bg-primary) border border-(--border-subtle) rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="flex items-center justify-between p-6 border-b border-(--border-subtle) bg-(--bg-elevated)">
              <h2 className="text-xl font-bold font-sora text-(--text-primary)">Generate Deck</h2>
              <button 
                onClick={onClose}
                className="p-2 text-(--text-tertiary) hover:text-(--text-primary) hover:bg-(--bg-hover) rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <h3 className="font-semibold text-(--text-primary) mb-3">Select Source Material</h3>
              <p className="text-sm text-(--text-secondary) mb-4">Choose which PDFs the AI should use to generate your flashcards.</p>
              
              <div className="space-y-2 mb-8 max-h-64 overflow-y-auto pr-2">
                {pdfNotes.length === 0 ? (
                  <div className="text-center py-8 text-(--text-tertiary) bg-(--bg-elevated) rounded-xl border border-(--border-subtle)">
                    No PDFs found. Import PDFs in the Notes section first!
                  </div>
                ) : (
                  pdfNotes.map(pdf => {
                    const isSelected = selectedPdfs.includes(pdf.id);
                    return (
                      <button
                        key={pdf.id}
                        onClick={() => togglePdf(pdf.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-(--accent)/10 border-(--accent)/30' 
                            : 'bg-(--bg-elevated) border-(--border-subtle) hover:border-(--accent)/20'
                        }`}
                      >
                        <FileBox className={`w-5 h-5 shrink-0 ${isSelected ? 'text-(--accent)' : 'text-(--text-tertiary)'}`} />
                        <span className={`flex-1 truncate ${isSelected ? 'font-medium text-(--text-primary)' : 'text-(--text-secondary)'}`}>
                          {pdf.title}
                        </span>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-(--accent) shrink-0" />}
                      </button>
                    );
                  })
                )}
              </div>

              <h3 className="font-semibold text-(--text-primary) mb-3">Number of Cards</h3>
              <div className="flex items-center gap-4 bg-(--bg-elevated) p-4 rounded-xl border border-(--border-subtle)">
                <span className="text-xs text-(--text-tertiary) font-medium">1</span>
                <input 
                  type="range" 
                  min="1" 
                  max="20" 
                  value={cardCount} 
                  onChange={e => setCardCount(parseInt(e.target.value))}
                  className="flex-1 accent-(--accent) cursor-pointer"
                />
                <span className="text-sm font-bold w-6 text-right text-(--text-primary)">{cardCount}</span>
              </div>
            </div>

            <div className="p-6 border-t border-(--border-subtle) bg-(--bg-elevated) flex justify-end gap-3">
              <button 
                onClick={onClose}
                className="px-5 py-2.5 font-medium text-(--text-secondary) hover:text-(--text-primary) transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || selectedPdfs.length === 0}
                className="flex items-center gap-2 px-6 py-2.5 bg-(--accent) text-white rounded-xl font-medium shadow-md shadow-(--accent)/20 hover:shadow-lg disabled:opacity-50 transition-all cursor-pointer"
              >
                <BrainCircuit className={`w-4 h-4 ${isGenerating ? 'animate-pulse' : ''}`} />
                {isGenerating ? 'Generating...' : 'Generate Cards'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
