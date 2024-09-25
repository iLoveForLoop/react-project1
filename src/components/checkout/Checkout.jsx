import React from "react";
import "./Checkout.css";
import Table from "react-bootstrap/Table";
import CustomButton from "../button/button";

function Checkout({
	toogleCheckout,
	cancelCheckout,
	cart,
	subTotal,
	shippingFee,
}) {
	function formatCurrency(num) {
		const formatter = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "PHP",
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
		return formatter.format(num);
	}

	const isCheckout = () => {
		toogleCheckout(false);
	};

	const cancel = () => {
		cancelCheckout(false);
	};

	return (
		<div className="back-drop d-flex align-items-center justify-content-center">
			<div className="p-3 bg-light h-50 w-50 overflow-scroll hide-scroll">
				<h2 className="text-bg-dark text-center p-2">Checkout Items</h2>
				<Table striped bordered>
					<thead>
						<th>Item name</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Total</th>
					</thead>
					<tbody>
						{cart.map((item, index) => {
							return (
								<tr key={index}>
									<td>{item.name}</td>
									<td>{formatCurrency(item.price)}</td>
									<td>{item.quantity}</td>
									<td>{formatCurrency(item.price * item.quantity)}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
				<div className="d-flex justify-content-between align-items-center">
					<div className="ms-2">
						<p className="mb-0 fs-6">SubTotal: {formatCurrency(subTotal)}</p>
						<p className="mb-0 fs-6">
							Shipping Fee: {formatCurrency(shippingFee)}
						</p>
						<h5>GrandTotal: {formatCurrency(subTotal + shippingFee)}</h5>
					</div>
					<div className="d-flex justify-content-center align-items-center">
						<CustomButton
							label="Cancel"
							variant="danger"
							innerClass="my-1 me-2"
							onClick={cancel}
						/>
						<CustomButton
							label="Confirm"
							variant="success"
							innerClass="my-1 me-2"
							onClick={isCheckout}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Checkout;
