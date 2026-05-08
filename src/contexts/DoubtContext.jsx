import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const DoubtContext = createContext(null);

// ─── RICH MOCK DATA ───
const MOCK_DOUBTS = [
  {
    id: 'dbt_001',
    title: 'Why does quicksort have O(n²) worst case?',
    body: 'I understand the average case is O(n log n) due to balanced partitions, but my professor mentioned the worst case is O(n²). When exactly does this happen and how can we avoid it in practice? Is randomized pivot selection always the fix?',
    author: { id: 'u1', name: 'Sarah Chen', initials: 'SC' },
    category: 'DSA',
    tags: ['sorting', 'complexity', 'algorithms'],
    difficulty: 'intermediate',
    scope: 'global',
    upvotes: 24,
    downvotes: 2,
    viewCount: 156,
    isResolved: true,
    bestAnswerId: 'ans_001',
    answers: [
      {
        id: 'ans_001', author: { id: 'u2', name: 'Marcus Lee', initials: 'ML' },
        body: 'Great question! The worst case happens when the pivot chosen is always the smallest or largest element, leading to maximally unbalanced partitions. For example, if the array is already sorted and you always pick the first element as pivot, you get n-1, n-2, ... partitions. Randomized pivot selection or median-of-three helps avoid this in practice.',
        upvotes: 18, isBestAnswer: true, isVerified: true,
        replies: [
          { id: 'r_001', author: { id: 'u1', name: 'Sarah Chen', initials: 'SC' }, body: 'That makes so much sense! Thank you Marcus.', createdAt: '1h ago' }
        ],
        createdAt: '3h ago'
      },
      {
        id: 'ans_002', author: { id: 'u5', name: 'Priya Sharma', initials: 'PS' },
        body: 'Adding to Marcus\'s answer: in competitive programming, we often use introsort (hybrid of quicksort + heapsort) which switches to heapsort when the recursion depth exceeds a threshold. This guarantees O(n log n) worst case.',
        upvotes: 7, isBestAnswer: false, isVerified: false, replies: [], createdAt: '2h ago'
      }
    ],
    createdAt: '5h ago',
    lastActivityAt: '1h ago'
  },
  {
    id: 'dbt_002',
    title: 'Difference between TCP and UDP with real-world examples?',
    body: 'I keep mixing up when to use TCP vs UDP. Can someone explain with actual use cases? My textbook explanations are too abstract.',
    author: { id: 'u3', name: 'Alex Rivera', initials: 'AR' },
    category: 'Coding',
    tags: ['networking', 'protocols', 'web'],
    difficulty: 'beginner',
    scope: 'global',
    upvotes: 42,
    downvotes: 1,
    viewCount: 312,
    isResolved: true,
    bestAnswerId: 'ans_003',
    answers: [
      {
        id: 'ans_003', author: { id: 'u4', name: 'Jordan Kim', initials: 'JK' },
        body: 'Think of TCP like a phone call — you establish a connection, you know the other person heard you, and messages arrive in order. UDP is like sending postcards — fast, no confirmation, but some might get lost.\n\nTCP: Web browsing, email, file transfer\nUDP: Video streaming, online gaming, DNS lookups\n\nThe key tradeoff is reliability vs speed.',
        upvotes: 35, isBestAnswer: true, isVerified: true, replies: [], createdAt: '1d ago'
      }
    ],
    createdAt: '2d ago',
    lastActivityAt: '1d ago'
  },
  {
    id: 'dbt_003',
    title: 'How to prove that √2 is irrational?',
    body: 'I need to write a proof by contradiction for my assignment. I\'ve seen different versions online but I\'m not sure which approach is the cleanest. Can someone walk me through the standard proof?',
    author: { id: 'u6', name: 'Elena Rodriguez', initials: 'ER' },
    category: 'Maths',
    tags: ['proofs', 'number-theory', 'irrational'],
    difficulty: 'intermediate',
    scope: 'global',
    upvotes: 18,
    downvotes: 0,
    viewCount: 89,
    isResolved: false,
    bestAnswerId: null,
    answers: [
      {
        id: 'ans_004', author: { id: 'u7', name: 'David Park', initials: 'DP' },
        body: 'The classic proof: Assume √2 = p/q where p,q are coprime integers. Then 2 = p²/q², so p² = 2q². This means p² is even, so p must be even. Write p = 2k. Then 4k² = 2q², so q² = 2k², meaning q is also even. But this contradicts p,q being coprime. Therefore √2 is irrational.',
        upvotes: 12, isBestAnswer: false, isVerified: false, replies: [], createdAt: '4h ago'
      }
    ],
    createdAt: '6h ago',
    lastActivityAt: '4h ago'
  },
  {
    id: 'dbt_004',
    title: 'What is the difference between CNN and RNN?',
    body: 'Starting my deep learning course and I\'m confused about when to use CNNs vs RNNs. They both seem to handle complex data but in different ways?',
    author: { id: 'u8', name: 'Aisha Patel', initials: 'AP' },
    category: 'AI/ML',
    tags: ['deep-learning', 'neural-networks', 'cnn', 'rnn'],
    difficulty: 'beginner',
    scope: 'global',
    upvotes: 31,
    downvotes: 0,
    viewCount: 245,
    isResolved: true,
    bestAnswerId: 'ans_005',
    answers: [
      {
        id: 'ans_005', author: { id: 'u2', name: 'Marcus Lee', initials: 'ML' },
        body: 'CNNs are designed for spatial data (images, videos). They use convolutional filters to detect patterns like edges, textures, objects. Think: image classification, object detection.\n\nRNNs are designed for sequential data (text, time series). They maintain a "memory" of previous inputs. Think: language translation, speech recognition.\n\nModern transformers are replacing RNNs for many NLP tasks, but understanding both is still fundamental.',
        upvotes: 28, isBestAnswer: true, isVerified: true, replies: [], createdAt: '1d ago'
      }
    ],
    createdAt: '3d ago',
    lastActivityAt: '1d ago'
  },
  {
    id: 'dbt_005',
    title: 'Newton\'s third law — why doesn\'t everything cancel out?',
    body: 'If every action has an equal and opposite reaction, why doesn\'t everything just stay still? When I push a wall, the wall pushes back on me, so the net force should be zero, right? What am I missing?',
    author: { id: 'u9', name: 'Tom Baker', initials: 'TB' },
    category: 'Physics',
    tags: ['mechanics', 'forces', 'newtons-laws'],
    difficulty: 'beginner',
    scope: 'global',
    upvotes: 56,
    downvotes: 3,
    viewCount: 420,
    isResolved: true,
    bestAnswerId: 'ans_006',
    answers: [
      {
        id: 'ans_006', author: { id: 'u10', name: 'Dr. Lisa Wong', initials: 'LW' },
        body: 'The key insight: the action and reaction forces act on DIFFERENT objects! When you push the wall, you exert force on the wall, and the wall exerts force on you. These forces don\'t cancel because they\'re on different bodies.\n\nForces only cancel when they act on the SAME object. That\'s Newton\'s second law territory (F_net = ma on a single body).\n\nWhen you push a box across the floor, you push the box (force on box), box pushes back on your hand (force on you). The box moves because the force you apply exceeds friction — all forces considered are on the box.',
        upvotes: 48, isBestAnswer: true, isVerified: true,
        replies: [
          { id: 'r_002', author: { id: 'u9', name: 'Tom Baker', initials: 'TB' }, body: 'This is the clearest explanation I\'ve ever seen. The "different objects" part was the missing piece!', createdAt: '2h ago' }
        ],
        createdAt: '8h ago'
      }
    ],
    createdAt: '1d ago',
    lastActivityAt: '2h ago'
  },
  {
    id: 'dbt_006',
    title: 'How does React\'s useEffect cleanup function work?',
    body: 'I keep getting memory leak warnings in my React app. I know useEffect can return a cleanup function, but when exactly does it run? Before unmount? Before every re-render?',
    author: { id: 'u4', name: 'Jordan Kim', initials: 'JK' },
    category: 'Coding',
    tags: ['react', 'hooks', 'javascript'],
    difficulty: 'intermediate',
    scope: 'global',
    upvotes: 19,
    downvotes: 1,
    viewCount: 134,
    isResolved: false,
    bestAnswerId: null,
    answers: [],
    createdAt: '30m ago',
    lastActivityAt: '30m ago'
  },
  {
    id: 'dbt_007',
    title: 'Le Chatelier\'s Principle — what happens when we add a catalyst?',
    body: 'Does adding a catalyst shift the equilibrium position? My study group is split on this. Some say it shifts right, others say no change.',
    author: { id: 'u11', name: 'Nina Gupta', initials: 'NG' },
    category: 'Chemistry',
    tags: ['equilibrium', 'catalysts', 'thermodynamics'],
    difficulty: 'intermediate',
    scope: 'global',
    upvotes: 15,
    downvotes: 0,
    viewCount: 98,
    isResolved: true,
    bestAnswerId: 'ans_007',
    answers: [
      {
        id: 'ans_007', author: { id: 'u12', name: 'Prof. Ahmed', initials: 'PA' },
        body: 'A catalyst does NOT shift the equilibrium position. It speeds up both the forward AND reverse reactions equally. The system reaches equilibrium faster, but the final concentrations are the same.\n\nLe Chatelier\'s Principle only applies to changes in concentration, pressure, or temperature — not catalysts.',
        upvotes: 14, isBestAnswer: true, isVerified: true, replies: [], createdAt: '5h ago'
      }
    ],
    createdAt: '8h ago',
    lastActivityAt: '5h ago'
  },
  {
    id: 'dbt_008',
    title: 'Dynamic programming vs Greedy — when to use which?',
    body: 'I struggle to identify whether a problem needs DP or Greedy. Both seem to involve making optimal choices. What\'s the fundamental difference in problem structure?',
    author: { id: 'u13', name: 'Ryan Zhang', initials: 'RZ' },
    category: 'DSA',
    tags: ['dynamic-programming', 'greedy', 'problem-solving'],
    difficulty: 'advanced',
    scope: 'global',
    upvotes: 67,
    downvotes: 2,
    viewCount: 589,
    isResolved: false,
    bestAnswerId: null,
    answers: [
      {
        id: 'ans_008', author: { id: 'u2', name: 'Marcus Lee', initials: 'ML' },
        body: 'Key difference:\n\n**Greedy**: Makes the locally optimal choice at each step, hoping it leads to a globally optimal solution. Works when the problem has the "greedy choice property" (local optimal → global optimal).\n\n**DP**: Considers ALL possible choices and picks the best one by breaking the problem into overlapping subproblems. Works when the problem has "optimal substructure" AND "overlapping subproblems".\n\nRule of thumb: If you can prove that always picking the best immediate option works → Greedy. If you need to try all options and remember results → DP.',
        upvotes: 45, isBestAnswer: false, isVerified: false, replies: [], createdAt: '12h ago'
      }
    ],
    createdAt: '2d ago',
    lastActivityAt: '12h ago'
  },
  {
    id: 'dbt_009',
    title: 'Explain polymorphism with a simple real-world analogy',
    body: 'I understand inheritance in OOP but polymorphism confuses me. Can someone explain it like I\'m five?',
    author: { id: 'u14', name: 'Mia Johnson', initials: 'MJ' },
    category: 'Coding',
    tags: ['oop', 'polymorphism', 'java'],
    difficulty: 'beginner',
    scope: 'global',
    upvotes: 38,
    downvotes: 0,
    viewCount: 267,
    isResolved: true,
    bestAnswerId: 'ans_009',
    answers: [
      {
        id: 'ans_009', author: { id: 'u5', name: 'Priya Sharma', initials: 'PS' },
        body: 'Imagine a universal remote control with a "play" button. You can point it at a TV, a DVD player, or a music system. Pressing "play" does something different on each device, but you use the SAME button.\n\nIn code: you have a `play()` method. A `MusicPlayer` plays songs, a `VideoPlayer` plays movies. The caller just calls `play()` without caring which type it is. That\'s polymorphism — same interface, different behavior.',
        upvotes: 32, isBestAnswer: true, isVerified: true, replies: [], createdAt: '1d ago'
      }
    ],
    createdAt: '3d ago',
    lastActivityAt: '1d ago'
  },
  {
    id: 'dbt_010',
    title: 'What exactly is a Fourier Transform and why should I care?',
    body: 'Every engineering course mentions Fourier transforms but nobody explains WHY we need them in simple terms. I can do the math but I don\'t understand the intuition.',
    author: { id: 'u15', name: 'Chris Nguyen', initials: 'CN' },
    category: 'Maths',
    tags: ['fourier', 'signals', 'engineering'],
    difficulty: 'advanced',
    scope: 'global',
    upvotes: 73,
    downvotes: 1,
    viewCount: 812,
    isResolved: false,
    bestAnswerId: null,
    answers: [
      {
        id: 'ans_010', author: { id: 'u10', name: 'Dr. Lisa Wong', initials: 'LW' },
        body: 'Imagine you\'re listening to a song. Your ear hears ONE combined wave. The Fourier Transform is like having a magical prism that splits that single wave into individual frequencies — bass, mid, treble.\n\nWhy care? Because MANY problems are hard in "time domain" but easy in "frequency domain". Noise filtering, image compression (JPEG), audio processing (MP3), signal analysis — all use Fourier.\n\nIt\'s literally everywhere in engineering. You just can\'t see it because it works behind the scenes.',
        upvotes: 61, isBestAnswer: false, isVerified: true, replies: [], createdAt: '6h ago'
      }
    ],
    createdAt: '1d ago',
    lastActivityAt: '6h ago'
  },
];

