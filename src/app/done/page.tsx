import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function Done() {
    return (
    <div className='flex min-h-screen flex-col items-center justify-center p-4 gap-64'>
    <div>Danke für dein Video</div>
    <button className='btn btn-blue'>Noch eines aufnehmen?</button>
    </div>
    );
}
