import { Button, Input } from 'antd'
import React, { useCallback, useState } from 'react'

import { INode } from '../App'

interface ITextContainerProps {
  onClickGenTree: (nodes: INode[]) => void
}

const globalDivideReg = /(\d+)[\s\S]*?。/g
const findIndexReg = /(\d+)[\s\S]*?。/
const rootReg = /(\d+)\.一种[\s\S]*?。/
const childrenReg1 = /(\d+)\.(根据|如)权利要求(\d+)所述[\s\S]*?。/
const childrenReg2 = /(\d+)\.(根据|如)权利要求(\d+)或(\d+)[\s\S]*?。/
const childrenReg3 = /(\d+)\.(根据|如)权利要求(\d+)(-|至)(\d+)[\s\S]*?。/

const transInputToTrees = (input: string): INode[] => {
  // divide to paragraphs
  const paragraphs = input.match(globalDivideReg)
  
  // construct node
  const treeObj = {}
  paragraphs && paragraphs.forEach(p => {
    let matchRes = p.match(findIndexReg)
    const key = matchRes[1]
    treeObj[key] = {
      title: p,
      name: key,
      children: []
    }
  })

  // construct dependencies
  const rootNodes = []
  paragraphs && paragraphs.forEach(p => {
    let matchRes = []
    if (matchRes = p.match(rootReg)) {
      const key = matchRes[1]
      rootNodes.push(key)
    } else if (matchRes = p.match(childrenReg1)) {
      const key = matchRes[1]
      const fatherNode = matchRes[3]
      treeObj[fatherNode].children.push(key)
    } else if (matchRes = p.match(childrenReg2)) { // (\d+)或(\d+)
      const key = matchRes[1]
      const fatherNodeList = matchRes.slice(3)
      fatherNodeList.forEach((father => {
        treeObj[father].children.push(key)
      }))
    } else if (matchRes = p.match(childrenReg3)) { // (\d+)(-|到)(\d+)
      const key = matchRes[1]
      const fatherStart = Number(matchRes[3])
      const fatherEnd = Number(matchRes[5])
      for (let i = fatherStart; i <= fatherEnd; i++) {
        treeObj[String(i)].children.push(key)
      }
    } 
  })

  // connect node and dependency
  const findChildren = (nodes: string[], key: string): INode[] => {
    return nodes.map(node => {
      const newKey = key + '-' + node
      return {
        key: newKey,
        name: node,
        title: treeObj[node]?.title,
        children: findChildren(treeObj[node]?.children || [], newKey)
      }
    })
  }

  return findChildren(rootNodes, '0')
}


const TextContainer: React.FC<ITextContainerProps> = ({onClickGenTree}) => {

  
  const [inputText, setInputText] = useState('')

  const handleClickGenTree = useCallback(
    () => {
      const trees = transInputToTrees(inputText)
      console.log(trees);
      
      onClickGenTree(trees)
    },
    [inputText, onClickGenTree],
  )

  const handleClearUp = useCallback(
    () => {
      setInputText('');
    },
    [],
  )
  
  return (
    <div>
      <Input.TextArea
        value={inputText}
        onChange={e => {
          setInputText(e.target.value)
        }}
        rows={30} 
        style={{width: '100%'}}
        placeholder='请输入文本...'
      />

      <div style={{textAlign: 'right', marginTop: 20}}>
        <Button onClick={handleClearUp} style={{marginRight: 20}}>清空</Button>
        <Button type='primary' onClick={handleClickGenTree}>生成树</Button>
      </div>
    </div>
  )
}
export default TextContainer