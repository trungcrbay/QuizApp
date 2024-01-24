'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import moment from "moment";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const HistoryUser = (props: any) => {
    const { historyData } = props;
    console.log("check data: ", historyData)
    const rowsData = historyData.data.map((item: any) => {
        return item;
    })

    // let utcTime = "2024-01-15T13:56:59.000Z";
    // var offset = moment().utcOffset();
    // var localText = moment.utc(utcTime).utcOffset(offset).format("L LT");
    // console.log("localText", localText)

    const convertToLocaleDate = (time: Date) => {
        let utcTime = time;
        var offset = moment().utcOffset();
        var localText = moment.utc(utcTime).utcOffset(offset).format("LT L");
        return localText;
    }

    return (
        <div style={{ marginTop: '100px' }}>
            <Container>
                <h2 style={{ marginBottom: '20px' }}>Your History Score</h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Quiz Id</StyledTableCell>
                                <StyledTableCell align="center">Quiz Name</StyledTableCell>
                                <StyledTableCell align="center">Quiz Description</StyledTableCell>
                                <StyledTableCell align="center">Total Questions</StyledTableCell>
                                <StyledTableCell align="center">Scores</StyledTableCell>
                                <StyledTableCell align="center">Finish Quiz</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rowsData.length > 0 ? rowsData.map((row: any) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell align="center">{row.quiz_id}</StyledTableCell>
                                    <StyledTableCell align="center">{row.quizHistory.name}</StyledTableCell>
                                    <StyledTableCell sx={{ width: '200px' }} component="th" scope="row">
                                        {row.quizHistory.description}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.total_questions}</StyledTableCell>
                                    <StyledTableCell align="center">{row.total_correct}</StyledTableCell>
                                    <StyledTableCell align="center">{convertToLocaleDate(row.updatedAt)}</StyledTableCell>
                                </StyledTableRow>
                            )) : <StyledTableRow >
                                <StyledTableCell colSpan={6} align="center" style={{padding:'0'}}>
                                    <img style={{width:'100%',height:'200px',objectFit:'contain'}} src='no_data.png'/>
                                </StyledTableCell>
                            </StyledTableRow>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    )
}

export default HistoryUser