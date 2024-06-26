import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return (
		<div
			
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				background: "rgba(0, 0, 0, 0.5)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				border: "1px solid black"
			}}
		>
			<button onClick={onClose}></button>
			<div
				style={{
					background: "white",
					height: 450,
					width: 540,
					margin: "auto",
					padding: "2%",
					//border: "2px solid #000",
					borderRadius: "15px",
					boxShadow: "2px solid black",
				}}
			>
				{children}
			</div>
		</div>
	);
};

export default Modal;
