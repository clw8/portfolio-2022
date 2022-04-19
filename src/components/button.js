import React from 'react'
import PropTypes from 'prop-types';

function Button(props) {
    const {
        className = '',
        loading = false,
        loadingText = 'Loading',
        buttonStyle = 'primary',
        useAnchorTag = false, // for use in special cases where we need the button to be an anchor link or Inertia Link... because having a button wrapped in an anchor link isn't semantic HTML
        ...restProps
    } = props;

    const ButtonTag = useAnchorTag ? 'a' : 'button';

    const buttonClass = () => {
        let resultClass = '';
        resultClass += (props.disabled ? 'btn__disabled ' : `btn__${buttonStyle} `);
        if(className) resultClass += `${className} `;
        return resultClass
    }

	return <ButtonTag {...restProps} className={buttonClass()}>
        {loading ? loadingText : props.children}
    </ButtonTag>
}

Button.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    buttonStyle: PropTypes.oneOf(['primary', 'secondary', 'no-style', 'alert']),
    buttonType: PropTypes.string,
    onClick: PropTypes.func,
    useAnchorTag: PropTypes.bool,
    type: PropTypes.bool,
};

export default Button;
