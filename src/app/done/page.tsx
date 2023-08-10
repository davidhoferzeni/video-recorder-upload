'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import Challenges, { ChallengeQuery } from '@/const/challenges';

export default function Done() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const challengeId = parseInt(searchParams.get(ChallengeQuery) || '0');
  const currentChallenge = Challenges.find(c => c.id === challengeId);
  function returnHome() {
    router.push('/');
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-4 gap-64'>
      <h1 className='text-3xl'>Danke für dein Video!</h1>
      {/* <button className='btn btn-blue' onClick={returnHome}>Noch eines aufnehmen?</button> */}
      {/* {currentChallenge &&
        <p className='text-6xl'>
          {currentChallenge.label}
        </p>
      } */}
    </div>
  );
}
