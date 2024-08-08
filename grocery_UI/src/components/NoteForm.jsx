import { useState } from "react"
import InputField from "./InputField"
import StdButton from "./StdButton"

const NoteForm = ({ content, important, handleContentChange, handleImportantChange, addNote }) => {
  const [visible, setVisible] = useState(false)

  const formView = { 'display': visible ? '' : 'none'}
  const addView = { 'display': visible ? 'none' : ''}

  const toggleVis = () => {
    setVisible(!visible)
  }

  return (
    <>
      <form 
      style={formView}
      onSubmit={addNote}
      className="px-8 py-4 bg-emerald-600 w-fit flex flex-col gap-2 shadow-lg">

        <InputField type="text" text="note:" placeholder="note here" onChange={handleContentChange} value={content} id="note-input"/>

        <div className="flex flex-col items-center">
          <p className="inline">important? </p>
          <input type="checkbox" checked={important} onChange={handleImportantChange}/>
        </div>

        <div className="mt-4 flex flex-col items-center">
          <StdButton type="submit" text="Add" className="p-2 w-32"/>
        </div>
        <div className="flex flex-col items-center">
          <StdButton type="button" text="Cancel" className="p-2 w-32" onClick={toggleVis}/>
        </div>
      </form>

      <StdButton style={addView} text="Add" onClick={toggleVis}/>
    </>
  )
}

export default NoteForm