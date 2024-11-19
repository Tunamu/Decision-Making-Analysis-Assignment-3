import './ButtonPropt.css';

function ButtonPropt({ name, bgColor ,color,onClickFunc }) {
  return (
    <button 
      style={{ 
        backgroundColor: bgColor,
        color:color 
      }} 
      onClick={() => onClickFunc()}
    >
      {name}
    </button>
  );
}

export default ButtonPropt;
