import React from 'react'
import PropTypes from 'prop-types'

function Checkbox(props) {
	const {
		id,
		className  = '',
		error = '',
		checked,
		onChange,
	} = props;

	const checkboxClass = (() => {
		if (error) return "checkbox checkbox--error"
		else return "checkbox"
	})()

	return (
		<div className={`${checkboxClass} ${className}`}>
			<input onChange={onChange}
				   checked={checked}
				   className="checkbox__input"
				   type="checkbox" id={id}
				   value={id}/>
			<label className="checkbox__label" htmlFor={id}>{props.children}</label>
		</div>
	)
}

export default Checkbox;

Checkbox.propTypes = {
	id: PropTypes.string.isRequired,
	className: PropTypes.string,
	error: PropTypes.string,
	checked: PropTypes.bool,
	onChange: PropTypes.func
};
