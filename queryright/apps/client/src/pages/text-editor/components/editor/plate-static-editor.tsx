import { useMemo } from 'react'
import { createSlateEditor } from 'platejs'
import { EditorStatic } from '../ui/editor-static'

function DisplayEditor() {
  // 1. Use useMemo so the editor isn't re-created on every render
  const editor = useMemo(() => {
    return createSlateEditor({
      value: [
        {
          id: '1',
          type: 'h1',
          children: [{ text: 'Server-Rendered Title' }],
        },
        {
          id: '2',
          type: 'p',
          children: [{ text: 'This content is rendered statically.' }],
        },
      ],
    })
  }, [])

  return <EditorStatic editor={editor} />
}

export default DisplayEditor
