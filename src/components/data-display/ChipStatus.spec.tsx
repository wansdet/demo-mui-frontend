import React from 'react'
import { render } from '@testing-library/react'
import ChipStatus from './ChipStatus'

const mockStatuses = [
    { value: 'status1', label: 'Status 1', color: 'primary' },
    { value: 'status2', label: 'Status 2', color: 'secondary' },
    // Add more mock statuses as needed for testing
]

describe('ChipStatus Component', () => {
    it('renders chip with correct label', () => {
        const statusValue = 'status1'
        const { getByText } = render(
            <ChipStatus id='status' size='small' statusValue={statusValue} statuses={mockStatuses} />,
        )

        const chipElement = getByText('Status 1')
        expect(chipElement).to.not.be.null
        expect(chipElement?.textContent).to.equal('Status 1')
    })

    it('does not render chip when statusValue does not match any status', () => {
        const statusValue = 'nonExistentStatus'
        const { container } = render(
            <ChipStatus id='status' size='small' statusValue={statusValue} statuses={mockStatuses} />,
        )

        const chipElement = container.querySelector('.MuiChip-root')
        expect(chipElement).to.be.null
    })

    // Test size prop
    it('renders chip with correct size when size prop is passed', () => {
        const statusValue = 'status1'
        const { container } = render(
            <ChipStatus
                id='status'
                size='small'
                statusValue={statusValue}
                statuses={mockStatuses}
            />,
        )

        const chipElement = container.querySelector('.MuiChip-sizeSmall')
        expect(chipElement).to.not.be.null
        expect(chipElement?.classList.contains('MuiChip-sizeSmall')).to.be.true
    })
})
