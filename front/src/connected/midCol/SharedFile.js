import React from "react";
import { Trash } from "tabler-icons-react";

const SharedFile = props => {
	const clsNaem = props.isImg ? "imgFile" : "txtFile";
	const isUrl = props.text ? props.text.slice(0, 4) === "http" : false;

	return (
		<>
			<p className={`${clsNaem} file`}>
				<span className="dot" />
				{/* {props.isImg
					? (<img className='fileContent' src={props.text} />)
					: (<span className='fileContent'>{props.text}</span>)} */}
				{isUrl && <a href={props.text}>{props.text}</a>}
				{!isUrl && <span className="fileContent">{props.text}</span>}
				<img className="fileContent" src={props.img.src} />
				<p className="ownerInfor">
					{/* <span className="fileOwnerAdnotation">Metadata: </span> */}
					<span className="fileOwner">{`Sent: ${props.date} `}</span>
					<span className="fileOwner">{`By: ${props.owner}`}</span>
					<Trash
						className="delIcon"
						onClick={() => props.removeFile(props.id)}
					/>
				</p>
				<span className="delet" />
			</p>
		</>
	);
};

export default SharedFile;
