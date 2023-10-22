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

interface IConfirmDialogProps<T> {
    id: string
    title: string
    children: ReactNode
    open: boolean
    onConfirm: () => void
    onClose: () => void
}

const ConfirmDialog = <T extends {}>({
    id = 'confirm-dialog',
    title,
    children,
    open,
    onConfirm,
    onClose,
}: IConfirmDialogProps<T>) => {
    return (
        <Dialog
            data-testid={id}
            open={open}
            onClose={onClose}
            aria-labelledby="confirm-dialog"
            aria-describedby="confirm-dialog-description"
        >
            <DialogTitle>
                <span data-testid={`${id}-title`}>{title}</span>
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
                <Button
                    data-testid={`${id}-cancel-button`}
                    variant="contained"
                    onClick={onClose}
                    color="secondary"
                >
                    Cancel
                </Button>
                <Button
                    data-testid={`${id}-confirm-button`}
                    variant="contained"
                    onClick={onConfirm}
                    color="primary"
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog
