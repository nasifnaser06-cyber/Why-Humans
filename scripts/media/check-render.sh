#!/usr/bin/env bash
# QA check for a final render: format, frame rate, duration and loudness.
# Usage: scripts/media/check-render.sh <render.mp4>
set -euo pipefail
[[ $# -eq 1 ]] || { echo "Usage: $0 <render.mp4>" >&2; exit 1; }
F="$1"
echo "== Video stream =="
ffprobe -v error -select_streams v:0 \
  -show_entries stream=codec_name,width,height,r_frame_rate,pix_fmt,nb_frames \
  -of default=noprint_wrappers=1 "$F"
echo "== Duration =="
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$F"
if ffprobe -v error -select_streams a:0 -show_entries stream=codec_name -of csv=p=0 "$F" | grep -q .; then
  echo "== Loudness (EBU R128; YouTube target ≈ -14 LUFS, peak ≤ -1 dBTP) =="
  ffmpeg -hide_banner -nostats -i "$F" -af ebur128=peak=true -f null - 2>&1 \
    | sed -n '/Summary:/,$p'
else
  echo "== No audio stream =="
fi
