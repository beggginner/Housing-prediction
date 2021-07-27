import React, { useState, useEffect, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { createApi } from "unsplash-js";
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

var ENDPOINT = "http://127.0.0.1:5000/";

// if (true || process.env.NODE_ENV === "production") {
//     ENDPOINT = `https://homes-sweet-homes.herokuapp.com/`
// }

const api = createApi({
    accessKey: "_catYkCR4QcAID3tsjcibN0MCaxrGmfTN-evnRwCH8o"
});

const useStyles = makeStyles((theme) => ({
    main: {
        flexGrow: 1,
    },
    root: {
        maxWidth: '100%',
    },
    media: {
        height: 200,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const Main = () => {
    const classes = useStyles();
    const [urls, setUrls] = useState([])
    const [housedata, setHousedata] = useState([])
    useEffect(() => {
        fetch(`https://ho-m-ify.herokuapp.com/getproperty`, {
            method: 'GET',
            // mode: 'cors',
        }).then(res => res.json())
            .then(data => {
                setHousedata(data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        if (housedata.length > 0) {
            api.search.getPhotos({ query: "house", orientation: 'landscape', per_page: housedata.length })
                .then(result => {
                    setUrls(result.response.results)
                    console.log(result.response.results);
                })
                .catch(() => {
                    console.log("something went wrong!");
                })
        }
    }, [housedata])

    return (
        <>
            {
                urls.length > 0 &&
                (
                    <div className={classes.main}>
                        <Grid container spacing={3} align="center" justify = "center" alignItems = "center">
                                        {
                                            housedata.map((house, key) => {
                                                return (
                                                    <Grid item sm={12} md={6} lg={4} >
                                                        <Card className={classes.root}>
                                                            <CardActionArea>
                                                                <CardMedia
                                                                    className={classes.media}
                                                                    image={urls[key].urls.regular}
                                                                    title="Contemplative Reptile"
                                                                />
                                                                <CardContent>
                                                                    <Typography gutterBottom variant="h5" component="h2">
                                                                        Location - {house.location}
                                                                    </Typography>
                                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                                        Price - ₹ {house.price}
                                                                    </Typography>
                                                                    <Typography variant="body2" color="textSecondary" gutterBottom component="p">
                                                                        BHK - {house.bhk}
                                                                    </Typography>
                                                                </CardContent>
                                                            </CardActionArea>
                                                            <CardActions>
                                                                <Button size="small" color="primary">
                                                                    Buy
                                                    </Button>
                                                            </CardActions>
                                                        </Card>
                                                    </Grid>
                                                )
                                            })
                                        }

                        </Grid>
                    </div>
                )
            }
            {
                urls.length === 0 &&
                (
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        style={{ minHeight: '100vh' }}
                    >
                        <Grid item xs={3}>
                            <CircularProgress color="secondary" />
                        </Grid>

                    </Grid>
                )
            }
        </>
    );
}

export default Main;