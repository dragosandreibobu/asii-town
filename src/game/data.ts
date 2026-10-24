export const MEMBER_IDS = ['andrei-irimia', 'andrei-lachovici', 'giusepe-spataru', 'mihai-negoita', 'dragos-bobu'] as const;
export type MemberId = (typeof MEMBER_IDS)[number];

export type RoomObject = {
  id: string;
  icon: string;
  label: string;
  description: string;
  kind: 'clue' | 'decoy' | 'collectible' | 'hidden';
};

export type RoomData = {
  name: string;
  title: string;
  accent: string;
  painting: string;
  reward: string;
  objects: RoomObject[];
};

// Only the team members' names are real. Room themes, hobbies, objects, 
// clues, puzzles and quiz answers are DEMO DATA to be personalized together.
// Social-media handles are not GitHub usernames and are not used here.
export const ROOMS: Record<MemberId, RoomData> = {
  'andrei-irimia': {
    name: 'Andrei Irimia',
    title: 'Atelierul ideilor',
    accent: '#feab5c',
    painting: 'Din haos se poate construi ordine.',
    reward: 'Fragmentul de cupru',
    objects: [
      { id: 'irimia-poster', icon: '🪧', label: 'Posterul', kind: 'clue', description: 'Pe poster este scris ECHIPA. Ar putea deschide ceva din casa comună.' },
      { id: 'irimia-notebook', icon: '📓', label: 'Agenda', kind: 'hidden', description: 'Sub lumina UV se vede combinația 3142.' },
      { id: 'irimia-key', icon: '🗝️', label: 'Cheie mică', kind: 'collectible', description: 'O cheie gravată cu simbolul unei roți.' },
      { id: 'irimia-painting', icon: '🖼️', label: 'Tabloul', kind: 'clue', description: 'Din haos se poate construi ordine.' },
      { id: 'irimia-monitor', icon: '💻', label: 'Monitorul', kind: 'decoy', description: 'Un terminal încărcat cu prea multe ferestre.' }
    ]
  },
  'andrei-lachovici': {
    name: 'Andrei Lachovici',
    title: 'Camera constelațiilor',
    accent: '#caa9f3',
    painting: 'Unele răspunsuri se găsesc în ritm.',
    reward: 'Fragmentul de argint',
    objects: [
      { id: 'lachovici-poster', icon: '🌙', label: 'Harta stelelor', kind: 'clue', description: 'Sub constelații este scris LUNA, cod pentru altă cameră.' },
      { id: 'lachovici-headphones', icon: '🎧', label: 'Căști', kind: 'collectible', description: 'O pereche de căști violet.' },
      { id: 'lachovici-journal', icon: '📖', label: 'Jurnal', kind: 'hidden', description: 'Un jurnal cu partituri și fotografii.' },
      { id: 'lachovici-painting', icon: '🖼️', label: 'Tabloul', kind: 'clue', description: 'Unele răspunsuri se găsesc în ritm.' },
      { id: 'lachovici-vinyl', icon: '💿', label: 'Vinil', kind: 'decoy', description: 'Un disc de colecție.' }
    ]
  },
  'giusepe-spataru': {
    name: 'Giusepe Spataru',
    title: 'Laboratorul spațial',
    accent: '#85d6cb',
    painting: 'Curiozitatea duce mereu mai departe.',
    reward: 'Fragmentul verde',
    objects: [
      { id: 'spataru-planet', icon: '🪐', label: 'Sistemul solar', kind: 'clue', description: 'Lângă Saturn apare cuvântul ORBIT.' },
      { id: 'spataru-robot', icon: '🤖', label: 'Robot miniatural', kind: 'collectible', description: 'Un robot construit din piese refolosite.' },
      { id: 'spataru-book', icon: '📚', label: 'Biblioteca', kind: 'hidden', description: 'Cărți SF și experimente.' },
      { id: 'spataru-painting', icon: '🖼️', label: 'Tabloul', kind: 'clue', description: 'Curiozitatea duce mereu mai departe.' },
      { id: 'spataru-telescope', icon: '🔭', label: 'Telescopul', kind: 'decoy', description: 'O colecție de hărți stelare.' }
    ]
  },
  'mihai-negoita': {
    name: 'Mihai Negoita',
    title: 'Studioul creativ',
    accent: '#f7a6b9',
    painting: 'O idee bună merită desenată.',
    reward: 'Fragmentul de sticlă',
    objects: [
      { id: 'negoita-monitor', icon: '🖥️', label: 'Monitor grafic', kind: 'clue', description: 'Pe monitor este afișat cuvântul PIXEL.' },
      { id: 'negoita-camera', icon: '📷', label: 'Aparatul foto', kind: 'collectible', description: 'Un aparat cu o curea colorată.' },
      { id: 'negoita-sketch', icon: '🎨', label: 'Caietul de schițe', kind: 'hidden', description: 'Un caiet plin cu desene și idei.' },
      { id: 'negoita-painting', icon: '🖼️', label: 'Tabloul', kind: 'clue', description: 'O idee bună merită desenată.' },
      { id: 'negoita-plant', icon: '🪴', label: 'Planta', kind: 'decoy', description: 'O plantă care preferă lumina.' }
    ]
  },
  'dragos-bobu': {
    name: 'Dragoș Bobu',
    title: 'Camera algoritmilor',
    accent: '#9cc3f7',
    painting: 'Fiecare problemă are o altă perspectivă.',
    reward: 'Fragmentul albastru',
    objects: [
      { id: 'bobu-board', icon: '📐', label: 'Tabla de probleme', kind: 'clue', description: 'În colțul tablei este scris VECTOR, pentru o enigmă din capcană.' },
      { id: 'bobu-keyboard', icon: '⌨️', label: 'Tastatura', kind: 'collectible', description: 'O tastatură cu taste programabile.' },
      { id: 'bobu-notes', icon: '📝', label: 'Notițe', kind: 'hidden', description: 'Pe o foaie apare șirul 2, 3, 5, 8, 13.' },
      { id: 'bobu-painting', icon: '🖼️', label: 'Tabloul', kind: 'clue', description: 'Fiecare problemă are o altă perspectivă.' },
      { id: 'bobu-cup', icon: '☕', label: 'Cana', kind: 'decoy', description: 'O cană lângă calculator.' }
    ]
  }
};

