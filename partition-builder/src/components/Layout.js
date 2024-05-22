// src/components/Layout.js
import React, { useState } from 'react';
import Partition from './Partition';
import randomColor from 'randomcolor';

const Layout = () => {
  const [partitions, setPartitions] = useState([{ id: '1', color: randomColor() }]);

  const handleSplit = (id, direction) => {
    setPartitions((prevPartitions) => {
      const newPartitions = prevPartitions.flatMap((partition) => {
        if (partition.id === id) {
          return [
            { id: `${id}-1`, color: partition.color },
            { id: `${id}-2`, color: randomColor() },
          ];
        }
        return partition;
      });
      return newPartitions;
    });
  };

  const handleRemove = (id) => {
    setPartitions((prevPartitions) => prevPartitions.filter((partition) => !partition.id.startsWith(id)));
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', height: '100vh' }}>
      {partitions.map((partition) => (
        <Partition
          key={partition.id}
          id={partition.id}
          color={partition.color}
          onSplit={handleSplit}
          onRemove={handleRemove}
        />
      ))}
    </div>
  );
};

export default Layout;
