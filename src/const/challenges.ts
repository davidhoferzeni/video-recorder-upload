import ChallengeLabels from "@/configuration/challenges.json";
import ffs from "@/configuration/fileserver.json";

interface ChallengeLabel {
  id: number;
  challenge: string;
}

const challengeList = ChallengeLabels as unknown as ChallengeLabel[];

export interface ChallengePrompt {
  id: number;
  challenge: string;
}

export interface ChallengeData {
  id: number;
  label: string;
  dateRecorded: Date;
  title: string;
  url: string;
}

export const ChallengeQuery = "cid";
const ChallengeRegex =
  /(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})(?<hour>\d{2})(?<minute>\d{2})(?<second>\d{2})_(?<id>\d+)_/u;

export function GetChallengeByTitle(challengeTitle: string): ChallengeData {
  const d = ChallengeRegex.exec(challengeTitle)?.groups;
  const challengeId = parseInt(d?.id ?? "");
  const challenge = challengeList.find((c) => c.id === challengeId);
  const challengeDate = new Date(
    `${d?.year}-${d?.month}-${d?.day}T${d?.hour}:${d?.minute}:${d?.second}Z`
  );
  return {
    id: challengeId,
    label: challenge?.challenge ?? "",
    dateRecorded: challengeDate,
    title: challengeTitle,
    url: `${ffs.url}/${ffs.uploadDirectory}/${challengeTitle}`,
  };
}

export function CreateChallenge(challengeId: number): ChallengeData {
  const dateRecorded = new Date();
  const timeStamp = new Date()
    .toISOString()
    .replace(/[-:T]/g, "")
    .replace(/\.\d\d\dZ/, "");
  return {
    id: challengeId,
    label: "lol",
    dateRecorded: dateRecorded,
    title: `${timeStamp}_${challengeId}_Video`,
    url: `${ffs.url}/${ffs.uploadDirectory}/${timeStamp}_${challengeId}_Video`,
  };
}

export default challengeList;
