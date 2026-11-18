# Episodes

One folder per episode, created by copying `_template/`:

```bash
cp -r episodes/_template episodes/<episode-id>
```

Episode ID format: `<series>-<NN>-<short-slug>`, e.g. `retested-01-<slug>` or
`unspoken-01-<slug>`. Use lowercase and hyphens only.

Production documents live here. Animation code for the episode lives in
`src/episodes/<episode-id>/`. Final renders go to `renders/<episode-id>/` (not tracked by git).

| Folder        | Contents                                                         | Stage |
| ------------- | ---------------------------------------------------------------- | ----- |
| `research/`   | Source list, claim ledger, evidence notes                        | 1     |
| `script/`     | The **approved** Stage 1 script (read-only after approval)      | 1     |
| `storyboard/` | Visual identity notes, shot-by-shot storyboard, prototype notes  | 2     |
| `assets/`     | Episode-specific original SVGs and images (+ licence entries)    | 2–3   |
| `audio/`      | Narration takes, music/SFX cue sheet                             | 2–3   |
| `episode.json`| Status and approval record                                        | all   |
