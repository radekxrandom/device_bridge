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

const processFile = async file => {
	const fileBase64 = await toBase64(file);
	const processedFile = {
		name: file.name,
		src: fileBase64
	};
	return processedFile;
};

const InputArea = props => {
	const [msg, setMsg] = React.useState("");
	const [filename, setFilename] = React.useState("Attach File");
	const [encodedFiles, setEncodedFiles] = React.useState([]);

	const submit = e => {
		//e.preventDefault();
		const data = {
			text: msg || false,
			imgs: encodedFiles.length ? encodedFiles : false,
			date: moment().format("DD/MM, HH:mm")
		};
		props.socket.emit("shareFile", data, props.conID);
		setMsg("");
		setFilename("Attach File");
		setEncodedFiles([]);
	};

	const onDrop = React.useCallback(async acceptedFiles => {
		const newPromises = acceptedFiles.map(processFile);
		const newFiles = await Promise.allSettled([...newPromises]);
		const fles = newFiles.map(el => el.value);
		setEncodedFiles(prev => [...prev, ...fles]);
		setFilename(acceptedFiles[0].name);
	}, []);

	const { getRootProps, getInputProps } = useDropzone({ onDrop });
	const handleInput = e => {
		console.log(e.key);
		if (e.key === "Enter" && e.ctrlKey === false) {
			e.preventDefault();
			console.log("ent");
			submit();
			return;
		}
	};

	return (
		<>
			<div className="inputArea">
				<span className="closeBtn clickable" onClick={props.switchPostingMode}>
					[x]
				</span>
				<textarea
					placeholder="Text goes here"
					onKeyPress={handleInput}
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
					<button className="shareBtn" onClick={submit}>
						Submit
					</button>
					<button className="fileBtn">
						<div {...getRootProps()}>
							<input {...getInputProps()} />
							<span>{filename}</span>
						</div>
					</button>
					<div className="files">
						{encodedFiles.map((file, idx) => {
							return <p key={idx}>{file.name}</p>;
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default InputArea;
