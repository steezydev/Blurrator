import { TActivity } from '@/types/collection.types';
import React from 'react';

export default function ActivityTable({
  activityData,
}: {
  activityData: TActivity[];
}) {
  return (
    <>
      <table className='w-full border-spacing-0 leading-none'>
        <thead>
          <tr className='text-sm font-semibold leading-8 text-secondary'>
            <th>T</th>
            <th>P</th>
            <th>S</th>
            <th>B</th>
          </tr>
        </thead>
        {activityData.length !== 0 && (
          <tbody className='text-white/80'>
            <tr className='text-center text-sm'>
              <td>3m</td>
              <td>0.174</td>
              <td>5e1b4d</td>
              <td>-</td>
            </tr>
            <tr className='text-center text-sm'>
              <td>35m</td>
              <td>1.80</td>
              <td>79e6c0</td>
              <td>-</td>
            </tr>
            <tr className='text-center text-sm'>
              <td>48m</td>
              <td>0.168</td>
              <td>16a1c7</td>
              <td>-</td>
            </tr>
            <tr className='text-center text-sm'>
              <td>1h</td>
              <td>0.16</td>
              <td>612a47</td>
              <td>c543B0</td>
            </tr>
            <tr className='text-center text-sm'>
              <td>1h</td>
              <td>0.174</td>
              <td>819a2c</td>
              <td>-</td>
            </tr>
            <tr className='text-center text-sm'>
              <td>1h</td>
              <td>0.168</td>
              <td>Bd497A</td>
              <td>-</td>
            </tr>
            <tr className='text-center text-sm'>
              <td>1h</td>
              <td>0.157</td>
              <td>Bd497A</td>
              <td>79e6c0</td>
            </tr>
          </tbody>
        )}
      </table>
      {activityData.length === 0 && (
        <div className='h-10 text-center text-lg font-semibold text-secondary'>
          No data
        </div>
      )}
    </>
  );
}
