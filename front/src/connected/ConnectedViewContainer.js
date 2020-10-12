import React from "react";
import SharedFilesContainer from "./midCol/SharedFilesContainer";
import ConnectionInfoContainer from "./rightCol/ConnectionInfoContainer";
import LeftContainer from "./leftCol/LeftContainer";

const ConnectedViewContainer = props => {
	return (
		<div className="mainWrapper">
			<div className="leftCol">
				{/*<LeftContainer
					conID={props.connection}
					devices={props.connectedDevices}
					socket={props.socket}
				/>*/}
			</div>
			<div className="midCol">
				<SharedFilesContainer
					files={props.sharedFiles}
					removeFile={props.removeFile}
					conID={props.connection}
					devices={props.connectedDevices}
					socket={props.socket}
				/>
			</div>
			<div className="rightCol">
				<ConnectionInfoContainer
					resetConnection={props.resetConnection}
					deleteSession={props.deleteSession}
					clearSharedHistory={props.clearSharedHistory}
					connection={props.connection}
					devices={props.connectedDevices}
				/>
			</div>
		</div>
	);
};

export default ConnectedViewContainer;
