import React from 'react'
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material'

import { H3 } from '@/components/data-display'

const OpeningHours = () => {
    return (
        <React.Fragment>
            <H3 data-testid="opening-hours-heading">Opening Hours</H3>
            <Table size="small" aria-label="opening hours">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ border: 'none' }}>Day</TableCell>
                        <TableCell align="right" sx={{ border: 'none' }}>
                            Hours
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{ border: 'none' }}>Monday</TableCell>
                        <TableCell align="right" sx={{ border: 'none' }}>
                            9:00 AM - 7:00 PM
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ border: 'none' }}>Tuesday</TableCell>
                        <TableCell align="right" sx={{ border: 'none' }}>
                            9:00 AM - 7:00 PM
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ border: 'none' }}>Wednesday</TableCell>
                        <TableCell align="right" sx={{ border: 'none' }}>
                            9:00 AM - 7:00 PM
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ border: 'none' }}>Thursday</TableCell>
                        <TableCell align="right" sx={{ border: 'none' }}>
                            9:00 AM - 7:00 PM
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ border: 'none' }}>Friday</TableCell>
                        <TableCell align="right" sx={{ border: 'none' }}>
                            9:00 AM - 7:00 PM
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ border: 'none' }}>Saturday</TableCell>
                        <TableCell align="right" sx={{ border: 'none' }}>
                            9:00 AM - 7:00 PM
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ border: 'none' }}>Sunday</TableCell>
                        <TableCell align="right" sx={{ border: 'none' }}>
                            11:00 AM - 2:00 PM
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </React.Fragment>
    )
}

export default OpeningHours
