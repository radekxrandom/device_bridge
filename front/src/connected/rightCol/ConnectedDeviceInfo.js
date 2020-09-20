import React from "react";

const ConnectedDeviceInfo = props => {
	return(
		<p className='conDevice'>
			<span className='dot' /><span className='fileOwner'>{props.name}</span>
		</p>
	);
};

export default ConnectedDeviceInfo;
