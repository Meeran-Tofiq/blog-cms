import React from "react";

export default function ContentDisplay({ htmlContent }) {
	return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
