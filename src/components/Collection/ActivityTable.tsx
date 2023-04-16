import { TActivity } from '@/types/collection.types';
import React from 'react';

export default function ActivityTable({
  activityData,
}: {
  activityData: TActivity[];
}) {
  return (
    <div className='h-48 overflow-hidden overflow-y-auto'>
      <table className='w-full border-spacing-0  leading-none'>
        <thead>
          <tr className='text-center text-sm font-semibold leading-8 text-secondary'>
            <th>P</th>
            <th>S</th>
            <th>B</th>
          </tr>
        </thead>
        {activityData.length !== 0 && (
          <tbody className='text-white/80'>
            {activityData.map((activity, index) => (
              <tr key={index + '-activity'} className='text-center text-sm'>
                <td>{activity.price.toFixed(3)}</td>
                <td>{activity.fromAddress.substring(2, 7)}</td>
                <td>
                  {activity.toAddress
                    ? activity.toAddress.substring(2, 7)
                    : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {activityData.length === 0 && (
        <div className='h-10 text-center text-lg font-semibold text-secondary'>
          No data
        </div>
      )}
    </div>
  );
}
