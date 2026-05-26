export interface Example {
  title: string;
  description: string;
  metrics?: string;
}

export interface SlideContent {
  headings?: string[];
  points?: string[];
  examples?: Example[];
  subtitle?: string;
}

export interface Slide {
  id: number;
  title: string;
  type: 'intro' | 'chapter' | 'conclusion';
  content: SlideContent;
}
