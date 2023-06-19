

function MessageComponent({text,sender}) {
  return (
    <div className=" text-[#d8d8d8] font-medium my-4 text-xl"> <span className="text-[#999] m-2 font-medium my-4 text-lg">{sender}</span> {text}</div>
  )
}

export default MessageComponent