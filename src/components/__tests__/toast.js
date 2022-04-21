import {cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom"
import React, { useEffect } from "react"

import ToastProvider from '../../context-providers/toast-provider';
import { useToast } from '../../hooks';

const Layout = ({children}) => {
    return (
        <div style={{minHeight: "100vh"}}>
            <ToastProvider>
                {children}
            </ToastProvider>
        </div>
    )
}

const Page = () => {
    const { showSuccessToast } = useToast()

    useEffect(() => {
        showSuccessToast("hi there!")
    }, [])

    return "Home page"
}

describe("Toast", () => {
    let toast, asFragmentVariable;
    beforeEach(() => {
        const {getByRole, asFragment} = render(
            (<Layout>
                <Page />
            </Layout>))
    
        toast = getByRole("alert")
        asFragmentVariable = asFragment
    })

    it ("renders correctly", () => {
        expect(toast).toBeInTheDocument()
        const firstRender = asFragmentVariable()
        expect(firstRender).toMatchSnapshot()
    })

    it("is triggered byshowSuccessToast function", () => {
        fireEvent.animationEnd(toast)
        expect(toast).toBeVisible()
        expect(toast).toHaveTextContent("hi there!")
    })

    it("hides toast on user click", () => {
        fireEvent.click(toast)
        fireEvent.animationEnd(toast)
        expect(toast).not.toHaveTextContent("hi there!")
    })

})