import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(
      'http://api.weatherapi.com/v1/current.json?key=a5bec305169942fe99f142501242110&q=Dublin&aqi=no'
    );

    const data = await res.json();
    const currentTemp = data.current.temp_c;

    return NextResponse.json({ temp: currentTemp });
  } catch (error) {
    console.error('Error fetching weather:', error);
    return NextResponse.json({ temp: 'N/A' });
  }
}
