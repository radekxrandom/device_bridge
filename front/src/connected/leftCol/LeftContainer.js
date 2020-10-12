import React from "react";
//import InputArea from "./InputArea";
import ConnectedDeviceInfo from "../midCol/rightCol/ConnectedDeviceInfo";

const LeftContainer = props => {
	return (
		<>
			{/*<InputArea socket={props.socket} conID={props.conID} />*/}
			<div className="connList">
				<p>Connected devices</p>
				<p>{props.devices.length}</p>
				{props.devices.map(el => (
					<ConnectedDeviceInfo name={el.name} />
				))}
			</div>
		</>
	);
};

export default LeftContainer;
