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

// export const mockTests: Test[] = [
//   {
//     id: 1,
//     name: 'Physics Chapter 1',
//     subject: 'Physics',
//     type: 'Chapter Wise',
//     topics: ['Motion'],
//     sub_topics: ['Velocity'],
//     difficulty: 'Easy',
//     correct_marks: 5,
//     wrong_marks: -1,
//     unattempt_marks: 0,
//     total_time: 60,
//     total_questions: 50,
//     total_marks: 100,
//     status: 'live',
//     created_date: '2026-06-03',
//   },
//   {
//     id: 2,
//     name: 'Chemistry PYQ',
//     subject: 'Chemistry',
//     type: 'PYQ',
//     topics: ['Organic'],
//     sub_topics: ['Hydrocarbon'],
//     difficulty: 'Medium',
//     correct_marks: 4,
//     wrong_marks: -1,
//     unattempt_marks: 0,
//     total_time: 90,
//     total_questions: 20,
//     total_marks: 120,
//     status: 'draft',
//     created_date: '2026-06-01',
//   },
// ];
