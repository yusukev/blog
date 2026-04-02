---
title: 'Building a Minimal Web Highlighter with Claude Code'
description: 'Building a Minimal Web Highlighter with Claude Code'
# pubDate: 'Mar 01 2026'
---

I wanted a simple highlighter for the browser. Select text, click a button, text stays highlighted in blue. Come back later, highlights are still there. That's it.

I looked at existing extensions and they all do too much. Accounts, cloud sync, social features, PDF annotation. I just want to highlight stuff on web pages.

So I built one with Claude Code. Took about 20 minutes.

## What I asked for

I started with a pretty simple prompt:

```
Build a Chrome extension that lets me highlight text on any web page.
When I select text, a small floating toolbar should appear near the
selection with three color buttons: blue (default), red, and green.
Clicking a color highlights the selection in that color. Highlights
should persist across page reloads using localStorage. Use Manifest V3.
```

That's it. No spec doc, no wireframe. Just what I wanted in plain English.

## What Claude Code gave me

It generated five files:

- `manifest.json` — Manifest V3 config with the right permissions
- `content.js` — the highlighting logic and floating toolbar, injected into every page
- `content.css` — highlight colors and toolbar styling
- `icon128.png`, `icon48.png`

The whole thing was about 300 lines of code total. I didn't write any of it.

## Loading it locally

Before publishing anything, you want to test locally. Go to `chrome://extensions`, turn on Developer Mode, click "Load unpacked", and point it at your extension folder.

I selected some text on a random article, a little toolbar popped up with three colored dots, I clicked blue, and the text highlighted. Reloaded the page and the highlights were still there. Done.

## What I'd add next

Right now it's pretty barebones, which is the point. But if I keep using it, I'll probably add:

- Add right-click to remove a highlight
- Add a sidemenu that shows a list of all highlights on the current page with the option to click one and scroll to it
- Export highlights summary as Markdown with the power of LLM
- Add a portal that shows a list of all highlights sorted with website domains and urls (and search, probably)
- Keyboard shortcut as an alternative to the toolbar

For now though, it does exactly what I need.

## Publishing

I'll cover the full publishing process in my next post. Short version: zip it, upload to the Developer Dashboard, fill out a few forms, wait a day.

## Takeaway

I'm not sure I would have built this without Claude Code. But "a few hours" is exactly enough friction to make me not bother. 15 minutes is below the threshold where I just do it.

That's kind of the whole point of this blog. Lots of useful tools don't get built because the effort is just slightly above what feels worth it. Claude Code changes that math.
