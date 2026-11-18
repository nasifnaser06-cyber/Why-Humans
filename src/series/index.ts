import { seriesAccent } from "../design/tokens";

export type SeriesId = "retested" | "unspoken-patterns";

export interface SeriesInfo {
  id: SeriesId;
  title: string;
  premise: string;
  accent: string;
}

export const SERIES: Record<SeriesId, SeriesInfo> = {
  retested: {
    id: "retested",
    title: "RETESTED",
    premise: "Examining famous psychological research against later evidence.",
    accent: seriesAccent.retested,
  },
  "unspoken-patterns": {
    id: "unspoken-patterns",
    title: "THE UNSPOKEN PATTERNS",
    premise: "Explaining the psychology behind everyday human behaviour.",
    accent: seriesAccent.unspokenPatterns,
  },
};
