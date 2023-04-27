import ChallengeLabels from '@/configuration/challenges.json';

function createChallenges(challengeLabels: string[]) {
    let counter: number = 0;
    const challengeList: ChallengePrompt[] = challengeLabels.map(t => {
        return {
            id: ++counter,
            label: t
        };
    });
    return challengeList;
}

export interface ChallengePrompt {
    id: number;
    label: string;
}
export const ChallengeQuery = 'cid';
export const ChallengeRegex = /(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})(?<hour>\d{2})(?<minute>\d{2})(?<second>\d{2})_(?<lol>\d+)_/u;
export function ChallengeTitle(challengeId: number): string {
    const timeStamp = new Date().toISOString().replace(/[-:T]/g, '').replace(/\.\d\d\dZ/, '');
    return `${timeStamp}_${challengeId}_Video`;
};

const challengeList = createChallenges(ChallengeLabels);
export default challengeList;