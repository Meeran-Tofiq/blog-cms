import { useState } from "react";
import TinyMCEEditor from "./TinyMCEEditor";

export default function CommentControls({
	content,
	onContentChanged,
	handleUpdate,
	handleDelete,
}) {
	const [edit, setEdit] = useState(false);

	return (
		<div className="editor-container">
			<div className="control-buttons">
				<button
					className="comment-control-button"
					onClick={() => setEdit(!edit)}
				>
					Edit
				</button>
				<button
					className="comment-control-button"
					onClick={() => {
						handleDelete();
						setEdit(false);
					}}
				>
					Delete
				</button>
			</div>
			{edit ? (
				<>
					<TinyMCEEditor
						initialContent={content}
						onContentChanged={onContentChanged}
					/>
					<button
						type="submit"
						onClick={() => {
							handleUpdate();
							setEdit(false);
						}}
					>
						Submit
					</button>
				</>
			) : null}
		</div>
	);
}
