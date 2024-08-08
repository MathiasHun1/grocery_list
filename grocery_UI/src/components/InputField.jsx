const InputField = ({ placeholder, text, type, onChange, value, id='', className }) => {
  return (
    <div>
      <p>{text}</p>
      <input 
        type={type} 
        placeholder={placeholder} 
        onChange={(e) => onChange(e)} 
        value={value} 
        className={`p-1 text-black mb-4 ${className}`} 
      />
    </div>
  )
}

export default InputField