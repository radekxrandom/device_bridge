import React from "react";
import SharedFile from "./SharedFile";
import InputArea from "./InputArea";

const SharedFilesContainer = props => {
	const [isFormOpen, setIsFormOpen] = React.useState(false);

	const switchPostingMode = _ => {
		setIsFormOpen(prev => !prev);
	};

	return (
		<>
			<p className="header">Shared files</p>
			{isFormOpen && (
				<InputArea
					socket={props.socket}
					conID={props.conID}
					switchPostingMode={switchPostingMode}
				/>
			)}
			{!isFormOpen && (
				<p onClick={switchPostingMode} className="showForm clickable">
					[+] Show form
				</p>
			)}
			{props.files
				.map(el => (
					<SharedFile
						text={el.file.text}
						imgs={el.file.imgs}
						date={el.file.date}
						owner={el.owner}
						id={el.id}
						removeFile={props.removeFile}
					/>
				))
				.reverse()}
		</>
	);
};

export default SharedFilesContainer;
