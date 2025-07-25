import React from 'react'
import { Table, TableBody, TableCell, TableRow } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'

const AddressDetails = () => (
    <Table data-testid="address-details">
        <TableBody>
            <TableRow>
                <TableCell
                    sx={{
                        border: 'none',
                        px: 0,
                        py: 0,
                    }}
                    style={{
                        verticalAlign: 'top',
                    }}
                >
                    <LocationOnIcon
                        style={{
                            fontSize: '1.3rem',
                        }}
                    />
                </TableCell>
                <TableCell
                    data-testid="address-label"
                    sx={{
                        border: 'none',
                        fontWeight: 'bold',
                        pl: 0,
                        pr: 2,
                        py: 0,
                    }}
                    style={{ verticalAlign: 'top' }}
                >
                    Address
                </TableCell>
                <TableCell
                    sx={{
                        border: 'none',
                        px: 0,
                        py: 0,
                    }}
                >
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
        </TableBody>
    </Table>
)

export default AddressDetails
