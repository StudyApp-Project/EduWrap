import { createContext, useContext, useState, useEffect } from 'react';
import { getPDFText } from '../services/pdfService';
import { generateQuizQuestions } from '../services/questionGenerator';

const QuizContext = createContext(undefined);

export function QuizProvider({ children }) {
  const [quizzes, setQuizzes] = useState(() => {
    const saved = localStorage.getItem('eduwrap_quizzes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse quizzes from localStorage', e);
      }
    }
    return [];
  });

  const [activeQuizId, setActiveQuizId] = useState(null);

  useEffect(() => {
    localStorage.setItem('eduwrap_quizzes', JSON.stringify(quizzes));
  }, [quizzes]);

  /**
   * Generate a new quiz from selected PDFs.
   */
  const generateQuiz = async (selectedPdfIds, selectedPdfTitles, count) => {
    let combinedText = '';

    for (const id of selectedPdfIds) {
      try {
        const text = await getPDFText(id);
        if (text) combinedText += text + '\n\n';
      } catch (err) {
        console.error("Failed to read text for pdf:", id, err);
      }
    }

    let questions = [];
    if (combinedText.trim().length > 50) {
      questions = generateQuizQuestions(combinedText, count);
    }

    if (questions.length === 0) {
      return null; // Can't generate quiz from image-only PDFs
    }

    const title = selectedPdfTitles.length > 1
      ? `Quiz from ${selectedPdfTitles.length} PDFs`
      : `Quiz: ${selectedPdfTitles[0] || 'Custom'}`;

    const newQuiz = {
      id: crypto.randomUUID(),
      title,
      description: `${questions.length} questions from your study materials.`,
      questions,
      totalQuestions: questions.length,
      score: null,       // null = not attempted yet
      answers: [],       // user's answers per question index
      completedAt: null,
      createdAt: new Date().toISOString(),
    };

    setQuizzes(prev => [newQuiz, ...prev]);
    return newQuiz.id;
  };

  /**
   * Submit an answer for the active quiz.
   */
  const submitAnswer = (quizId, questionIndex, selectedOptionIndex) => {
    setQuizzes(prev => prev.map(quiz => {
      if (quiz.id !== quizId) return quiz;
      const newAnswers = [...quiz.answers];
      newAnswers[questionIndex] = selectedOptionIndex;
      return { ...quiz, answers: newAnswers };
    }));
  };

  /**
   * Finish a quiz — calculate score.
   */
  const finishQuiz = (quizId) => {
    setQuizzes(prev => prev.map(quiz => {
      if (quiz.id !== quizId) return quiz;
      const correct = quiz.questions.reduce((acc, q, i) => {
        return acc + (quiz.answers[i] === q.correctIndex ? 1 : 0);
      }, 0);
      return {
        ...quiz,
        score: correct,
        completedAt: new Date().toISOString(),
      };
    }));
  };

  /**
   * Reset a quiz for retake.
   */
  const resetQuiz = (quizId) => {
    setQuizzes(prev => prev.map(quiz => {
      if (quiz.id !== quizId) return quiz;
      return { ...quiz, score: null, answers: [], completedAt: null };
    }));
  };

  const deleteQuiz = (quizId) => {
    setQuizzes(prev => prev.filter(q => q.id !== quizId));
    if (activeQuizId === quizId) setActiveQuizId(null);
  };

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        activeQuizId,
        setActiveQuizId,
        generateQuiz,
        submitAnswer,
        finishQuiz,
        resetQuiz,
        deleteQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
