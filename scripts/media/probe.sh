#!/usr/bin/env bash
# Print a concise technical summary of a video or audio file.
# Usage: scripts/media/probe.sh <file>
set -euo pipefail
[[ $# -eq 1 ]] || { echo "Usage: $0 <file>" >&2; exit 1; }
ffprobe -v error \
  -show_entries format=duration,size,bit_rate \
  -show_entries stream=index,codec_type,codec_name,width,height,r_frame_rate,pix_fmt,sample_rate,channels \
  -of default=noprint_wrappers=1 "$1"
