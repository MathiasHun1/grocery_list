
const Message = ({ errorMsg, successMsg }) => {

  if (errorMsg) {
    return (
      <p className="p-2 bg-red-500 text-center">{errorMsg}</p>
    )
  } else if (successMsg) {
    return (
      <p className="p-2 bg-lime-500 text-center">{successMsg}</p>
    )
  } else return null
}

export default Message