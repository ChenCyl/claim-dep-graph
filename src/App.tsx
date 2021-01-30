import React, { useCallback, useState } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import TextContainer from './TextContainer';
import GraphContainer from './GraphContainer';
import { Tabs } from 'antd';
import TreeContainer from './TreeContainer';
const { TabPane } = Tabs;

export interface INode {
  key: string
  name: string
  title: string
  children: INode[]
}

function App() {

  const [treeNodes, setTreeNodes] = useState<INode[]>([])
  const [selectedKey, setSelectedKey] = useState('')
  const [activeTabKey, setActiveTabKey] = useState('textInput')

  function handleChangeTab(key: string) {
    setActiveTabKey(key)
  }

  const handleClickGenTree = useCallback(
    (nodes: INode[]) => {
      setTreeNodes(nodes)
      setActiveTabKey('tree')
    },
    [],
  )

  const handleSelect = useCallback(
    (key: string) => {
      console.log('selectKey', key);
      setSelectedKey(key)
    },
    [],
  )
  
  return (
    <div className="App" style={{display: 'flex', padding: '20px 40px'}}>

      <div className='leftPart' style={{flex: 1}}>
      <Tabs defaultActiveKey="1" onChange={handleChangeTab} activeKey={activeTabKey}>
        <TabPane tab="文本输入" key="textInput">
          <TextContainer onClickGenTree={handleClickGenTree}/>
        </TabPane>
        <TabPane tab="文本树" key="tree">
          <TreeContainer nodes={treeNodes} selectedKey={selectedKey} onSelect={handleSelect}/>
        </TabPane>
      </Tabs>
        

      </div>

      <div className='rightPart' style={{flex: 2}}>
        <GraphContainer nodes={treeNodes} selectedKey={selectedKey} onSelect={handleSelect}/>
      </div>
    </div>
  );
}

export default App;
