import React from 'react'

import { IImage } from '@/common/generic.interface'
import { Grid } from '@mui/material'

interface IBlogGalleryProps {
    images: IImage[]
    cols?: number
    spacing?: number
}

const ImageGallery = (props: IBlogGalleryProps) => {
    const { images, cols = 4, spacing = 2 } = props

    return (
        <React.Fragment>
            <Grid container={true} spacing={spacing}>
                {images.map((image) => (
                    <Grid
                        key={image.url}
                        data-test="blog-gallery"
                        item={true}
                        xs={12}
                        md={cols}
                    >
                        <img
                            src={`${image.url}`}
                            alt={image.title}
                            loading="lazy"
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    )
}

export default ImageGallery
