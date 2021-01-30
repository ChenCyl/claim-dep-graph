import { Tree } from 'antd';
import React from 'react'
import { INode } from '../App';
interface ITreeContainerProps {
  nodes: INode[],
  selectedKey: string,
  onSelect: (key: string) => void
}

const TreeContainer: React.FC<ITreeContainerProps> = ({ nodes, selectedKey, onSelect }) => {

  const handleSelect = (selectedKeys: React.Key[], info: any) => {
    onSelect(selectedKeys[0] as string)
  };
  
  return (
    <Tree
      defaultExpandAll
      selectedKeys={[selectedKey]}
      onSelect={handleSelect}
      treeData={nodes}
    />
  );
}
export default TreeContainer