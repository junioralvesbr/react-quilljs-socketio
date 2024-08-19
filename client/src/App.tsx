import { useCallback } from "react"
import Quill from "quill"

import "quill/dist/quill.snow.css";
import './App.css'

function App() {
  const wrapperRef = useCallback((wrapper: HTMLDivElement) => {
    if (wrapper == null) return

    wrapper.innerHTML = ""
    const editor = document.createElement("div")
    wrapper.append(editor)

    new Quill(editor, { theme: 'snow' })

  }, [])


  return (
    <div className="container" ref={wrapperRef}></div>
  )
}

export default App
