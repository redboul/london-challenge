export const challengeType = {
  text: 1,
  media: 2
};

export interface Challenge {
  id: string;
  day?: string;
  description: string;
  multiple: boolean;
  label: string;
  type: number;
}
