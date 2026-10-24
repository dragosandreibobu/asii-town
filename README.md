# ASII Town — Team 4

Interactive town for the ASII IT introductory project, implemented in **React + TypeScript + Vite**.

**Requirements:** https://docs.google.com/document/d/1zubjC6SXTaaYIEL7s7hmqYgRFfsXWqRA6iLFn-r9Fns/mobilebasic

> All names, personal details, room puzzles and final quiz content are **fictional placeholders**. Replace these with the real team members' names and approved public details. Do not add private data to this public GitHub repository.

## Getting started

You need Node.js 20.19+ or Node.js 22+.

```bash
git clone https://github.com/dragosandreibobu/asii-town.git
cd asii-town
npm install
npm run dev
```

Open http://localhost:5173. Direct links to teammate rooms:

| Page | URL | Source file |
| --- | --- | --- |
| Demo Alex | /rooms/alex | src/pages/rooms/AlexRoom.tsx |
| Demo Mara | /rooms/mara | src/pages/rooms/MaraRoom.tsx |
| Demo Teo | /rooms/teo | src/pages/rooms/TeoRoom.tsx |
| Demo Daria | /rooms/daria | src/pages/rooms/DariaRoom.tsx |
| Town | / | src/pages/Town.tsx |
| Trap House | /trap | src/pages/TrapHouse.tsx |
| Secret Room | /secret | src/pages/SecretRoom.tsx |

Each teammate owns one room component and its personal data in `src/game/data.ts`. Avoid editing routing or the shared game context independently; ask the integrator first.

## How to personalize your room

1. Choose your route/room file (for example `src/pages/rooms/AlexRoom.tsx`).
2. Change the mini-game inside that file. Win by calling `win('alex')` with the correct member ID.
3. Ask the integrator to change your member display name, room objects, painting, color and reward in `src/game/data.ts`. Keep **at least five interactive objects** and one modal object.
4. Coordinate the trap puzzle clue hidden in your room with the person who owns the matching puzzle. Each mini-game must be a **different type**; at least one must be an input/password game.
5. Make sure each room has two interactive personalization features (shared `RoomShell` already offers UV lighting, moving the rug, modal inspection and message popups).
6. Everyone contributes **at least two objects/quotes** to the final quiz, whose data lives in `src/game/data.ts`.

The room shell provides a shared layout, navigation, inventory collection, UV light, a movable rug, and a modal, so your task is **only the contents of your own room**.

Example mini-game:

```tsx
import { RoomShell } from '../../components/RoomShell';
import { useGame } from '../../game/GameContext';

export default function MyRoom() {
  const { win } = useGame();
  return (
    <RoomShell member="alex">
      <button onClick={() => win('alex')}>Replace with your real game's victory condition</button>
    </RoomShell>
  );
}
```

Do not ship a win button as the final puzzle; it is just an illustration of the API.

## How to work with GitHub

```bash
git checkout -b feature/room-alex
# Make edits to your own room file.
git add src/pages/rooms/AlexRoom.tsx
git commit -m "Create Alex's room"
git push -u origin feature/room-alex
```

Then create a pull request against `main`. The integrator reviews and merges it. Other members should use their own distinct branch.

## Game rules

- The town contains four personal houses, the shared Trap House, locked Secret Room, and two decorative houses (one provides a real clue).
- One personal mini-game in each house. Winning marks progress once and awards one fragment.
- Collectible objects disappear from the room and appear in the shared, selectable inventory.
- The Trap House has five puzzles: four clues from other members' rooms and one team-wide agreed answer. Any puzzle order; all must be solved to leave. Three hints maximum.
- To prevent a soft lock, all personal games must be completed **before entering** the Trap House. This preparation requirement is an implementation choice and can be relaxed after adding an alternative recovery mechanism.
- The Secret Room unlocks only after all games and successful trap escape. Eight questions ask which member owns each quote/object; final explanations and a group profile are shown.
- Progress can be saved to `localStorage`, and a day/night toggle is included.

**Important limitations:** Browser storage is local to each user, not collaborative or secure. A password embedded in frontend code is inspectable. There is currently no authentication, multi-user live game, or backend.

## Build and test

```bash
npm test
npm run build
npm run preview
```

For production with clean URL paths (e.g. `/rooms/alex`) the host must rewrite unknown paths to `index.html`. Vercel and Netlify rewrites are configured in this project. A static Vite dev server already supports them.

## Team integration decisions

At the kickoff, replace the demo member names and slugs, decide whether there are four or five participants, and define the approved shared team motto and cross-room hints. Then confirm the project theme, game types, and ownership of shared files.
