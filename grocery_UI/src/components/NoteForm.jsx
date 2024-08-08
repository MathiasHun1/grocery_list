import { forwardRef, useImperativeHandle, useState } from "react"
import InputField from "./InputField"
import StdButton from "./StdButton"
import Switch from '@mui/material/Switch';

const NoteForm = forwardRef(({ content, important, handleContentChange, handleImportantChange, addNote }, ref) => {
  const [visible, setVisible] = useState(false)

  const formView = { 'display': visible ? '' : 'none'}
  const addView = { 'display': visible ? 'none' : ''}

  const toggleVis = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVis: toggleVis
    }
  })

  return (
    <div className="mt-10 mb-4">
      <form 
      style={formView}
      onSubmit={addNote}
      className="px-8 bg-black w-fit flex flex-col gap-2 shadow-lg">
        
        <div className="relative">
          <InputField type="text" text="note:" placeholder="note here" onChange={handleContentChange} value={content} id="note-input" className="mb-0"/>

            <div className="absolute top-5 right-0">
              <Switch label="important" checked={important} onChange={handleImportantChange}/>
            </div>
        </div>

        <div className="w-full mx-auto flex items-center">
          <div className="">
          </div>
        </div>

        <div className="flex flex-col items-center">
          <StdButton type="submit" text="Add" className="p-2 w-32 font-bold text-2xl"/>
        </div>
        <div className="flex flex-col items-center">
          <StdButton type="button" text="Close" className=" w-32 h-6" onClick={toggleVis}/>
        </div>
      </form>

      <StdButton 
        style={addView} 
        text="NEW" 
        onClick={toggleVis} 
        className='bg-lime-400 text-black font-bold text-xl p-2'
      />
    </div>
  )
})

export default NoteForm