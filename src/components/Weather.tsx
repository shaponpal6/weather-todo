import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Moment from 'react-moment';

export default function Weather({item}: any) {
    return (
        <Box sx={{ minWidth: 275, margin: '10px' }}>
            <Card variant="outlined">
                <React.Fragment>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            <Moment format="LLLL">
                                {item.dt_txt || ""}
                            </Moment>
                        </Typography>
                        <Typography variant="h5" component="div">
                            {item.main.temp+"°C" || ""}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Feels like {item.main.feels_like+"°C" || ""}
                        </Typography>
                        <Typography variant="body2">
                            Maximum Temperature: {item.main.temp_max+"°C" || ""}
                            <br />
                            Minimum Temperature: {item.main.temp_min+"°C" || ""}
                            <br />
                            Humidity: {item.main.humidity+"%" || ""}
                        </Typography>
                    </CardContent>
                </React.Fragment>
            </Card>
        </Box>
    );
}
