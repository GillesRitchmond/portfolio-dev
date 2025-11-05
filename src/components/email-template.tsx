import { EmailData } from '@/lib/types';
import * as React from 'react';



export function EmailTemplate({ name }: EmailData) {
  return (
    <div>
      <h1>Welcome, {name}!</h1>
    </div>
  );
}