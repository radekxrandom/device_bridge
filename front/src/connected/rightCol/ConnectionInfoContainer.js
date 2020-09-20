import React from "react";
import QRCodeTop from "./QRCodeTop";
import ConnectedDeviceInfo from "./ConnectedDeviceInfo";

const ConnectionInfoContainer = props => {
	return (
		<>
			<div className="conQRBox">
				<p className="qrAdnotation">SCAN TO CONNECT</p>
				<QRCodeTop connection={props.connection} />
			</div>
			<div className="connList">
				<p>Connected devices</p>
				<p>{props.devices.length}</p>
				{props.devices.map(el => (
					<ConnectedDeviceInfo name={el.agent} />
				))}
			</div>
		</>
	);
};

export default ConnectionInfoContainer;
