import { useState } from 'react';
import { ResizableBox } from 'react-resizable';
import randomColor from 'randomcolor';
import 'react-resizable/css/styles.css';

const Partition = ({ id, color, onSplit, onRemove }) => {
  const [isSplit, setIsSplit] = useState(false);
  const [direction, setDirection] = useState(null);
  const [size, setSize] = useState({ width: 200, height: 200 });

  const handleSplit = (dir) => {
    setIsSplit(true);
    setDirection(dir);
    onSplit(id, dir);
  };

  const handleResizeStop = (event, data) => {
    setSize({ width: data.size.width, height: data.size.height });
  };

  if (!isSplit) {
    return (
      <ResizableBox width={size.width} height={size.height} minConstraints={[100, 100]} onResizeStop={handleResizeStop}>
        <div style={{ backgroundColor: color, width: '100%', height: '100%', position: 'relative' }}>
          <button style={{ position: 'absolute', top: '10px', left: '10px' }} onClick={() => handleSplit('V')}>V</button>
          <button style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={() => handleSplit('H')}>H</button>
          <button style={{ position: 'absolute', bottom: '10px', right: '10px' }} onClick={() => onRemove(id)}>X</button>
        </div>
      </ResizableBox>
    );
  } else {
    const style = direction === 'V' ? { flexDirection: 'row' } : { flexDirection: 'column' };
    return (
      <div style={{ ...style, width: '100%', height: '100%' }}>
        <Partition id={id} color={color} onSplit={onSplit} onRemove={onRemove} />
        <Partition id={`${id}-split`} color={randomColor()} onSplit={onSplit} onRemove={onRemove} />
      </div>
    );
  }
};

export default Partition;