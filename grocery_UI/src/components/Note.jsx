import { Switch } from "@mui/material"

const Note = ({ note, deleteNote, toggleImportance, showImportant }) => {
  const { content, important, id } = note
  const text = important ? 'imp.' : 'not.i.'
  const showWhenImportant = showImportant 
    ? {"display": 'flex'} 
    : {'display': 'none'}

  return (
    <div 
    style={showWhenImportant} 
    className="w-10/12 flex justify-between my-2 pl-2 h-10 rounded-l-xl rounded-tr-xl bg-green-400 relative">

      <p className="my-auto">{content}</p>

      <div className="flex ">

        <div className="">
          <Switch label="important" checked={important} value={important} onChange={() => toggleImportance(id)}/>
        </div>

        {/* <button onClick={() => toggleImportance(id)} className="bg-gray-200 px-2 rounded-sm hover:bg-gray-400">{text}
        </button> */}

        <button 
        onClick={() => deleteNote(id)}
        className="h-full px-3 bg-green-800 rounded-sm hover:bg-gray-400 font-bold" 
        >
          X
        </button>
      </div>

    </div>
  )
}

export default Note