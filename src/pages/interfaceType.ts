export interface SubjectOption {
  id: string;
  name: string;
}

export interface TopicOption {
  id: string;
  name: string;
  topic_id?: string | null;
}

export interface TestList {
  id: number;
  name: string;
  type: string;
  subject: string;
  topics: string[];
  sub_topics: string[];
  questions: string[];
  correct_marks: number;
  wrong_marks: number;
  difficulty: 'easy' | 'medium' | 'hard';
  total_marks: number;
  total_time: number;
  total_questions: number;
  status: 'draft' | 'live';

  unattempt_marks: number;
  created_date: string;
}
