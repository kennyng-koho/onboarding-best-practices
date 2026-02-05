# Onboarding Best Practices - Project Notes

## Project Overview

Interactive demo website showcasing the 6-step user onboarding journey from discovery to habit formation. Includes AI-powered strategy generation using OpenAI GPT-4o-mini.

**Live Site:** https://onboarding-best-practices.netlify.app
**GitHub Repo:** https://github.com/kennyng-koho/onboarding-best-practices

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Icons | lucide-react |
| Backend | Netlify Functions (serverless) |
| AI | OpenAI GPT-4o-mini |
| Hosting | Netlify (auto-deploys from GitHub) |

---

## Project Structure

```
/Users/kenny.ng/Projects/Onboarding/
├── src/
│   ├── App.jsx          # Main React component
│   ├── main.jsx         # Entry point
│   └── index.css        # Tailwind imports
├── netlify/
│   └── functions/
│       └── generate-strategy.js  # OpenAI API serverless function
├── netlify.toml         # Netlify config
├── vite.config.js       # Vite + Tailwind config
└── package.json
```

---

## Environment Variables (Netlify)

| Key | Description |
|-----|-------------|
| `OPENAI_API_KEY` | Your OpenAI API key from platform.openai.com |

Set in: Netlify Dashboard → Site settings → Environment variables

---

## Common Tasks

### Run locally
```bash
cd ~/Projects/Onboarding
npm run dev
# Opens at http://localhost:5173
```

### Make changes and deploy
```bash
# Edit files, then:
git add -A && git commit -m "Your message" && git push
# Netlify auto-deploys
```

### Manual redeploy (if needed)
```bash
netlify deploy --prod
```

### Check deploy status
```bash
netlify status
```

---

## The 6 Onboarding Steps

1. **Google Search / Ads** - Discovery phase, capturing high-intent users
2. **Website** - First impressions, communicating value in <5 seconds
3. **Sign Up Flow** - Converting intent with minimal friction
4. **First Session** - The introduction, avoiding empty state anxiety
5. **Path to Aha Moment** - Value realization, the "wow" moment
6. **Habit Forming** - Retention & loyalty through triggers and rewards

---

## AI Feature

The "Apply AI" button generates tailored growth tactics for any product at each onboarding stage.

- **How it works:** Frontend calls `/api/generate-strategy` → Netlify Function → OpenAI API
- **Model:** gpt-4o-mini (fast, cheap)
- **Output:** 3 tactics + 1 copy suggestion

---

## Next Steps / Ideas

- [ ] Add more case studies per step
- [ ] Allow users to save/export their generated strategies
- [ ] Add authentication to track user sessions
- [ ] Create PDF export of full journey with AI suggestions
- [ ] Add analytics to track which steps get most engagement

---

## Session History

**Feb 5, 2026:**
- Created React + Vite project with Tailwind
- Built interactive 6-step onboarding flow UI
- Set up GitHub repo with auto-deploy to Netlify
- Added serverless function for AI (switched from Gemini → Claude → OpenAI)
- Configured environment variables for API key

---

*To continue: Open Claude Code in this folder and reference this file.*
