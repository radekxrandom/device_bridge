import React from "react";
import SharedFile from "./SharedFile";
import InputArea from "./InputArea";

const SharedFilesContainer = props => {
	return (
		<>
			<InputArea socket={props.socket} conID={props.conID} />
			{props.files
				.map(el => (
					<SharedFile
						text={el.file.text}
						img={el.file.img}
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
