import React from "react";
import QRCode from "react-qr-code";

const QRCodeTop = props => {
	return(
		<QRCode value={`http://192.168.0.22:3000/${props.connection}`} />
	);
};

export default QRCodeTop;
