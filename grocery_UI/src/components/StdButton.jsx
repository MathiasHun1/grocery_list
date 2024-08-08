const StdButton = ({ type='button', text, onClick, className, style}) => {
  return (
    <button 
      type={type} 
      onClick={onClick} 
      style={style}
      className={`min-w-20 rounded-md bg-yellow-400 hover:bg-yellow-600 ${className} text-black`} 
    >
      {text}
    </button>
  )
}

export default StdButton