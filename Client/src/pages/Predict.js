import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useHistory } from 'react-router-dom'

var ENDPOINT = "http://127.0.0.1:5000/";

// if (true || process.env.NODE_ENV === "production") {
//     ENDPOINT = `https://homes-sweet-homes.herokuapp.com/`
// }

const data = ["1st block jayanagar", "1st phase jp nagar", "2nd phase judicial layout", "2nd stage nagarbhavi", "5th block hbr layout", "5th phase jp nagar", "6th phase jp nagar", "7th phase jp nagar", "8th phase jp nagar", "9th phase jp nagar", "aecs layout", "abbigere", "akshaya nagar", "ambalipura", "ambedkar nagar", "amruthahalli", "anandapura", "ananth nagar", "anekal", "anjanapura", "ardendale", "arekere", "attibele", "beml layout", "btm 2nd stage", "btm layout", "babusapalaya", "badavala nagar", "balagere", "banashankari", "banashankari stage ii", "banashankari stage iii", "banashankari stage v", "banashankari stage vi", "banaswadi", "banjara layout", "bannerghatta", "bannerghatta road", "basavangudi", "basaveshwara nagar", "battarahalli", "begur", "begur road", "bellandur", "benson town", "bharathi nagar", "bhoganhalli", "billekahalli", "binny pete", "bisuvanahalli", "bommanahalli", "bommasandra", "bommasandra industrial area", "bommenahalli", "brookefield", "budigere", "cv raman nagar", "chamrajpet", "chandapura", "channasandra", "chikka tirupathi", "chikkabanavar", "chikkalasandra", "choodasandra", "cooke town", "cox town", "cunningham road", "dasanapura", "dasarahalli", "devanahalli", "devarachikkanahalli", "dodda nekkundi", "doddaballapur", "doddakallasandra", "doddathoguru", "domlur", "dommasandra", "epip zone", "electronic city", "electronic city phase ii", "electronics city phase 1", "frazer town", "gm palaya", "garudachar palya", "giri nagar", "gollarapalya hosahalli", "gottigere", "green glen layout", "gubbalala", "gunjur", "hal 2nd stage", "hbr layout", "hrbr layout", "hsr layout", "haralur road", "harlur", "hebbal", "hebbal kempapura", "hegde nagar", "hennur", "hennur road", "hoodi", "horamavu agara", "horamavu banaswadi", "hormavu", "hosa road", "hosakerehalli", "hoskote", "hosur road", "hulimavu", "isro layout", "itpl", "iblur village", "indira nagar", "jp nagar", "jakkur", "jalahalli", "jalahalli east", "jigani", "judicial layout", "kr puram", "kadubeesanahalli", "kadugodi", "kaggadasapura", "kaggalipura", "kaikondrahalli", "kalena agrahara", "kalyan nagar", "kambipura", "kammanahalli", "kammasandra", "kanakapura", "kanakpura road", "kannamangala", "karuna nagar", "kasavanhalli", "kasturi nagar", "kathriguppe", "kaval byrasandra", "kenchenahalli", "kengeri", "kengeri satellite town", "kereguddadahalli", "kodichikkanahalli", "kodigehaali", "kodigehalli", "kodihalli", "kogilu", "konanakunte", "koramangala", "kothannur", "kothanur", "kudlu", "kudlu gate", "kumaraswami layout", "kundalahalli", "lb shastri nagar", "laggere", "lakshminarayana pura", "lingadheeranahalli", "magadi road", "mahadevpura", "mahalakshmi layout", "mallasandra", "malleshpalya", "malleshwaram", "marathahalli", "margondanahalli", "marsur", "mico layout", "munnekollal", "murugeshpalya", "mysore road", "ngr layout", "nri layout", "nagarbhavi", "nagasandra", "nagavara", "nagavarapalya", "narayanapura", "neeladri nagar", "nehru nagar", "ombr layout", "old airport road", "old madras road", "padmanabhanagar", "pai layout", "panathur", "parappana agrahara", "pattandur agrahara", "poorna pragna layout", "prithvi layout", "r.t. nagar", "rachenahalli", "raja rajeshwari nagar", "rajaji nagar", "rajiv nagar", "ramagondanahalli", "ramamurthy nagar", "rayasandra", "sahakara nagar", "sanjay nagar", "sarakki nagar", "sarjapur", "sarjapur  road", "sarjapura - attibele road", "sector 2 hsr layout", "sector 7 hsr layout", "seegehalli", "shampura", "shivaji nagar", "singasandra", "somasundara palya", "sompura", "sonnenahalli", "subramanyapura", "sultan palaya", "tc palaya", "talaghattapura", "thanisandra", "thigalarapalya", "thubarahalli", "thyagaraja nagar", "tindlu", "tumkur road", "ulsoor", "uttarahalli", "varthur", "varthur road", "vasanthapura", "vidyaranyapura", "vijayanagar", "vishveshwarya layout", "vishwapriya layout", "vittasandra", "whitefield", "yelachenahalli", "yelahanka", "yelahanka new town", "yelenahalli", "yeshwanthpur"]

