export const MEMBER_IDS = ['alex', 'mara', 'teo', 'daria'] as const;
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

// All names, personal details and solutions below are DEMO placeholders.
// Team members should edit only their own room component and data entry.
export const ROOMS: Record<MemberId, RoomData> = {
  alex: {
    name: 'Alex',
    title: 'Atelierul ideilor',
    accent: '#feab5c',
    painting: 'Din haos se poate construi ordine.',
    reward: 'Fragmentul de cupru',
    objects: [
      { id: 'alex-poster', icon: '🪧', label: 'Posterul', kind: 'clue', description: 'Patru litere mari: ECHIPA. Ar putea deschide ceva din casa comună.' },
      { id: 'alex-notebook', icon: '📓', label: 'Agenda', kind: 'hidden', description: 'Sub lumină apare combinația 3142.' },
      { id: 'alex-key', icon: '🗝️', label: 'Cheie mică', kind: 'collectible', description: 'O cheie decorativă gravată cu simbolul unei roți.' },
      { id: 'alex-painting', icon: '🖼️', label: 'Tabloul', kind: 'clue', description: 'Din haos se poate construi ordine.' },
      { id: 'alex-monitor', icon: '💻', label: 'Monitorul', kind: 'decoy', description: 'Un terminal încărcat cu prea multe ferestre.' }
    ]
  },
  mara: {
    name: 'Mara',
    title: 'Camera constelațiilor',
    accent: '#caa9f3',
    painting: 'Unele răspunsuri se găsesc în ritm.',
    reward: 'Fragmentul de argint',
    objects: [
      { id: 'mara-poster', icon: '🌙', label: 'Harta stelelor', kind: 'clue', description: 'Sub constelații este scris LUNA. Pare un cod pentru alt coleg.' },
      { id: 'mara-headphones', icon: '🎧', label: 'Căști', kind: 'collectible', description: 'Căști violet folosite în sesiunile de muzică.' },
      { id: 'mara-journal', icon: '📖', label: 'Jurnal', kind: 'hidden', description: 'O colecție de partituri, fotografii și amintiri.' },
      { id: 'mara-painting', icon: '🖼️', label: 'Tabloul', kind: 'clue', description: 'Unele răspunsuri se găsesc în ritm.' },
      { id: 'mara-vinyl', icon: '💿', label: 'Vinil', kind: 'decoy', description: 'O piesă preferată; nu toate detaliile reprezintă indicii.' }
    ]
  },
  teo: {
    name: 'Teo',
    title: 'Laboratorul spațial',
    accent: '#85d6cb',
    painting: 'Curiozitatea duce mereu mai departe.',
    reward: 'Fragmentul verde',
    objects: [
      { id: 'teo-planet', icon: '🪐', label: 'Sistemul solar', kind: 'clue', description: 'Lângă Saturn apare cuvântul ORBIT. O posibilă parolă.' },
      { id: 'teo-robot', icon: '🤖', label: 'Robot miniatural', kind: 'collectible', description: 'Un robot construit din piese refolosite.' },
      { id: 'teo-book', icon: '📚', label: 'Biblioteca', kind: 'hidden', description: 'O colecție de povești SF și experimente.' },
      { id: 'teo-painting', icon: '🖼️', label: 'Tabloul', kind: 'clue', description: 'Curiozitatea duce mereu mai departe.' },
      { id: 'teo-telescope', icon: '🔭', label: 'Telescopul', kind: 'decoy', description: 'Pe cer sunt sute de stele; doar câteva contează.' }
    ]
  },
  daria: {
    name: 'Daria',
    title: 'Studioul creativ',
    accent: '#f7a6b9',
    painting: 'O idee bună merită desenată.',
    reward: 'Fragmentul de sticlă',
    objects: [
      { id: 'daria-monitor', icon: '🖥️', label: 'Monitor grafic', kind: 'clue', description: 'Pe ecran este afișat cuvântul PIXEL, ca o semnătură.' },
      { id: 'daria-camera', icon: '📷', label: 'Aparatul foto', kind: 'collectible', description: 'Aparat cu o curea colorată și multe amintiri.' },
      { id: 'daria-sketch', icon: '🎨', label: 'Caietul de schițe', kind: 'hidden', description: 'Desene, personaje și idei pentru proiecte.' },
      { id: 'daria-painting', icon: '🖼️', label: 'Tabloul', kind: 'clue', description: 'O idee bună merită desenată.' },
      { id: 'daria-plant', icon: '🪴', label: 'Planta', kind: 'decoy', description: 'O plantă care are nevoie de mai multă lumină.' }
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
};

export const TEAM_MOTTO = 'PUNTE'; // Replace after the kickoff.
export const TRAP_PUZZLES: TrapPuzzle[] = [
  { id: 'trap-alex', title: 'Seiful lunar', prompt: 'Codul găsit pe harta stelelor', answer: 'LUNA', source: 'Camera Marei', requiredItem: 'fragment-mara', hint: 'Verifică posterul cu constelații.' },
  { id: 'trap-mara', title: 'Consola orbitală', prompt: 'Parola găsită lângă planeta cu inele', answer: 'ORBIT', source: 'Camera lui Teo', requiredItem: 'fragment-teo', hint: 'Caută un obiect ce reprezintă sistemul solar.' },
  { id: 'trap-teo', title: 'Sistemul de proiectare', prompt: 'Cuvântul afișat pe un monitor grafic', answer: 'PIXEL', source: 'Camera Dariei', requiredItem: 'fragment-daria', hint: 'Un monitor dedicat desenului păstrează codul.' },
  { id: 'trap-daria', title: 'Panoul atelierului', prompt: 'Cuvântul de pe posterul atelierului', answer: 'ECHIPA', source: 'Camera lui Alex', requiredItem: 'fragment-alex', hint: 'Un poster amintește ce înseamnă colaborarea.' },
  { id: 'trap-team', title: 'Jurământul echipei', prompt: 'Introduceți cuvântul convenit împreună la kickoff', answer: TEAM_MOTTO, source: 'Discuția echipei', hint: 'Acest răspuns este convenit la întâlnirea echipei, nu este ascuns în camere.' }
];

export const FINAL_QUESTIONS: { id: string; clue: string; owner: MemberId; explanation: string }[] = [
  { id: 'q1', clue: 'Căștile violet și o colecție de discuri', owner: 'mara', explanation: 'Camera constelațiilor este plină de muzică.' },
  { id: 'q2', clue: 'Un robot construit din piese refolosite', owner: 'teo', explanation: 'Laboratorul spațial adăpostește robotul.' },
  { id: 'q3', clue: 'Un monitor pentru ilustrație digitală', owner: 'daria', explanation: 'Studioul creativ este dedicat desenului.' },
  { id: 'q4', clue: 'Un terminal cu multe ferestre și o agendă cu coduri', owner: 'alex', explanation: 'Atelierul ideilor conține un terminal și o agendă.' },
  { id: 'q5', clue: 'Harta constelațiilor și o partitură', owner: 'mara', explanation: 'În această cameră se îmbină astronomia și muzica.' },
  { id: 'q6', clue: 'Un telescop și o colecție de cărți SF', owner: 'teo', explanation: 'Sunt obiecte din laboratorul spațial.' },
  { id: 'q7', clue: 'Un aparat foto și un caiet de schițe', owner: 'daria', explanation: 'Studioul creativ păstrează ambele obiecte.' },
  { id: 'q8', clue: 'Un poster despre colaborare și o cheie cu roată', owner: 'alex', explanation: 'Aceste obiecte apar în atelierul ideilor.' }
];

export const TEAM_PROFILE = 'Patru stiluri diferite, o singură echipă: idei, muzică, explorare și creație. Proiectul arată cum detaliile personale devin un joc comun.';
