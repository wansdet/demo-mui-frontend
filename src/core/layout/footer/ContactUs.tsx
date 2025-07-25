import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'

import { H3 } from '@/components/data-display'

const ContactUs = () => (
        <>
            <H3>Contact Us</H3>

            <Table size="small" aria-label="contact us">
                <TableBody>
                    <TableRow>
                        <TableCell
                            style={{ verticalAlign: 'top' }}
                            sx={{ border: 'none' }}
                        >
                            <LocationOnIcon
                                style={{
                                    fontSize: '1.3rem',
                                }}
                            />
                        </TableCell>
                        <TableCell
                            style={{ verticalAlign: 'top' }}
                            sx={{ border: 'none' }}
                        >
                            Address
                        </TableCell>
                        <TableCell align="right" sx={{ border: 'none' }}>
                            Demo Organisation
                            <br />
                            Oxford Business Park
                            <br />
                            Oxford
                            <br />
                            Oxfordshire
                            <br />
                            OX4 2JY
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ border: 'none' }}>
                            <PhoneIcon
                                style={{
                                    fontSize: '1.3rem',
                                }}
                            />
                        </TableCell>
                        <TableCell sx={{ border: 'none' }}>Phone</TableCell>
                        <TableCell align="right" sx={{ border: 'none' }}>
                            (01234) 456-7890
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ border: 'none' }}>
                            <EmailIcon
                                style={{
                                    fontSize: '1.3rem',
                                }}
                            />
                        </TableCell>
                        <TableCell sx={{ border: 'none' }}>Email</TableCell>
                        <TableCell align="right" sx={{ border: 'none' }}>
                            demo@example.com
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    )

export default ContactUs
