#!/usr/bin/env bash
# Loudness-normalise an audio file for YouTube delivery (two-pass EBU R128).
# Target: -14 LUFS integrated, -1 dBTP true peak, 48 kHz, 24-bit WAV.
# Usage: scripts/media/normalize-audio.sh <input> <output.wav> [target_lufs]
set -euo pipefail
[[ $# -ge 2 ]] || { echo "Usage: $0 <input> <output.wav> [target_lufs]" >&2; exit 1; }
IN="$1"; OUT="$2"; I="${3:--14}"; TP="-1"; LRA="11"

# Pass 1: measure.
STATS=$(ffmpeg -hide_banner -nostats -i "$IN" \
  -af "loudnorm=I=${I}:TP=${TP}:LRA=${LRA}:print_format=json" -f null - 2>&1 \
  | sed -n '/^{/,/^}/p')
get() { echo "$STATS" | grep "\"$1\"" | sed -E 's/.*: "([^"]+)".*/\1/'; }

# Pass 2: apply with measured values (linear mode where possible).
ffmpeg -hide_banner -y -i "$IN" -af "loudnorm=I=${I}:TP=${TP}:LRA=${LRA}:\
measured_I=$(get input_i):measured_TP=$(get input_tp):measured_LRA=$(get input_lra):\
measured_thresh=$(get input_thresh):offset=$(get target_offset):linear=true" \
  -ar 48000 -c:a pcm_s24le "$OUT"
echo "Normalised -> $OUT"
