export interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  created_at: string;
}

export interface Pattern {
  id: number;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  yarn_weight?: string;
  needle_size?: string;
  estimated_time?: string;
  image_url?: string;
  pattern_file_url?: string;
  author_id: number;
  created_at: string;
  is_public: boolean;
  author: User;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author_id: number;
  created_at: string;
  category: string;
  author: User;
}

export interface PatternCreate {
  title: string;
  description: string;
  difficulty: string;
  category: string;
  yarn_weight?: string;
  needle_size?: string;
  estimated_time?: string;
  author_id: number;
}

export interface PostCreate {
  title: string;
  content: string;
  category: string;
}

export interface YarnCalculation {
  estimated_grams: number;
  estimated_meters: number;
  recommended_skeins: number;
  pattern_type: string;
  size: string;
  yarn_weight: string;
}

export interface YarnCalculationRequest {
  pattern_type: string;
  size: string;
  yarn_weight: string;
  gauge?: number;
}
