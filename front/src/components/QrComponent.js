import React from "react";
import QRCode from "react-qr-code";

const QrComponent = props => {
	return (
		<div className="qrBox">
			<p className="qrBoxTopText">No device connected</p>
			<QRCode value={`${process.env.REACT_APP_FRONT_URL}${props.connection}`} />
			<p className="qrBoxBottomText">
				<span className="bolder">Scan</span> the{" "}
				<span className="bolder">QR code</span> with your device in order to
				connect
			</p>
		</div>
	);
};

export default QrComponent;
