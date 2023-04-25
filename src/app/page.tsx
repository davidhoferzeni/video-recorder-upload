import { Inter } from 'next/font/google'
import VideoRecorderClient from './videoRecorder'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <VideoRecorderClient/>
  )
}
