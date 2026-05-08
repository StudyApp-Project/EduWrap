import { useState } from 'react';
import { useFlashcards } from '../../contexts/FlashcardContext';
import { ArrowLeft, Check, X, RotateCcw } from 'lucide-react';
import Stack from '../ui/Stack';
import Flashcard from './Flashcard';

export default function StudyMode() {
  const { decks, activeDeckId, setActiveDeckId, updateCardStatus, updateDeckLastStudied } = useFlashcards();
  const deck = decks.find(d => d.id === activeDeckId);
  
  const [isFinished, setIsFinished] = useState(false);
  const [sessionStats, setSessionStats] = useState({ known: 0, learning: 0 });

  if (!deck) return null;

  // Filter cards to study (new or learning)
  const cardsToStudy = deck.cards.filter(c => c.status !== 'known');

  const handleSwipeRight = (card) => {
    updateCardStatus(deck.id, card.id, 'known');
    setSessionStats(prev => ({ ...prev, known: prev.known + 1 }));
  };

  const handleSwipeLeft = (card) => {
    updateCardStatus(deck.id, card.id, 'learning');
    setSessionStats(prev => ({ ...prev, learning: prev.learning + 1 }));
  };

  const handleEmpty = () => {
    updateDeckLastStudied(deck.id);
    setIsFinished(true);
  };

  const handleReset = () => {
    // Reset all cards in this deck to 'new' for testing purposes
    deck.cards.forEach(c => updateCardStatus(deck.id, c.id, 'new'));
    setIsFinished(false);
    setSessionStats({ known: 0, learning: 0 });
  };

  return (
    <div className="flex-1 w-full h-[calc(100vh-4rem)] flex flex-col bg-(--bg-primary) rounded-tl-xl border-l border-t border-(--border-subtle) overflow-hidden">
      {/* Header */}
      <div className="h-16 px-6 border-b border-(--border-subtle) flex items-center justify-between shrink-0 bg-(--bg-elevated)/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setActiveDeckId(null)}
            className="p-2 -ml-2 rounded-lg text-(--text-secondary) hover:bg-(--bg-hover) hover:text-(--text-primary) transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="font-semibold text-lg font-sora truncate max-w-[200px] md:max-w-sm">{deck.title}</h2>
        </div>
        {!isFinished && (
          <div className="text-sm font-medium text-(--text-tertiary) bg-(--bg-elevated) px-3 py-1 rounded-full border border-(--border-subtle)">
            {cardsToStudy.length} cards remaining
          </div>
        )}
      </div>

      {/* Main Area */}
      <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-center p-4">
        {cardsToStudy.length === 0 && !isFinished ? (
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold mb-4 font-sora text-(--text-primary)">All Caught Up!</h2>
            <p className="text-(--text-secondary) mb-8">You've mastered all the cards in this deck.</p>
            <button 
              onClick={handleReset}
              className="bg-(--bg-elevated) border border-(--border-subtle) text-(--text-primary) px-6 py-2.5 rounded-xl font-medium hover:bg-(--bg-hover) transition-colors cursor-pointer shadow-sm"
            >
              Reset Deck & Study Again
            </button>
          </div>
        ) : isFinished ? (
          <div className="text-center max-w-md animate-fade-in">
            <h2 className="text-3xl font-bold mb-2 font-sora text-(--text-primary)">Session Complete</h2>
            <p className="text-(--text-secondary) mb-8">Great job! Here is how you did:</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-(--bg-elevated) border border-(--border-subtle) p-6 rounded-2xl shadow-sm">
                <div className="text-3xl font-bold text-green-500 mb-1">{sessionStats.known}</div>
                <div className="text-sm text-(--text-tertiary)">Mastered</div>
              </div>
              <div className="bg-(--bg-elevated) border border-(--border-subtle) p-6 rounded-2xl shadow-sm">
                <div className="text-3xl font-bold text-orange-500 mb-1">{sessionStats.learning}</div>
                <div className="text-sm text-(--text-tertiary)">Learning</div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => setActiveDeckId(null)}
                className="bg-(--bg-elevated) border border-(--border-subtle) text-(--text-primary) px-6 py-2.5 rounded-xl font-medium hover:bg-(--bg-hover) transition-colors cursor-pointer shadow-sm"
              >
                Back to Library
              </button>
              <button 
                onClick={handleReset}
                className="bg-(--accent) text-white px-6 py-2.5 rounded-xl font-medium shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all cursor-pointer"
              >
                Study Again
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center text-(--text-tertiary) text-sm mb-8 animate-pulse font-medium">
              Click card to flip • Swipe Right if Known • Swipe Left if Learning
            </div>
            
            <Stack 
              cards={cardsToStudy}
              onSwipeRight={handleSwipeRight}
              onSwipeLeft={handleSwipeLeft}
              onEmpty={handleEmpty}
              renderCard={(card) => <Flashcard front={card.front} back={card.back} />}
            />

            <div className="flex gap-12 mt-12 w-full max-w-md justify-between px-12">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border-2 border-orange-500/30 flex items-center justify-center text-orange-500 mb-2 opacity-50 bg-orange-500/5">
                  <X className="w-6 h-6" />
                </div>
                <span className="text-xs text-(--text-tertiary) font-medium">Learning</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border-2 border-green-500/30 flex items-center justify-center text-green-500 mb-2 opacity-50 bg-green-500/5">
                  <Check className="w-6 h-6" />
                </div>
                <span className="text-xs text-(--text-tertiary) font-medium">Known</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
