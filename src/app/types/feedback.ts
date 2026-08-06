export interface Feedback {
  id: string;
  category: string;
  user_id: string;
  name: string;
  email: string;
  created_at: Date;
  message: string;
}

export const FEEDBACK_CATEGORY_ENUM = [
  "bug",
  "improvement",
  "feature",
  "performance",
  "ui",
  "other",
] as const;

export type FeedbackCategoryType = (typeof FEEDBACK_CATEGORY_ENUM)[number];
