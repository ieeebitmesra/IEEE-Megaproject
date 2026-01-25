import { z } from "zod";

export const HighlightSchema = z.object({
  courseId: z.string(),
  containerSelector: z.string(),
  startOffset: z.number(),
  endOffset: z.number(),
  text: z.string(),
  color: z.string(),
});

export const SavedHighlightSchema = HighlightSchema.extend({
  id: z.string(),
});

export type Highlight = z.infer<typeof HighlightSchema>;
export type SavedHighlight = z.infer<typeof SavedHighlightSchema>;
