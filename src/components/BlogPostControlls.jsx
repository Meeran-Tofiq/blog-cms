import { useState } from "react";
import TinyMCEEditor from "./TinyMCEEditor";

export default function BlogPostControlls({
	title,
	onTitleChanged,
	content,
	onContentChanged,
	handleUpdate,
	handleDelete,
}) {
	const [edit, setEdit] = useState(false);

	return (
		<div className="editor-container">
			<div className="control-buttons-container">
				<button
					className="control-button"
					onClick={() => setEdit(!edit)}
				>
					Edit
				</button>
				<button
					className="control-button"
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
					<h2>Title</h2>
					<TinyMCEEditor
						initialContent={title}
						onContentChanged={onTitleChanged}
						height={200}
					/>
					<h2>Content</h2>
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
