# Activity Classification Exercise App

Interactive web app for MLE team training on Theory of Change framework.
Teams classify activities as Program Implementation, Grey Zone, or MLE.

## Features

**For Participants:**
- Mobile-friendly registration (name, state, team)
- 7-minute countdown timer per vignette
- One-tap classification buttons (Program/Grey Zone/MLE)
- Visual progress bar
- Thank you screen on completion

**For Admin/Facilitator:**
- Password-protected dashboard (/admin)
- Real-time team progress monitoring
- Category totals by team (Program/Grey/MLE counts)
- Visual distribution bars
- Activity-level breakdown for discussion
- Filter by vignette or team
- Clear data option for new sessions

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure Firebase:
   - Create project at console.firebase.google.com
   - Enable Realtime Database (test mode)
   - Copy config to src/firebase.js

3. Run development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:5173

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repo at vercel.com
3. Deploy automatically

### Netlify
1. Build: `npm run build`
2. Publish directory: `dist`

## URLs
- Participant Entry: /
- Exercise: /exercise
- Admin Dashboard: /admin (password: eaii2024)

## Admin Password
Default password is `eaii2024`. To change it, edit the `ADMIN_PASSWORD` constant in `src/pages/Admin.jsx`.

## Notes
- No right/wrong answers - this is a discussion exercise
- Admin sees category totals, not scores
- Data persists in Firebase until manually cleared
