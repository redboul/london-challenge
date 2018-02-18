export const challengeType = {
  text: 1,
  image: 2,
  media: 3
};

export interface Challenge {
  id: string;
  day?: string;
  dayLabel?: string;
  description: string;
  multiple: boolean;
  label: string;
  type: number;
  maxAnswers: number;
}
