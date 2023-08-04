import { useState, useEffect } from "react";
import './styles.css'

function App() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [showForm, setShowForm] = useState(true);
  const [items, setItems] = useState(() => {
    const localValue = localStorage.getItem("items");
    if(localValue == null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items])
  

  function handleSubmit(e) {
    e.preventDefault();

    setItems((currentItems) => {
      return [
        ...currentItems,
        {
          id: crypto.randomUUID(),
          name: name,
          amount: amount
        }
      ]
    })
    setName("");
    setAmount(0);
  }

  function deleteItem(id){
    setItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    })
  }

  function addItem(item){
    item.amount++;
    setAmount(item.amount);
    // setAmount(item.amount + count)
    // console.log(item.id);
    // setItems((currentItems) => {
    //   return currentItems.map((item) => {
    //     setAmount(item.amount+1)
    //     // if(budka.id === item.id){
    //     //   // console.log("found one")
    //     //   console.log("amount: " + item.amount)
    //     //   setAmount(1+item.amount)
    //     // }
    //   })
    // })
    // setItems((currentItems) => { 
    //   return currentItems.map((item) => {
    //     if(item.id === id){
    //       // let temp = item.amount;
    //       // temp++;
    //       // setAmount(1+item.amount);
    //       // console.log(item.amount)
    //       let temp = item.amount;
    //       temp++;
    //       setAmount(temp)
    //     }
    //   })
    // })
    // console.log(item.id)
    // console.log(item.amount)
    // let temp = item.amount;
    // temp++;
    // setAmount(1 + item.amount );
    // setAmount(temp)
  }

  const toggleButton = () => {
    setShowForm(!showForm)
  }

  function subtractItem(item){
    // console.log(id);
    // console.log(item.id);
    console.log(item.amount);
    // console.log(--item.amount)
    if(item.amount == 0){
      setAmount(0)
    } else {
      item.amount--;
      setAmount(item.amount)
    }
    console.log(item.amount);
  }

  return (
    <>
      <h1>Inventory Manager</h1>
      <form className="new-item-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="Item">New Item</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter item..."
          />
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            value={name == "" ? 0 : amount}
            // value={0}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button className="btn" >Add Item</button>
      </form>
      {/* <h1>Inventory</h1> */}
      <table className="list">
        <thead>
          <tr>
            <th>Item</th>
            <th>Amount</th>
          </tr> 
        </thead>
        {items.map((item) => {
          return(
            <tbody key={item.id}>
              <tr>
                <td>{item.name}</td>
                <td>{item.amount}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => deleteItem(item.id)}>
                    Delete
                  </button>
                </td>
                <td>
                  <button className="btn" onClick={() => addItem(item)}>+</button>
                </td>
                <td>
                  <button className="btn" onClick={() => subtractItem(item)}>-</button>
                </td>
              </tr> 
            </tbody>
            
          )
        })}
      </table>
    </>
  );
}

export default App;
