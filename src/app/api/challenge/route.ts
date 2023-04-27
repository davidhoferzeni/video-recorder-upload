import { NextResponse } from 'next/server';
import Challenges from '@/const/challenges';

export async function GET() {
    return NextResponse.json(Challenges);
}
