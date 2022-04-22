import {cleanup, fireEvent, render, act } from '@testing-library/react';
import "@testing-library/jest-dom"
import React, { useEffect } from "react"

import ToastProvider from '../../context-providers/toast-provider';
import { useToast } from '../../hooks';

const Layout = ({children}) => {
    return (
        <div style={{minHeight: "100vh", position: "relative"}}>
            <ToastProvider>
                {children}
            </ToastProvider>
        </div>
    )
}
let showToast;
const Page = () => {
    const { showSuccessToast } = useToast()
    showToast = () => showSuccessToast("hi there!")

    return <div style={{ height: "1400px" }}>Home page</div>
}

describe("Toast", () => {
    let toast, asFragmentVariable;
    beforeEach(() => {
        const {getByRole, asFragment} = render(
            (<Layout>
                <Page />
            </Layout>))

        act(() => {
            showToast()
            toast = getByRole("alert")
            asFragmentVariable = asFragment
        })
    })

    it ("renders correctly", () => {
        expect(toast).toBeInTheDocument()
        const firstRender = asFragmentVariable()
        expect(firstRender).toMatchSnapshot()
    })

    it("is triggered successfully", () => {
        act(() => {
            fireEvent.animationEnd(toast)
        })

        expect(toast).toHaveAttribute("animation", "toast-in-end")

        expect(toast).toBeVisible()
        expect(toast).toHaveTextContent("hi there!")
    })
    
    it("hides toast on user click", () => {
        fireEvent.animationEnd(toast)
        act(() => {
            fireEvent.click(toast)
            fireEvent.animationEnd(toast)
        })

        expect(toast).not.toHaveAttribute("animation", "toast-out-end")
        expect(toast).not.toHaveTextContent("hi there!")
    })

})