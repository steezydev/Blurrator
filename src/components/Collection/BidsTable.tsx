import { TBidsData } from '@/types/collection.types';
import React from 'react';

export default function BidsTable({ bidsData }: { bidsData: TBidsData }) {
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
            <tr className='bg-[#FFF0A110] text-center font-semibold'>
              <td>0.18</td>
              <td>1</td>
              <td>0.18</td>
              <td>1</td>
            </tr>
            <tr className='bg-[#51E31D10] text-center'>
              <td>0.17</td>
              <td>7</td>
              <td>1.19</td>
              <td>6</td>
            </tr>
            <tr className='text-center text-white/80'>
              <td>0.16</td>
              <td>773</td>
              <td>115.95</td>
              <td>14</td>
            </tr>
            <tr className='text-center text-white/80'>
              <td>0.15</td>
              <td>322283</td>
              <td>4519.62</td>
              <td>27</td>
            </tr>
            <tr className='text-center text-white/80'>
              <td>0.14</td>
              <td>575</td>
              <td>74.84</td>
              <td>9</td>
            </tr>
            <tr className='text-center text-white/80'>
              <td>0.13</td>
              <td>312</td>
              <td>37.44</td>
              <td>7</td>
            </tr>
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
