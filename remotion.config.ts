// Remotion CLI configuration. Applies to `remotion studio` and `remotion render`.
// It does NOT apply to programmatic rendering via @remotion/renderer.
// See https://www.remotion.dev/docs/config
import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(95);
Config.setOverwriteOutput(true);
Config.setCodec("h264");
// Constant Rate Factor: lower is higher quality. 18 is visually near-lossless for flat 2D art.
Config.setCrf(18);
Config.setPixelFormat("yuv420p");
// Tag output as BT.709 limited range (HD standard; avoids full-range "yuvj420p" output).
Config.setColorSpace("bt709");
Config.setEntryPoint("src/index.ts");
