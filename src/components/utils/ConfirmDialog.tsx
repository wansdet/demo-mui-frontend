import React, { ReactNode } from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface IConfirmDialogProps {
    id?: string
    title: string
    children: ReactNode
    open: boolean
    onConfirm: () => void
    onClose: () => void
}

const ConfirmDialog = <T extends NonNullable<unknown>>({
    id,
    title,
    children,
    open,
    onConfirm,
    onClose,
}: IConfirmDialogProps) => (
        <Dialog
            id={id}
            open={open}
            onClose={onClose}
            aria-labelledby="confirm-dialog"
            aria-describedby="confirm-dialog-description"
        >
            <DialogTitle>
                {title}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: 'text.secondary',
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button id="cancel-btn" variant="contained" onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button id="confirm-btn" variant="contained" onClick={onConfirm} color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )

export default ConfirmDialog
