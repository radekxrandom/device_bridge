import React from "react";
import SharedFile from "./SharedFile";

const SharedFilesContainer = props => {
	return (
		<>
			<p className="headerText">Shared Files</p>
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
