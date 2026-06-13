import type { AddQuestionFormValues } from './model/addQuestion.schema';

type TopicOption = { id: string; name: string; subject_id: string };
type SubTopicOption = { id: string; name: string; topic_id: string };

const findOptionByName = <T extends { name: string }>(
  value: string | null | undefined,
  options: T[] | null
): T | null => {
  if (!value) return null;
  const search = value.toString().trim().toLowerCase();
  return (
    options?.find(
      (option) => option?.name?.toString().trim().toLowerCase() === search
    ) ?? null
  );
};

const normalizeCorrectOption = (value?: string) => {
  if (!value) return '';
  const normalized = value.toString().trim().toLowerCase();
  if (
    ['option1', 'option 1', '1', 'a', 'option a', 'opt1'].includes(normalized)
  )
    return 'option1';
  if (
    ['option2', 'option 2', '2', 'b', 'option b', 'opt2'].includes(normalized)
  )
    return 'option2';
  if (
    ['option3', 'option 3', '3', 'c', 'option c', 'opt3'].includes(normalized)
  )
    return 'option3';
  if (
    ['option4', 'option 4', '4', 'd', 'option d', 'opt4'].includes(normalized)
  )
    return 'option4';
  return normalized.startsWith('option') ? normalized : '';
};

export const mapCsvRowToFormValues = (
  row: Record<string, any>,
  topicOptions: TopicOption[],
  subTopicOptions: SubTopicOption[],
  baseValues: AddQuestionFormValues
): AddQuestionFormValues => ({
  ...baseValues,
  question: row.question ?? row.Question ?? row.question_text ?? '',
  option1: row.option1 ?? row.Option1 ?? row['Option 1'] ?? '',
  option2: row.option2 ?? row.Option2 ?? row['Option 2'] ?? '',
  option3: row.option3 ?? row.Option3 ?? row['Option 3'] ?? '',
  option4: row.option4 ?? row.Option4 ?? row['Option 4'] ?? '',
  correct_option: normalizeCorrectOption(
    row.correct_option ??
      row.CorrectOption ??
      row['Correct Option'] ??
      row.answer ??
      ''
  ),
  explanation: row.explanation ?? row.Explanation ?? '',
  difficulty: row.difficulty ?? row.Difficulty ?? '',
  topic: findOptionByName(
    row.topic ?? row.Topic ?? row['Topic Name'] ?? row['topic name'],
    topicOptions
  ),
  sub_topic: findOptionByName(
    row.sub_topic ?? row.SubTopic ?? row['Sub Topic'] ?? row['sub_topic_name'],
    subTopicOptions
  ),
});
