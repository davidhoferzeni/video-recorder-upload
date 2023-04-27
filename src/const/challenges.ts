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
const challengeList = createChallenges(ChallengeLabels);
export default challengeList;