const useStyles = makeStyles((theme) => ({
    field: {
        marginBottom: 30,
        display: 'block'
    },
    formControl: {
        minWidth: '100%',
        marginTop: 30,
        marginBottom: 30,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        height:100,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}))

export default function Create() {
    const history = useHistory()
    const classes = useStyles()
    const [selectError, setSelectError] = useState(false)
    const [location, setLocation] = React.useState('');
    const [sqft, setSqft] = useState(0)
    const [nobath, setNobath] = useState(0)
    const [bhk, setBhk] = useState(0)
    const [sqftError, setSqftError] = useState(false)
    const [nobathError, setNobathError] = useState(false)
    const [bhkError, setBhkError] = useState(false)
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = useState('')

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setLocation(event.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        setBhkError(false)
        setSqftError(false)
        setNobathError(false)
        setSelectError(false)
        if (bhk <= 0) {
            setBhkError(true)
        }
        if (sqft <= 0) {
            setSqftError(true)
        }
        if (location === '') {
            setSelectError(true)
        }
        if (nobath < 0) {
            setNobathError(true)
        }
        if (bhk > 0 && sqft > 0 && location !== '' && nobath >= 0) {
            fetch(`https://ho-m-ify.herokuapp.com/predict_home_price`, {
                method: 'POST',
                // mode: 'cors',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bhk, sqft, location, nobath })
            }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    setMsg(data['estimated_price'])
                    handleOpen()
                    // setTimeout(()=>{
                    //     history.push('/')
                    // },2000)
                })
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
                <FormControl variant="outlined" className={classes.formControl} >
                    <InputLabel id="demo-simple-select-outlined-label">Location *</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={location}
                        onChange={handleChange}
                        label="Location"
                        color="secondary"
                        required
                        error={selectError}
                    >
                        <MenuItem value="">
                            <em>--select--</em>
                        </MenuItem>
                        {
                            data.map(place => <MenuItem value={place}>{place}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                <TextField className={classes.field}
                    onChange={(e) => setSqft(e.target.value)}
                    label="Size in Square Feet"
                    variant="outlined"
                    color="secondary"
                    type="number"
                    required
                    InputProps={{ inputProps: { min: 10 } }}
                    error={sqftError}
                    fullWidth
                />
                <TextField className={classes.field}
                    onChange={(e) => setBhk(e.target.value)}
                    label="BHK"
                    variant="outlined"
                    color="secondary"
                    type="number"
                    InputProps={{ inputProps: { min: 1 } }}
                    required
                    error={bhkError}
                    fullWidth
                />
                <TextField className={classes.field}
                    onChange={(e) => setNobath(e.target.value)}
                    label="Number of Bathroom"
                    variant="outlined"
                    color="secondary"
                    InputProps={{ inputProps: { min: 0 } }}
                    type="number"
                    required
                    error={nobathError}
                    fullWidth
                />
                <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    fullWidth>
                    Submit
        </Button>
            </form>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">This could be your next house at just</h2>
                        <p id="transition-modal-description">₹ {msg} only</p>
                    </div>
                </Fade>
            </Modal>

        </Container>
    )
}
