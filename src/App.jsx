import { useState } from "react";
import Table from "react-bootstrap/Table";

import Textbox from "./components/textbox/textbox";
import Dropdown from "./components/dropdown/dropdown";
import CustomButton from "./components/button/button";

import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [txtName, setTxtName] = useState("");
  const [textPrice, setTextPrice] = useState("");
  const [textQuantity, setTextQuantity] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [total, setTotal] = (useState(0));

  function onChange(e) {
    const id = e.target.id;
    const value = e.target.value;

    if (id === "txtName") setTxtName(value);
    if (id === "txtPrice") setTextPrice(value);
    if (id === "txtQuantity") setTextQuantity(value);
  }

  function addToChart() {
    if ((txtName, textPrice, textQuantity)) {
      const item = {
        name: txtName,
        price: textPrice,
        quantity: textQuantity,
      };

      if(editingIndex !== null){
        const updatedItems = [...cartItems];
        updatedItems[editingIndex] = item;
        setCartItems(updatedItems);
        setEditingIndex(null);

      }else{
        const newItems = [...cartItems, item];
        setCartItems(newItems);
      }
      
      const total = item.price * item.quantity;
      setTotal((data) => data += total )
      setTxtName("");
      setTextPrice("");
      setTextQuantity("");
    }
  }

  function deleteItem(itemIndex) {
    console.log(itemIndex);
    const total = cartItems[itemIndex].price * cartItems[itemIndex].quantity;
    setTotal((data) => data -= total );
    const updatedItems = [...cartItems];
    updatedItems.splice(itemIndex, 1);


    setCartItems(updatedItems);
    
  }

  function editItem(index){
    setEditingIndex(index)
    setTxtName(cartItems[index].name);
    setTextPrice(cartItems[index].price);
    setTextQuantity(cartItems[index].quantity);
  }

  return (
    <div>
      <div className="main-container">
        <div className="sub-container">
          <Textbox
            id="txtName"
            type="text"
            label="item name"
            value={txtName}
            containerClass="p-3"
            onTextChange={onChange}
          />
          <Textbox
            id="txtPrice"
            type="number"
            label="item price"
            value={textPrice}
            containerClass="p-3"
            onTextChange={onChange}
          />
          <Textbox
            id="txtQuantity"
            type="number"
            label="quantity"
            value={textQuantity}
            containerClass="p-3"
            onTextChange={onChange}
          />
          <Dropdown
            id="drpTown"
            label="town"
            options={["tubigon", "calape"]}
            containerClass="p-3"
            onSelectChange={onChange}
          />
          <Dropdown
            name="drpPayment"
            label="payment method"
            options={["gcash", "creditcard"]}
            containerClass="p-3"
            onSelectChange={onChange}
          />
          <div className="d-flex justify-content-center py-2">
            <CustomButton
              label="add to cart"
              onClick={addToChart}
              variant="primary"
            >{editingIndex !== null ? 'UPDATE' : 'ADD TO CART'}</CustomButton>
          </div>
        </div>
        {cartItems.length > 0 && (
          <div className="item-container my-5">
            <h3 className="text-center py-3">CART ITEMS</h3>
            <Table striped bordered>
              <thead>
                <tr className="text-capitalize">
                  <th>item#</th>
                  <th>item name</th>
                  <th>price</th>
                  <th>quantity</th>
                  <th>total</th>
                  <td>actions</td>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price * item.quantity}</td>
                      <td className="text-center" width={200}>
                        <CustomButton
                          label="edit"
                          variant="success"
                          innerClass="m-1"
                          onClick={() => editItem(index)}
                        />
                        <CustomButton
                          label="delete"
                          variant="danger"
                          innerClass="m-1"
                          onClick={() => deleteItem(index)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <th>Total</th>
                <td>${total}</td>
              </tfoot>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
