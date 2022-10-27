export interface BookSection {
  title: string;
  content: string;
}

export interface BookCategory {
  id: number;
  name: string;
}

export interface Book {
  id: number;
  title: string;
  category_id: number;
  authors: string[];
  cover_url: string;
  description: string;
  sections: BookSection[];
  audio_length: number;
}
