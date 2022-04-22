import { render } from '@testing-library/react';
import React from "react"

const getInstance = (Component, props) => {
    let instanceRef = { current: null }
    const InstanceWrapper = () => {
        return <Component {...props} ref={instanceRef} />
    }
    const renderResult = render(<InstanceWrapper />)
    return { ...renderResult, instanceRef }
}

export default getInstance;