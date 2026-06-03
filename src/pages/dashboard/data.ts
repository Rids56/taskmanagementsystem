// - Test Name (required)
// - Subject (dropdown - fetched from API)
// - Test Type (dropdown/select)
// - Topics (multi-select based on selected subject)
// - Sub-topics (multi-select based on selected topics)
// - Difficulty level
// - Marking scheme: correct_marks, wrong_marks, unattempt_marks
// - Total time, Total marks

export interface Test {
  id: number;
  test_name: string;
  subject: string;
  test_type: string;
  topics: string[];
  sub_topics: string[];
  difficulty_level: 'Easy' | 'Medium' | 'Difficult';
  correct_marks: unknown | number;
  wrong_marks: undefined | number;
  unattempt_marks: unknown | number;
  total_time: unknown | number;
  total_questions: unknown | number;
  total_marks: unknown | number;
  status: 'Draft' | 'Published';
  created_date: string;
}

export const mockTests: Test[] = [
  {
    id: 1,
    test_name: 'Physics Chapter 1',
    subject: 'Physics',
    test_type: 'Chapter Wise',
    topics: ['Motion'],
    sub_topics: ['Velocity'],
    difficulty_level: 'Easy',
    correct_marks: 5,
    wrong_marks: -1,
    unattempt_marks: 0,
    total_time: 60,
    total_questions: 50,
    total_marks: 100,
    status: 'Published',
    created_date: '2026-06-03',
  },
  {
    id: 2,
    test_name: 'Chemistry PYQ',
    subject: 'Chemistry',
    test_type: 'PYQ',
    topics: ['Organic'],
    sub_topics: ['Hydrocarbon'],
    difficulty_level: 'Medium',
    correct_marks: 4,
    wrong_marks: -1,
    unattempt_marks: 0,
    total_time: 90,
    total_questions: 20,
    total_marks: 120,
    status: 'Draft',
    created_date: '2026-06-01',
  },
];
