import React, { useContext, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { Container, Typography } from '@mui/material'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'

import {
    API_URL_INFORMATION,
    APP_NAME,
    ApplicationContext,
} from '@/core/application'
import { useApiGet } from '@/core/api'
import Footer from '@/core/layout/Footer'
import { IInformation } from '@/common/models/information'
import { Heading, Paragraph, Section } from '@/components/data-display'

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}))

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}))

const Faq = () => {
    const [faqs, setFaqs] = useState<IInformation[]>([])
    const [expanded, setExpanded] = React.useState<string | false>('panel1')
    const title = 'Frequently Asked Questions'
    document.title = `${title} | ${APP_NAME}`

    const {
        data: fetchedFaqs,
        loading: getLoading,
        error: getError,
    } = useApiGet<any[]>(`${API_URL_INFORMATION}/?informationType=faq`, false)

    const { showLoading, hideLoading } = useContext(ApplicationContext)

    useEffect(() => {
        if (fetchedFaqs) {
            setFaqs(fetchedFaqs)
        }
    }, [fetchedFaqs])

    useEffect(() => {
        if (getLoading) {
            showLoading()
        } else {
            hideLoading()
        }
    }, [getLoading, hideLoading, showLoading])

    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false)
        }

    return (
        <>
            <Container id="faq-container" maxWidth="lg" component="main" sx={{ pt: 0, pb: 8 }}>
                <Section id="faq-section">
                    <Heading className="page-heading" data-testid="faq-heading">{title}</Heading>
                    <Paragraph data-testid="faq-introduction" sx={{ mb: 5 }}>
                        Explore our FAQ page for swift answers to common
                        queries. Whether you&#39;re new or returning, find solutions
                        to your questions across various categories. Need
                        further assistance? Contact our dedicated support team
                        for help.
                    </Paragraph>
                    {faqs && (
                        <>
                            {faqs.map((faq: IInformation) => (
                                <Accordion
                                    data-test="faq-accordian"
                                    key={faq.id}
                                    expanded={expanded === faq.informationId}
                                    onChange={handleChange(faq.informationId)}
                                >
                                    <AccordionSummary
                                        data-test="faq-accordian-summary"
                                        aria-controls="panel1d-content"
                                        id="panel1d-header"
                                    >
                                        <Typography>{faq.title}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails data-test="faq-accordian-details">
                                        <Typography>
                                            {faq.information}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </>
                    )}
                </Section>
            </Container>
            <Footer />
        </>
    )
}

export default Faq
