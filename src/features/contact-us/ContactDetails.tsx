import React from 'react'
import { Table, TableBody, TableCell, TableRow } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'

const ContactDetails = () => {
    return (
        <Table data-testid="contacts-details">
            <TableBody>
                <TableRow>
                    <TableCell
                        sx={{
                            border: 'none',
                            px: 0,
                            py: 0,
                        }}
                    >
                        <PhoneIcon
                            style={{
                                fontSize: '1.3rem',
                            }}
                        />
                    </TableCell>
                    <TableCell
                        data-testid="contact-phone"
                        sx={{
                            border: 'none',
                            fontWeight: 'bold',
                            px: 0,
                            py: 0,
                        }}
                    >
                        Phone
                    </TableCell>
                    <TableCell
                        sx={{
                            border: 'none',
                            px: 0,
                            py: 0,
                        }}
                    >
                        (01234) 456-7890
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell
                        sx={{
                            border: 'none',
                            px: 0,
                            py: 0,
                        }}
                    >
                        <EmailIcon
                            style={{
                                fontSize: '1.3rem',
                            }}
                        />
                    </TableCell>
                    <TableCell
                        data-testid="contact-email"
                        sx={{
                            border: 'none',
                            fontWeight: 'bold',
                            px: 0,
                            py: 0,
                        }}
                    >
                        Email
                    </TableCell>
                    <TableCell
                        sx={{
                            border: 'none',
                            px: 0,
                            py: 0,
                        }}
                    >
                        demo@example.com
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default ContactDetails
