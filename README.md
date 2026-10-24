# ASII Town — Echipa 4

Proiect introductiv IT: oraș explorabil cu **5 case personale**, mini-jocuri distincte, inventar, Casa Capcană, Camera Secretă și progres.

**Cerințe oficiale:** https://docs.google.com/document/d/1zubjC6SXTaaYIEL7s7hmqYgRFfsXWqRA6iLFn-r9Fns/mobilebasic

**Tehnologii:** React 19, TypeScript, Vite, React Router, Vitest. Aplicația nu necesită backend pentru demonstrația locală.

## Instalare

Node.js 20.19+ sau 22.12+:

```bash
git clone https://github.com/dragosandreibobu/asii-town.git
cd asii-town
npm ci
npm run dev
```

Site local: http://localhost:5173

## Fiecare coleg are o pagină și un fișier distinct

| Membru | URL | Componentă |
| --- | --- | --- |
| Andrei Irimia | `/rooms/andrei-irimia` | `src/pages/rooms/AndreiIrimiaRoom.tsx` |
| Andrei Lachovici | `/rooms/andrei-lachovici` | `src/pages/rooms/AndreiLachoviciRoom.tsx` |
| Giusepe Spataru | `/rooms/giusepe-spataru` | `src/pages/rooms/GiusepeSpataruRoom.tsx` |
| Mihai Negoita | `/rooms/mihai-negoita` | `src/pages/rooms/MihaiNegoitaRoom.tsx` |
| Dragoș Bobu | `/rooms/dragos-bobu` | `src/pages/rooms/DragosBobuRoom.tsx` |
| Oraș | `/` | `src/pages/Town.tsx` |
| Casa Capcană | `/trap` | `src/pages/TrapHouse.tsx` |
| Camera Secretă | `/secret` | `src/pages/SecretRoom.tsx` |

**Only the names above are genuine.** Every hobby, object, quote, answer, room theme, and puzzle is **example data**, not a description of a real teammate. Instagram handles supplied for identification are not GitHub usernames; none has been assumed.

## Cum lucrezi la propria cameră

1. Deschide componenta ta din `src/pages/rooms/`. Poți modifica liber mecanica mini-jocului acolo.
2. Camera ta este în datele comune `src/game/data.ts`: obiecte, indicii, citat de pe tablou, culoare, recompensă. Coordonează editările din acest fișier cu integratorul ca să evitați conflictele.
3. `RoomShell` furnizează 5 obiecte interactive, UV, covor deplasabil, modal, mesaje, inventar, navigare și afișaj de joc; nu trebuie să rescrii elementele comune.
4. La victoria reală în mini-joc, apelează `win('slug-ul-tau')` din `useGame()`.
5. Indiciile nu spun numele persoanei și nu folosesc formularea la persoana I. Pune cel puțin un indiciu care ajută un puzzle al altui coleg.
6. Transmite câte minimum două obiecte/replici pentru finalul din `FINAL_QUESTIONS`.

Exemplu de structură:

```tsx
import { RoomShell } from '../../components/RoomShell';
import { useGame } from '../../game/GameContext';

export default function MyRoom() {
  const { win } = useGame();
  // Implement your own victory condition. Do not ship an instant-win button.
  return <RoomShell member="andrei-irimia">
    {/* Render your own minigame; call win('andrei-irimia') upon success. */}
  </RoomShell>;
}
```

## Git workflow

Câte un branch pe membru, fără editări directe pe `main`:

```bash
git checkout -b feature/room-andrei-irimia
# Editează src/pages/rooms/AndreiIrimiaRoom.tsx
git add src/pages/rooms/AndreiIrimiaRoom.tsx
git commit -m "Personalize Andrei Irimia room"
git push -u origin feature/room-andrei-irimia
```

Deschide un Pull Request către `main`; integratorul rezolvă modificările asupra `src/game/data.ts`. Acesta conține date partajate, inclusiv întrebările și puzzle-urile.

## Stare de implementare (24 octombrie 2026)

**Bază funcțională implementată:** cele cinci rute personale; harta orașului; două case de decor (una cu indiciu); câte cinci obiecte interactive în fiecare cameră; modale; lumina UV; mutarea covorului; cinci mini-jocuri prototip diferite; inventar global colectabil/selectabil; progres; comutator zi/noapte; Casa Capcană cu șase enigme, răspunsuri între camere, fragment final, limită de trei indicii; Camera Secretă cu zece întrebări, scor, explicații și profil de grup provizoriu. Stare salvată automat în `localStorage`. Animație simplă de intrare în pagină.

**Necesită încă dezvoltare și verificare:** mecanici semnificativ distincte și mai elaborate în Casa Capcană (actualmente coduri, ghicitori introduse ca text și selecție multiplă); decor specific/obiecte inspectabile în Casa Capcană; conținut personal *real* și consens asupra motto-ului; verificarea relațiilor obiect–puzzle; testare cap-coadă în browser, accesibilitate și compatibilitate mobilă. Cele 12 teste actuale sunt teste automate pentru logica jocului, **nu** substituie testarea manuală end-to-end.

**Bonusuri prototip implementate:** salvare în localStorage, cronometru opțional de 20 minute (persistă la refresh; Game Over dacă nu se deblochează Camera Secretă), muzică generată local prin Web Audio și un sunet simplu la victorie, Easter egg ascuns în oraș, animație de intrare în pagină. Alte tranziții, efecte sonore specifice fiecărui mini-joc și muzică personalizată pot fi extinse. Schimbul de teste între echipe este o activitate manuală care **nu a avut loc**.

**Decizie tehnică pentru evitarea soft-lockului:** jucătorul poate intra în Casa Capcană numai după victoria în toate cele cinci mini-jocuri. Aceasta este o restricție suplimentară a prototipului, nu cerință explicită din document.

## Comenzi de verificare

```bash
npm test
npm run build
npm run preview
```

GitHub Actions execută testele și build-ul la push și pull request.

Căile individuale `/rooms/...` merg în Vite. Pe calculatorul integratorului repo-ul se află la `/home/admin/Projects/ASII/asii-town/`. Pentru hosting static separat este necesar fallback SPA către `index.html`; proiectul include reguli pentru Vercel/Netlify. Proiectul **nu este încă publicat ca website**.

## Decizii pentru kickoff

- Repartizați mecanicile finale ale mini-jocurilor și ale enigmelor din capcană.
- Înlocuiți toate indiciile fictive, fără a publica date personale neaprobate.
- Agreați motto-ul comun și profilul de grup.
- Planificați bonusurile și testarea între echipe.
- Adăugați colaboratorii GitHub numai după obținerea username-urilor corecte.
