import React from "react";

const DisconnectedViewContainer = props => {
	return(
		<div className='qrBox'>
			<p className='qrBoxTopText'>No device connected</p>
			{props.children}
			<p className='qrBoxBottomText'><span className='bolder'>Scan</span> the <span className='bolder'>QR code</span> with your device in order to connect</p>
		</div>
	);
};

export default DisconnectedViewContainer;