const TOP_SOLVERS = [
  { id: 'u2', name: 'Marcus Lee', initials: 'ML', xp: 2840, solvedCount: 47, rank: 'Gold' },
  { id: 'u10', name: 'Dr. Lisa Wong', initials: 'LW', xp: 2210, solvedCount: 38, rank: 'Gold' },
  { id: 'u5', name: 'Priya Sharma', initials: 'PS', xp: 1560, solvedCount: 24, rank: 'Silver' },
  { id: 'u4', name: 'Jordan Kim', initials: 'JK', xp: 980, solvedCount: 15, rank: 'Bronze' },
  { id: 'u12', name: 'Prof. Ahmed', initials: 'PA', xp: 870, solvedCount: 12, rank: 'Bronze' },
];

const DEFAULT_STATE = {
  doubts: MOCK_DOUBTS,
  userVotes: {},
  savedDoubts: [],
  topSolvers: TOP_SOLVERS,
};

export function DoubtProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem('ew_doubts_data');
      return stored ? JSON.parse(stored) : DEFAULT_STATE;
    } catch {
      return DEFAULT_STATE;
    }
  });

  useEffect(() => {
    localStorage.setItem('ew_doubts_data', JSON.stringify(state));
  }, [state]);

  const addDoubt = useCallback((doubt) => {
    const newDoubt = {
      ...doubt,
      id: `dbt_${Date.now()}`,
      upvotes: 0,
      downvotes: 0,
      viewCount: 0,
      isResolved: false,
      bestAnswerId: null,
      answers: [],
      createdAt: 'just now',
      lastActivityAt: 'just now',
    };
    setState(prev => ({ ...prev, doubts: [newDoubt, ...prev.doubts] }));
    return newDoubt.id;
  }, []);

  const voteDoubt = useCallback((doubtId, direction) => {
    setState(prev => {
      const currentVote = prev.userVotes[doubtId];
      const newVotes = { ...prev.userVotes };
      const newDoubts = prev.doubts.map(d => {
        if (d.id !== doubtId) return d;
        let { upvotes, downvotes } = d;
        // Remove previous vote
        if (currentVote === 'up') upvotes--;
        if (currentVote === 'down') downvotes--;
        // Apply new vote (toggle off if same)
        if (currentVote === direction) {
          delete newVotes[doubtId];
        } else {
          newVotes[doubtId] = direction;
          if (direction === 'up') upvotes++;
          if (direction === 'down') downvotes++;
        }
        return { ...d, upvotes, downvotes };
      });
      return { ...prev, doubts: newDoubts, userVotes: newVotes };
    });
  }, []);

  const voteAnswer = useCallback((doubtId, answerId, direction) => {
    setState(prev => {
      const voteKey = `${doubtId}_${answerId}`;
      const currentVote = prev.userVotes[voteKey];
      const newVotes = { ...prev.userVotes };
      const newDoubts = prev.doubts.map(d => {
        if (d.id !== doubtId) return d;
        const newAnswers = d.answers.map(a => {
          if (a.id !== answerId) return a;
          let { upvotes } = a;
          if (currentVote === 'up') upvotes--;
          if (currentVote === direction) {
            delete newVotes[voteKey];
          } else {
            newVotes[voteKey] = direction;
            if (direction === 'up') upvotes++;
          }
          return { ...a, upvotes };
        });
        return { ...d, answers: newAnswers };
      });
      return { ...prev, doubts: newDoubts, userVotes: newVotes };
    });
  }, []);

  const addAnswer = useCallback((doubtId, answerData) => {
    setState(prev => ({
      ...prev,
      doubts: prev.doubts.map(d => {
        if (d.id !== doubtId) return d;
        return {
          ...d,
          answers: [...d.answers, {
            id: `ans_${Date.now()}`,
            ...answerData,
            upvotes: 0,
            isBestAnswer: false,
            isVerified: false,
            replies: [],
            createdAt: 'just now',
          }],
          lastActivityAt: 'just now',
        };
      })
    }));
  }, []);

  const markBestAnswer = useCallback((doubtId, answerId) => {
    setState(prev => ({
      ...prev,
      doubts: prev.doubts.map(d => {
        if (d.id !== doubtId) return d;
        return {
          ...d,
          isResolved: true,
          bestAnswerId: answerId,
          answers: d.answers.map(a => ({ ...a, isBestAnswer: a.id === answerId })),
        };
      })
    }));
  }, []);

  const toggleSave = useCallback((doubtId) => {
    setState(prev => ({
      ...prev,
      savedDoubts: prev.savedDoubts.includes(doubtId)
        ? prev.savedDoubts.filter(id => id !== doubtId)
        : [...prev.savedDoubts, doubtId],
    }));
  }, []);

  const incrementView = useCallback((doubtId) => {
    setState(prev => ({
      ...prev,
      doubts: prev.doubts.map(d =>
        d.id === doubtId ? { ...d, viewCount: d.viewCount + 1 } : d
      )
    }));
  }, []);

  return (
    <DoubtContext.Provider value={{
      ...state,
      addDoubt, voteDoubt, voteAnswer, addAnswer,
      markBestAnswer, toggleSave, incrementView,
    }}>
      {children}
    </DoubtContext.Provider>
  );
}

export function useDoubts() {
  const ctx = useContext(DoubtContext);
  if (!ctx) throw new Error('useDoubts must be used inside DoubtProvider');
  return ctx;
}
