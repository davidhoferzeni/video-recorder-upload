'use client';
import { useRouter } from 'next/navigation';

export default function Done() {

    const router = useRouter();

    function returnHome() {
        router.push('/');
      }

    return (
    <div className='flex min-h-screen flex-col items-center justify-center p-4 gap-64'>
    <h1 className='text-3xl'>Danke für dein Video!</h1>
    <button className='btn btn-blue' onClick={returnHome}>Noch eines aufnehmen?</button>
    </div>
    );
}
