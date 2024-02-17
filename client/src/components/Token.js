import React from 'react';
import Chip from '@mui/material/Chip';
import Grid from '@mui/system/Unstable_Grid';
import Box from '@mui/system/Box';

const Token = (props) => {
    const [termList, setTermList] = React.useState([]);

    React.useEffect(() => {
        setTermList(removeDuplicate(props.data));
    }, [props.data])

    const removeDuplicate = (terms) => {
        const uniqueTerms = []
        terms.forEach((t) => {
            if (uniqueTerms.indexOf(t) < 0) {
                uniqueTerms.push(t);
            }
        })

        return uniqueTerms.sort()
    }

    return (
        <Box
            sx={{
                height: 400,
                overflow: "hidden",
                overflowY: "scroll",
                overflowX: "scroll",
            }}
        >
            <Grid>
                {
                    termList.map((term, index) => {
                        return <Chip
                            key={index}
                            sx={{m: 0.5}}
                            label={term}
                            size="small"
                            onClick={() => props.setKeyword(term)}
                        />
                    })
                }
            </Grid>
        </Box>
    );
}
export default Token;