#!/usr/bin/env python3
"""
Generate narration audio with Kokoro TTS from an APPROVED script.

The text is read verbatim. This tool never edits, paraphrases or "improves"
narration — wording changes go back through Stage 1 review.

Input format: a UTF-8 text file where narration blocks are separated by a blank
line. Each block becomes one numbered WAV file (24 kHz mono), e.g. block_001.wav.
Lines starting with '#' are ignored (use them for block labels / scene IDs).

Usage:
  .venv/bin/python scripts/tts/kokoro_narrate.py \
      episodes/<id>/script/narration.txt public/narration/<id> \
      --voice af_heart --lang a --speed 1.0

Afterwards, loudness-normalise with scripts/media/normalize-audio.sh.
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

SAMPLE_RATE = 24_000


def read_blocks(path: Path) -> list[str]:
    raw = path.read_text(encoding="utf-8")
    blocks: list[str] = []
    for chunk in raw.split("\n\n"):
        lines = [ln for ln in chunk.splitlines() if not ln.lstrip().startswith("#")]
        text = " ".join(ln.strip() for ln in lines).strip()
        if text:
            blocks.append(text)
    return blocks


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("script", type=Path, help="Approved narration text file")
    ap.add_argument("out_dir", type=Path, help="Output directory for WAV files")
    ap.add_argument("--voice", default="af_heart", help="Kokoro voice id")
    ap.add_argument("--lang", default="a", help="Kokoro lang code: a=American English, b=British English")
    ap.add_argument("--speed", type=float, default=1.0)
    args = ap.parse_args()

    try:
        import numpy as np
        import soundfile as sf
        from kokoro import KPipeline
    except ImportError as exc:  # pragma: no cover
        print(f"Kokoro is not installed ({exc}). See scripts/tts/requirements.txt.", file=sys.stderr)
        return 2

    blocks = read_blocks(args.script)
    if not blocks:
        print("No narration blocks found.", file=sys.stderr)
        return 1

    args.out_dir.mkdir(parents=True, exist_ok=True)
    pipeline = KPipeline(lang_code=args.lang)
    manifest = []
    for i, text in enumerate(blocks, start=1):
        chunks = [audio for _, _, audio in pipeline(text, voice=args.voice, speed=args.speed)]
        audio = np.concatenate(chunks) if chunks else np.zeros(0, dtype="float32")
        name = f"block_{i:03d}.wav"
        sf.write(args.out_dir / name, audio, SAMPLE_RATE)
        duration = len(audio) / SAMPLE_RATE
        manifest.append({"file": name, "text": text, "seconds": round(duration, 3)})
        print(f"{name}  {duration:6.2f}s")

    (args.out_dir / "manifest.json").write_text(
        json.dumps({"voice": args.voice, "lang": args.lang, "speed": args.speed, "blocks": manifest}, indent=2),
        encoding="utf-8",
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
