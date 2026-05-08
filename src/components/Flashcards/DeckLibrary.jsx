import { useFlashcards } from '../../contexts/FlashcardContext';
import { Layers, Play, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import CreateDeckModal from './CreateDeckModal';

export default function DeckLibrary() {
  const { decks, setActiveDeckId, deleteDeck } = useFlashcards();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto w-full h-full overflow-y-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-sora text-(--text-primary) mb-2">Flashcards</h1>
          <p className="text-(--text-secondary)">Master your subjects with active recall and spaced repetition.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-(--accent) text-white px-5 py-2.5 rounded-xl font-medium shadow-md shadow-(--accent)/20 hover:-translate-y-0.5 hover:shadow-lg transition-all cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            New Deck
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {decks.map(deck => {
          const totalCards = deck.cards.length;
          const knownCards = deck.cards.filter(c => c.status === 'known').length;
          const progress = totalCards === 0 ? 0 : Math.round((knownCards / totalCards) * 100);

          return (
            <div key={deck.id} className="bg-(--bg-elevated) rounded-2xl p-6 border border-(--border-subtle) hover:shadow-xl transition-shadow flex flex-col h-64">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-(--accent)/10 text-(--accent) flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-(--text-primary)">{progress}%</div>
                    <div className="text-xs text-(--text-tertiary)">Mastered</div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteDeck(deck.id); }}
                    className="p-1.5 text-(--text-tertiary) hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors cursor-pointer"
                    title="Delete Deck"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-(--text-primary) mb-2 font-sora truncate">{deck.title}</h3>
              <p className="text-sm text-(--text-secondary) line-clamp-2 mb-auto">{deck.description}</p>
              
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-(--border-subtle)">
                <div className="text-sm text-(--text-tertiary)">{totalCards} cards</div>
                <button
                  onClick={() => setActiveDeckId(deck.id)}
                  className="w-10 h-10 rounded-full bg-(--accent) text-white flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-md shadow-(--accent)/30"
                >
                  <Play className="w-4 h-4 translate-x-[1px]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      <CreateDeckModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
