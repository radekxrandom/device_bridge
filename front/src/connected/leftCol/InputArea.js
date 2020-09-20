import React from "react";
import { useDropzone } from "react-dropzone";
import moment from "moment";

const toBase64 = file =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});

const InputArea = props => {
	const [msg, setMsg] = React.useState("");
	const [filename, setFilename] = React.useState("Attach File");
	const [encodedFiles, setEncodedFiles] = React.useState({});

	const submit = e => {
		e.preventDefault();
		const data = {
			text: msg || false,
			img: encodedFiles.src ? encodedFiles : false,
			date: moment().format("DD/MM, HH:mm")
		};
		props.socket.emit("shareFile", data, props.conID);
		setMsg("");
		setFilename("Attach File");
		setEncodedFiles({});
	};

	const onDrop = React.useCallback(async acceptedFiles => {
		setEncodedFiles({});
		//setEncodedFiles(acceptedFiles);
		setFilename(acceptedFiles[0].name);
		const fileBase64 = await toBase64(acceptedFiles[0]);
		const file = {
			name: acceptedFiles[0].name,
			src: fileBase64
		};
		setEncodedFiles(file);
	}, []);
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		accept: ["image/jpeg", "image/png", "image/gif", "image/*"],
		maxSize: 100000000, // 100 mb
		multiple: false,
		onDrop
	});

	return (
		<>
			<div className="inputArea">
				<textarea
					placeholder="Text goes here"
					onChange={e => setMsg(e.target.value)}
					value={msg}
				/>
				<div className="btns">
					{/*<button className="fileBtn">Attach File</button>
					{encodedFiles.map((file, idx) => {
						return (
							<div className='files' key={idx}>
								<b>{file.name}</b> ({file.size} bytes)
							</div>
						);
					})} */}
					<button className="fileBtn">
						<div {...getRootProps()}>
							<input {...getInputProps()} />
							<span>{filename}</span>
						</div>
					</button>
					<button className="shareBtn" onClick={submit}>
						Submit
					</button>
				</div>
			</div>
		</>
	);
};

export default InputArea;
