import React from "react";
import QRCodeTop from "./QRCodeTop";
import ConnectedDeviceInfo from "./ConnectedDeviceInfo";

const ConnectionInfoContainer = props => {
	return (
		<>
			<div className="conQRBox">
				<p className="qrAdnotation">SCAN TO CONNECT</p>
				<QRCodeTop connection={props.connection} />
				<p>{props.connection}</p>
				<div className="ctrlBtns">
					<button className="resetBtn" onClick={props.resetConnection}>
						Disconnect
					</button>
					<button className="resetBtn" onClick={props.deleteSession}>
						New session
					</button>
					<button className="resetBtn" onClick={props.clearSharedHistory}>
						Clear
					</button>
				</div>
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