export type TrapPuzzle = {
  id: string;
  title: string;
  prompt: string;
  answer: string;
  source: string;
  requiredItem?: string;
  hint: string;
  type: 'code' | 'riddle' | 'choice';
  options?: string[];
};

export const TEAM_MOTTO = 'PUNTE'; // REPLACE after Team 4 agrees a shared answer.
export const TRAP_PUZZLES: TrapPuzzle[] = [
  { id: 'trap-irimia', title: 'Seiful lunar', prompt: 'Introdu codul de pe harta stelelor.', answer: 'LUNA', source: 'Camera lui Andrei Lachovici', requiredItem: 'fragment-andrei-lachovici', hint: 'Verifică harta constelațiilor.', type: 'code' },
  { id: 'trap-lachovici', title: 'Consola orbitală', prompt: 'Identifică parola lângă planeta cu inele.', answer: 'ORBIT', source: 'Camera lui Giusepe Spataru', requiredItem: 'fragment-giusepe-spataru', hint: 'Caută un obiect cu sistemul solar.', type: 'riddle' },
  { id: 'trap-spataru', title: 'Sistemul de proiectare', prompt: 'Ce cuvânt apare pe monitorul grafic?', answer: 'PIXEL', source: 'Camera lui Mihai Negoita', requiredItem: 'fragment-mihai-negoita', hint: 'Răspunsul apare într-un monitor dedicat desenului.', type: 'choice', options: ['PIXEL', 'FRAME', 'VECTOR', 'SHADER'] },
  { id: 'trap-negoita', title: 'Tabla algoritmilor', prompt: 'Găsește cuvântul scris în colțul tablei.', answer: 'VECTOR', source: 'Camera lui Dragoș Bobu', requiredItem: 'fragment-dragos-bobu', hint: 'Verifică tabla de probleme.', type: 'riddle' },
  { id: 'trap-bobu', title: 'Panoul atelierului', prompt: 'Introdu cuvântul de pe posterul din atelier.', answer: 'ECHIPA', source: 'Camera lui Andrei Irimia', requiredItem: 'fragment-andrei-irimia', hint: 'Posterul are un cuvânt despre colaborare.', type: 'code' },
  { id: 'trap-team', title: 'Jurământul echipei', prompt: 'Introduceți răspunsul convenit împreună la kickoff.', answer: TEAM_MOTTO, source: 'Discuția echipei', hint: 'Acest răspuns se stabilește împreună, nu se găsește într-o cameră.', type: 'code' }
];

export const FINAL_QUESTIONS: { id: string; clue: string; owner: MemberId; explanation: string }[] = [
  { id: 'q1', clue: 'Căștile violet și un disc de colecție', owner: 'andrei-lachovici', explanation: 'Ambele obiecte apar în Camera constelațiilor.' },
  { id: 'q2', clue: 'Un robot din piese refolosite', owner: 'giusepe-spataru', explanation: 'Robotul apare în Laboratorul spațial.' },
  { id: 'q3', clue: 'Un monitor pentru ilustrație digitală', owner: 'mihai-negoita', explanation: 'Monitorul se află în Studioul creativ.' },
  { id: 'q4', clue: 'Un terminal cu ferestre și o agendă cu coduri', owner: 'andrei-irimia', explanation: 'Ambele apar în Atelierul ideilor.' },
  { id: 'q5', clue: 'O tastatură programabilă', owner: 'dragos-bobu', explanation: 'Tastatura apare în Camera algoritmilor.' },
  { id: 'q6', clue: 'Harta constelațiilor și un jurnal cu partituri', owner: 'andrei-lachovici', explanation: 'Acestea apar în Camera constelațiilor.' },
  { id: 'q7', clue: 'Un telescop și o colecție de cărți SF', owner: 'giusepe-spataru', explanation: 'Acestea apar în Laboratorul spațial.' },
  { id: 'q8', clue: 'Un aparat foto și un caiet de schițe', owner: 'mihai-negoita', explanation: 'Acestea apar în Studioul creativ.' },
  { id: 'q9', clue: 'Un poster despre echipă și o cheie cu roată', owner: 'andrei-irimia', explanation: 'Acestea apar în Atelierul ideilor.' },
  { id: 'q10', clue: 'Tabla cu probleme și șirul 2, 3, 5, 8, 13', owner: 'dragos-bobu', explanation: 'Acestea apar în Camera algoritmilor.' }
];

export const TEAM_PROFILE = 'Cinci oameni, cinci camere și o experiență comună. Profilul acesta este provizoriu și va fi scris împreună de echipă.';
