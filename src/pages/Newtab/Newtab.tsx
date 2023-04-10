import React from 'react';
import { Button, SimpleGrid } from '@mantine/core';
import Layout from '@/components/Layout';
import Collection from '@/components/Collection/Collection';
import { useAppSelector } from '@/hooks';

const Newtab = () => {
  const collections = useAppSelector((state) => state.collections);

  console.log(collections);

  return (
    <Layout>
      <section className='layout mt-10 min-h-[80vh]'>
        <div></div>
        <SimpleGrid
          verticalSpacing='xl'
          cols={2}
          breakpoints={[{ maxWidth: '85rem', cols: 1 }]}
        >
          {Object.keys(collections).map((key) => {
            const collection = collections[key];
            return (
              <Collection
                key={'collection' + key}
                collectionData={collection}
              />
            );
          })}
        </SimpleGrid>
      </section>
    </Layout>
  );
};

export default Newtab;
