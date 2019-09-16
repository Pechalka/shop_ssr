import React from 'react';

const InputText = ({ html }) => (
	<div className="input-text" dangerouslySetInnerHTML={{ __html: html }}>
	</div>
)

export default InputText;