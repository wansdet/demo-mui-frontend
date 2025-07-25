import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ButtonSubmit from './ButtonSubmit'
import { Overwrite } from '@mui/types'
import { ButtonProps } from '@mui/material/Button'
import { vi } from 'vitest'

type ButtonSubmitProps = Overwrite<
    ButtonProps,
    {
        ref?: React.Ref<HTMLButtonElement>
        component?: React.ElementType
    }
>

const onClick = vi.fn()

describe('ButtonSubmit Component', () => {
    const renderButtonSubmit = (props: ButtonSubmitProps) => {
        return render(<ButtonSubmit {...props}>Submit</ButtonSubmit>)
    }

    it('renders the button with the correct label', () => {
        const { getByText } = renderButtonSubmit({ onClick })

        const buttonElement = getByText('Submit')
        expect(buttonElement).to.not.be.null
        expect(buttonElement?.textContent).to.equal('Submit')
    })

    it('calls the onClick handler when the button is clicked', () => {
        const { getByText } = renderButtonSubmit({ onClick })

        // Find and click on the "Submit" button
        const buttonElement = getByText('Submit')
        buttonElement.click()

        // Check if the onClick handler is called
        expect(onClick).to.have.been.calledOnce

    })

    it('applies the correct styles to the button', () => {
        const { getByText } = renderButtonSubmit({ onClick })

        const buttonElement = getByText('Submit')

        // Check if the button has the "contained" variant
        expect(buttonElement?.classList.contains('MuiButton-contained'))

        // Check if the button has the "primary" color
        expect(buttonElement?.classList.contains('MuiButton-containedPrimary'))
    })
})
