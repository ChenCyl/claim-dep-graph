import React from 'react'
import Tree from 'react-d3-tree';
import { INode } from '../App';

interface IGraphContainerProps {
  nodes: INode[],
  selectedKey: string,
  onSelect: (key: string) => void
}

const GraphContainer: React.FC<IGraphContainerProps> = ({ nodes, selectedKey, onSelect }) => {

  const handleNodeClick = (node: any) => {
    const key = node.key
    onSelect(key)
  }
  return (
    <div id="treeWrapper" style={{ width: '100%', height: '100%' }}>
      <Tree
        data={{
          name: '起点',
          children: nodes
        }}
        onNodeClick={handleNodeClick}
        collapsible={false}
        translate={{
          x: 100,
          y: 400
        }}
        zoom={0.8}
        separation={{
          siblings: 1,
          nonSiblings: 1
        }}
      />
    </div>
  )
}
export default GraphContainer