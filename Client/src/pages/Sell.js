import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import { useHistory } from 'react-router-dom'

var ENDPOINT = "http://127.0.0.1:5000/";

// if (true || process.env.NODE_ENV === "production") {
//     ENDPOINT = `https://homes-sweet-homes.herokuapp.com/`
// }

const useStyles = makeStyles((theme) => ({
    field: {
        marginTop: 30,
        marginBottom: 30,
        width: '100%',
        display: 'block'
    },
}))

export default function Sell() {
    const classes = useStyles()
    const history = useHistory()
    const [location, setLocation] = React.useState('');
    const [desc, setDesc] = useState('')
    const [locerror, setLocerror] = useState(false)
    const [sqft, setSqft] = useState(0)
    const [bhk, setBhk] = useState(0)
    const [price, setPrice] = useState(0)
    const [priceError, setPriceError] = useState(false)
    const [sqftError, setSqftError] = useState(false)
    const [bhkError, setBhkError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setBhkError(false)
        setSqftError(false)
        setLocerror(false)
        setPriceError(false)
        if (bhk <= 0) {
            setBhkError(true)
        }
        if (sqft <= 0) {
            setSqftError(true)
        }
        if (location === '') {
            setLocerror(true)
        }
        if (price <= 0) {
            setPriceError(true)
        }

        if (bhk > 0 && sqft > 0 && location !== '' && price > 0) {
            fetch(`https://ho-m-ify.herokuapp.com/sell`, {
                method: 'POST',
                // mode: 'cors',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bhk, price, sqft, location, desc })
            }).then(() => history.push('/HomeSweetHomeClient'))
                .catch(err => {
                    console.log(err);
                })
        }
    }

    return (
        <Container size="sm">
            <Typography
                variant="h6"
                color="textSecondary"
                component="h2"
                gutterBottom
            >
                Enter Property Details
            </Typography>

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField className={classes.field}
                    onChange={(e) => setLocation(e.target.value)}
                    label="Location"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    required
                    error={locerror}
                />
                <TextField className={classes.field}
                    onChange={(e) => setPrice(e.target.value)}
                    label="Price"
                    variant="outlined"
                    color="secondary"
                    type="number"
                    fullWidth
                    required
                    InputProps={{ inputProps: { min: 100000 } }}
                    error={priceError}
                />
                <TextField className={classes.field}
                    onChange={(e) => setSqft(e.target.value)}
                    label="Size in Square Feet"
                    variant="outlined"
                    color="secondary"
                    type="number"
                    fullWidth
                    required
                    InputProps={{ inputProps: { min: 10 } }}
                    error={sqftError}
                />
                <TextField className={classes.field}
                    onChange={(e) => setBhk(e.target.value)}
                    label="BHK"
                    variant="outlined"
                    color="secondary"
                    type="number"
                    fullWidth
                    InputProps={{ inputProps: { min: 1 } }}
                    required
                    error={bhkError}
                />
                <TextField className={classes.field}
                    onChange={(e) => setDesc(e.target.value)}
                    label="Description..."
                    variant="outlined"
                    color="secondary"
                    multiline
                    rows={4}
                    fullWidth
                    required
                />
                <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    fullWidth>
                    Submit
        </Button>
            </form>
        </Container>
    )
}
