import clsxm from '@/lib/clsxm';
import React from 'react';

export default function Barrel({
  children,
  title,
  change,
  positive = true,
}: {
  children: React.ReactNode;
  title: string;
  change?: string;
  positive?: boolean;
}) {
  return (
    <div className='flex flex-col items-center'>
      <span className='text-xs uppercase text-secondary'>{title}</span>
      <span className='text-lg font-bold'>{children ?? '-'}</span>
      {change && (
        <span
          className={clsxm(
            'text-xs',
            positive ? 'text-[#6FFF6360]' : 'text-[#FF545480]'
          )}
        >
          {change}
        </span>
      )}
    </div>
  );
}
