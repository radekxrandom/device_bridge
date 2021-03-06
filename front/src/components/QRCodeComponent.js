import React from "react";
import QRCode from "react-qr-code";

const QRCodeComponent = props => {
	return (
		<QRCode value={`${process.env.REACT_APP_FRONT_URL}${props.connection}`} />
	);
};

export default QRCodeComponent;
