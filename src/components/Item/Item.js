import {styled} from "@mui/material/styles";
import {Paper} from "@mui/material";

export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '70vw',
    maxWidth: '800px',
    boxShadow: theme.shadows[3],
    fontFamily: 'sans-serif',
    fontSize: '25px',
    lineHeight: '40px',
}));