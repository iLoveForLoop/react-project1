import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

import Textbox from "./components/textbox/textbox";
import Dropdown from "./components/dropdown/dropdown";
import CustomButton from "./components/button/button";

import "./App.css";
import Checkout from "./components/checkout/Checkout";

function App() {
	const [cartItems, setCartItems] = useState(() => {
		const newItems = JSON.parse(localStorage.getItem("itemStorage"));
		return newItems ? newItems : [];
	});
	const [txtName, setTxtName] = useState("");
	const [textPrice, setTextPrice] = useState("");
	const [textQuantity, setTextQuantity] = useState("");
	const [editingIndex, setEditingIndex] = useState(null);
	const [shippingFee, setShippingFee] = useState(0);
	let subTotal = 0;

	const setLocalStorage = (cartItems) => {
		localStorage.setItem("itemStorage", JSON.stringify(cartItems));
	};

	useEffect(() => {
		setLocalStorage(cartItems);
		console.log("Something Changed");
	}, [cartItems]);

	const towns = ["tubigon", "calape", "loon"];
	const fee = {
		tubigon: 50,
		calape: 100,
		loon: 150,
	};

	function onChange(e) {
		const id = e.target.id;
		const value = e.target.value;

		if (id === "txtName") setTxtName(value);
		if (id === "txtPrice") setTextPrice(value);
		if (id === "txtQuantity") setTextQuantity(value);
		if (towns.includes(value)) {
			setShippingFee(fee[value]);
		}
	}

	function formatCurrency(num) {
		const formatter = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "PHP",
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
		return formatter.format(num);
	}

	function addToChart() {
		if ((txtName, textPrice, textQuantity)) {
			const item = {
				name: txtName,
				price: textPrice,
				quantity: textQuantity,
			};

			if (editingIndex !== null) {
				const updatedItems = [...cartItems];
				updatedItems[editingIndex] = item;
				setCartItems(updatedItems);
				setEditingIndex(null);
			} else {
				// const newItems = [...cartItems, item];
				// setCartItems(newItems);
				setCartItems([...cartItems, item]);
			}

			setTxtName("");
			setTextPrice("");
			setTextQuantity("");
		}
	}

	function deleteItem(itemIndex) {
		const updatedItems = [...cartItems];
		updatedItems.splice(itemIndex, 1);
		setCartItems(updatedItems);
	}

	function editItem(index) {
		setEditingIndex(index);
		setTxtName(cartItems[index].name);
		setTextPrice(cartItems[index].price);
		setTextQuantity(cartItems[index].quantity);
	}

	function clearCart() {
		setCartItems([]);
	}

	const [isCheckout, setIsCheckOut] = useState(false);
	function checkout() {
		setIsCheckOut(!isCheckout);
	}

	const toogleCheckout = (data) => {
		console.log("i reached here");
		alert("Checkout successfull!");
		setIsCheckOut(data);
		setCartItems([]);
	};

	const toogleCancel = (data) => {
		console.log("cancelled");
		setIsCheckOut(data);
	};

	return (
		<div>
			<div className="main-container">
				<div className="sub-container">
					<h3 className="text-center py-3 text-bg-dark">ITEMS</h3>
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
					<div className="d-flex justify-content-center py-2">
						<CustomButton
							label={editingIndex !== null ? "Update" : "Add To Cart"}
							onClick={addToChart}
							variant="primary"
						/>
					</div>
				</div>
				{cartItems.length > 0 && (
					<div className="item-container my-5">
						<h3 className="text-center py-3 text-bg-dark">CART ITEMS</h3>
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
									subTotal += item.price * item.quantity;

									return (
										<tr key={index}>
											<td>{index + 1}</td>
											<td>{item.name}</td>
											<td>{formatCurrency(item.price)}</td>
											<td>{item.quantity}</td>
											<td>{formatCurrency(item.price * item.quantity)}</td>
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
						</Table>
						<div className="d-flex justify-content-between">
							<div className="d-flex">
								<Dropdown
									id="drpTown"
									label="town"
									options={towns}
									containerClass="d-flex p-3"
									onSelectChange={onChange}
								/>
								<Dropdown
									name="drpPayment"
									label="payment method"
									options={["gcash", "creditcard"]}
									containerClass="d-flex py-3"
									onSelectChange={onChange}
								/>
							</div>

							<div className="d-flex justify-content-center align-items-center">
								<CustomButton
									label="clear"
									variant="danger"
									innerClass="my-1 me-2"
									onClick={clearCart}
								/>
							</div>
						</div>
						<div className="d-flex justify-content-between">
							<div className="ms-2">
								<p className="mb-0 fs-6">
									SubTotal: {formatCurrency(subTotal)}
								</p>
								<p className="mb-0 fs-6">
									Shipping Fee: {formatCurrency(shippingFee)}
								</p>
								<h5>GrandTotal: {formatCurrency(subTotal + shippingFee)}</h5>
							</div>

							<div className="d-flex justify-content-center align-items-center">
								<CustomButton
									label="Check Out"
									variant="warning"
									innerClass="my-1 me-2"
									onClick={checkout}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
			{isCheckout && (
				<Checkout
					cart={cartItems}
					toogleCheckout={toogleCheckout}
					cancelCheckout={toogleCancel}
					subTotal={subTotal}
					shippingFee={shippingFee}
				/>
			)}
		</div>
	);
}

export default App;
