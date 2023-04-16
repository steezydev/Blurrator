import clsxm from '@/lib/clsxm';
import { TBid, TBidsData, TUserBid } from '@/types/collection.types';
import React from 'react';

type CustomObject = {
  [key: string]: any;
};

export default function BidsTable({
  bidsData,
  currentBid,
  topBid,
}: {
  bidsData: TBidsData;
  currentBid: TUserBid | null;
  topBid: number | null;
}) {
  function sortObjectByKeys(obj: CustomObject): TBid[] {
    const sortedKeys = Object.keys(obj).sort(
      (a, b) => parseFloat(b) - parseFloat(a)
    );
    return sortedKeys.map((key) => obj[key]);
  }

  const sortedBidsData = sortObjectByKeys(bidsData);

  return (
    <>
      <table className='border-spacing-0 border-spacing-y-1 leading-none'>
        <thead>
          <tr className='text-sm font-semibold leading-8 text-secondary'>
            <th>P</th>
            <th>S</th>
            <th>T</th>
            <th>B</th>
          </tr>
        </thead>
        {Object.keys(bidsData).length !== 0 && (
          <tbody>
            {sortedBidsData.map((bid, index) => (
              <tr
                key={index + '-bid'}
                className={clsxm(
                  ' text-center',
                  index === 0 && 'bg-[#FFF0A110] font-semibold',
                  bid.value === currentBid?.value && 'bg-[#51E31D10]',
                  index === 2 && 'text-white/80'
                )}
              >
                <td>{bid.value}</td>
                <td>{bid.size}</td>
                <td>{(bid.value * bid.size).toFixed(2)}</td>
                <td>{bid.biddersCount}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {Object.keys(bidsData).length === 0 && (
        <div className=' h-10 text-center text-lg font-semibold text-secondary'>
          No data
        </div>
      )}
    </>
  );
}
