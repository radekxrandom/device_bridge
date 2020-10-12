import React from "react";
import "./App.css";
import { socket } from "./socket";
import {
	isMobile,
	browserName,
	mobileModel,
	osName
} from "react-device-detect";
import QrComponent from "./components/QrComponent";
import DisconnectedViewContainer from "./disconnected/DisconnectedViewContainer";
import QRCode from "react-qr-code";
import ConnectedViewContainer from "./connected/ConnectedViewContainer";
import { mockSharedFiles, mockConnectedDevices } from "./mockData/mockLists";

const getUserData = () => {
	let data;
	if (isMobile) {
		data = `${browserName} ${osName} ${mobileModel}`;
		return data;
	}
	data = `${browserName} ${osName}`;
	return data;
};

const App = () => {
	const [connection, setConnection] = React.useState("");
	const [conUsers, setConUsers] = React.useState([]);
	const [files, setFiles] = React.useState([]);
	React.useEffect(() => {
		const urlLength = process.env.NODE_ENV === "production" ? 33 : 25;
		const browserData = window.navigator.userAgent.split(" ");
		const os = browserData[1].slice(1);

		const urlID = window.location.href.slice(urlLength);
		console.log(urlID);
		const conID = urlID.length ? urlID : localStorage.getItem("connectionID");
		//const conID = urlID;
		console.log(conID);
		const userData = getUserData();
		console.log(userData);
		if (conID) {
			console.log("join");
			socket.emit("joinBridge", conID, userData);
			setConnection(conID);
		} else {
			console.log("generateBridge");
			socket.emit("generateBridge", userData);
		}
		console.log(socket.id);

		socket.on("saveConID", id => {
			setConnection(id);
			localStorage.setItem("connectionID", id);
		});
		socket.on("connectedDevices", data => {
			if (!data) {
				return;
			}
			console.log("con dev");
			const otherDevices = data.filter(el => el.id !== socket.id);
			setConUsers(otherDevices);
		});

		socket.on("existingFiles", shared => {
			console.log("files");
			setFiles(shared);
		});

		return () => {
			socket.close();
		};
	}, []);

	socket.on("receiveFile", file => {
		let f = [...files, file];
		setFiles(f);
	});

	const removeFile = id => {
		console.log("remove f");
		const f = files.filter(el => el.id !== id);
		setFiles(f);
		socket.emit("removeFile", id, connection);
	};

	const resetConnection = () => {
		socket.connect();
		const userData = getUserData();
		localStorage.removeItem("connectionID");
		socket.emit("generateBridge", userData);
	};

	const deleteSession = async () => {
		//e.preventDefault();
		await socket.emit("deleteSession");
		resetConnection();
	};

	socket.on("disconnectSockets", () => {
		resetConnection();
	});

	const clearSharedHistory = e => {
		e.preventDefault();
		socket.emit("clearSharedHistory");
	};

	return (
		<div>
			{/*connection && !conUsers.length && (
				<DisconnectedViewContainer>
					<QRCode value={`${process.env.REACT_APP_FRONT_URL}${connection}`} />
				</DisconnectedViewContainer>
			) */}
			<ConnectedViewContainer
				resetConnection={resetConnection}
				connection={connection}
				removeFile={removeFile}
				sharedFiles={files}
				connectedDevices={conUsers}
				socket={socket}
				deleteSession={deleteSession}
				clearSharedHistory={clearSharedHistory}
			/>
			<div></div>
		</div>
	);
};

export default App;
