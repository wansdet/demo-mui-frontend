import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'

import { Container, IconButton, Tooltip, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { DataGrid } from '@mui/x-data-grid'

import { SecurityContext } from '@/core/security'
import {
    ApplicationContext,
    API_URL_DOCUMENTS,
    API_URL_DOCUMENTS_USER,
    APP_NAME,
} from '@/core/application'
import { useApiDelete, useApiGet } from '@/core/api'
import { AdminFooter } from '@/core/layout'
import useNotification from '@/common/hooks/feedback/useNotification'
import { IDocument } from '@/common/models/document'
import { H1 } from '@/components/data-display'
import { ConfirmDialog } from '@/components/utils'
import EditIcon from '@mui/icons-material/Edit'

const DocumentsList = () => {
    const [documents, setDocuments] = useState<any[]>([])
    const [pageSize, setPageSize] = useState(10)
    const [selectedDocument, setSelectedDocument] = useState<any | null>(null)
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)

    const { authHeader } = useContext(SecurityContext)
    const headers = authHeader()

    const title = 'My Documents'
    document.title = `${title} | Admin | ${APP_NAME}`

    const {
        data: fetchedDocuments,
        loading: getLoading,
        error: getError,
    } = useApiGet<any[]>(API_URL_DOCUMENTS_USER)

    const {
        deleteData: deleteDocument,
        loading: deleteDocumentLoading,
        error: deleteDocumentError,
    } = useApiDelete(
        selectedDocument ? `${API_URL_DOCUMENTS}/${selectedDocument.id}` : ''
    )

    const { showLoading, hideLoading } = useContext(ApplicationContext)
    const { showNotification, NotificationComponent } = useNotification()
    const navigate = useNavigate()

    useEffect(() => {
        if (fetchedDocuments) {
            setDocuments(
                fetchedDocuments.map((document: IDocument) => ({
                    id: document.id,
                    filename: document.filename,
                    createdAt: document.createdAt,
                }))
            )
        }
    }, [fetchedDocuments])

    useEffect(() => {
        setPageSize(10)
    }, [])

    useEffect(() => {
        if (getLoading) {
            showLoading()
        } else {
            hideLoading()
        }
    }, [getLoading])

    const handleDocumentDownload = (params: any, event: any) => {
        const downloadUrl = `${API_URL_DOCUMENTS}/${params.row.id}/download`
        const filename = params.row.filename

        Axios.get(downloadUrl, {
            headers,
            responseType: 'blob', // Set responseType to 'blob' to handle binary data
        })
            .then((response) => {
                // Create a blob object from the response data
                const blob = new Blob([response.data], {
                    type: response.headers['content-type'],
                })

                // Create a URL for the blob
                const blobUrl = window.URL.createObjectURL(blob)

                // Create an anchor element
                const downloadLink = document.createElement('a')
                downloadLink.href = blobUrl
                downloadLink.download = filename // Specify the desired file name

                // Trigger a click on the anchor to prompt the download
                downloadLink.click()

                // Revoke the URL to free up resources
                window.URL.revokeObjectURL(blobUrl)
                showNotification('Document successfully downloaded', 'success')
            })
            .catch((error) => {
                showNotification(
                    'Error occurred while downloading document',
                    'error'
                )
            })
        // }
    }

    const handleDeleteDocument = (params: any, event: any) => {
        setSelectedDocument(params.row)
        setConfirmDialogOpen(true)
    }

    const onDeleteDocument = () => {
        setConfirmDialogOpen(false)

        if (selectedDocument) {
            deleteDocument()
                .then(() => {
                    showNotification('Document successfully deleted', 'success')
                    // Remove the deleted document from fetchedDocuments
                    if (fetchedDocuments) {
                        const updatedDocuments = fetchedDocuments.filter(
                            (Document: IDocument) =>
                                Document.id !== selectedDocument.id
                        )
                        setDocuments(updatedDocuments)
                    }
                })
                .catch((error) => {
                    showNotification(
                        'Error occurred while deleting document',
                        'error'
                    )
                })
        } else {
            console.warn('No document selected.')
        }
    }

    const renderDocumentActions = (props: any) => {
        return (
            <React.Fragment>
                <Tooltip title={`Download document ${props.row.blogPostId}`}>
                    <IconButton
                        data-test="document-download-button"
                        onClick={(event) =>
                            handleDocumentDownload(props, event)
                        }
                    >
                        <EditIcon aria-label="edit" color="primary" />
                    </IconButton>
                </Tooltip>
                <Tooltip title={`Delete document ${props.row.id}`}>
                    <IconButton
                        data-test="document-delete-button"
                        onClick={(event) => handleDeleteDocument(props, event)}
                    >
                        <DeleteIcon aria-label="delete" color="error" />
                    </IconButton>
                </Tooltip>
            </React.Fragment>
        )
    }

    const documentsDataGridColumns: any = [
        { field: 'filename', headerName: 'filename', flex: 3 },
        { field: 'createdAt', headerName: 'Created At', flex: 1 },
        {
            field: ' ',
            headerName: 'Actions',
            flex: 1,
            renderCell: renderDocumentActions,
        },
    ]

    return (
        <React.Fragment>
            <Container
                data-testid="admin-documents-list-content"
                maxWidth="lg"
                component="main"
                sx={{ pt: 0, pb: 8 }}
            >
                <H1 variant="h3" data-testid="page-heading">
                    {title}
                </H1>
                <div data-test="data-grid" style={{ width: '100%' }}>
                    <DataGrid
                        autoHeight={true}
                        rows={documents}
                        columns={documentsDataGridColumns}
                        pagination
                        getRowId={(row) => row.id}
                        rowsPerPageOptions={[5, 10, 20, 50, 100]}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) =>
                            setPageSize(newPageSize)
                        }
                        sx={{ mt: 6, backgroundColor: 'background.paper' }}
                    />
                </div>
                <ConfirmDialog
                    id="delete-confirm-dialog"
                    title="Delete Blog Post"
                    open={confirmDialogOpen}
                    onConfirm={onDeleteDocument}
                    onClose={() => setConfirmDialogOpen(false)}
                >
                    {selectedDocument && (
                        <div>
                            <Typography
                                data-testid="delete-confirm-message"
                                variant="body1"
                                gutterBottom
                            >
                                Are you sure you want to delete this document?
                            </Typography>
                            <Typography
                                data-testid="delete-confirm-id"
                                variant="body1"
                                gutterBottom
                            >
                                <strong>
                                    ID: {selectedDocument.documentId}
                                </strong>
                            </Typography>
                            <Typography
                                data-testid="delete-confirm-created-by"
                                variant="body1"
                                gutterBottom
                            >
                                <strong>{selectedDocument.createdBy}</strong>
                            </Typography>
                        </div>
                    )}
                </ConfirmDialog>
                <NotificationComponent />
            </Container>
            <AdminFooter />
        </React.Fragment>
    )
}

export default DocumentsList
