import "./input.css"
import { FaSearch } from "react-icons/fa";

function Input({text, submit, func}) {
  return (
    <form className="input" onSubmit={submit}>
        <input 
        className="input-value" 
        type="text" 
        placeholder="Please enter your Location"
        onChange={text}
         />
        <span className="input-icon" onClick={func}>
        <FaSearch />
        </span>
    </form>
  )
}

export default Input