import { useState } from "react";
import { TextField, Grid, MenuItem, makeStyles, FormControl, FormGroup, FormLabel } from "@material-ui/core";
import SecondaryButton from "../ui-kit/SecondaryButton";
import { send } from '@emailjs/browser';

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inputStyle: {
    width: "100%",
    color: "#000000",
    padding: "10px"
  },
  labelStyle: {
    width: "100%",
    padding: "10px",
    fontSize: "1em",
    color: "var(--black)"
  },
  multilineInputStyle: {
    backgroundColor: "var(--dark-blue)",
    color: "var(--white)"
  },
  formStyle: {
    width: "800px",
    padding: "10px"
  },
  '@media (max-width: 480px)' : {
    formStyle: {
      maxWidth: "363px",
      padding: "10px"
    },
  },
});

const ContactForm = () => {
  const classes = useStyles();

  const [toSend, setToSend] = useState({
    from_name: "",
    reply_to: "",
    contact_type: "",
    message: ""
  })

  const handleChange = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value })
  }

  const SERVICE_ID = process.env.REACT_APP_SERVICE_ID
  const TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID
  const USER_ID = process.env.REACT_APP_USER_ID

  const handleFormSubmit = e => {
    e.preventDefault();
    send(
      SERVICE_ID, TEMPLATE_ID, toSend, USER_ID
    )
    .then((response) => {
      console.log('success', response.status, response.text)
      alert("Email Sent Successfully")
      // TODO: create custom pop up alert
    })
    .catch((error) => {
      console.log('failed', error)
      alert("ERROR. Please try again.")
      // TODO: create custom pop up alert
    })
  };

  const contactTypes = [
    {
      value: 'volunteer',
      label: 'Prospective Volunteer',
    },
    {
      value: 'benefactor',
      label: 'Prospective Benefactor',
    },
    {
      value: 'attorney',
      label: 'Attorney',
    },
    {
      value: 'partner',
      label: 'Prospective Partner',
    },
    {
      value: 'other',
      label: 'Other Individual/Organization',
    },
  ];
   
  return (
    <Grid
      container
      spacing={1}
      direction="column"
    >
      <form onSubmit={handleFormSubmit}>
        <FormControl  required  component="fieldset" className={classes.formStyle}>
          <FormLabel className={classes.labelStyle} component="legend">Name</FormLabel>
          <FormGroup>
            <TextField 
              id="standard-basic" 
              className={classes.inputStyle}
              label="Enter Your Full Name" 
              required
              name='from_name'
              value={toSend.from_name}
              onChange={handleChange}
              variant="outlined" 
            />
            <FormLabel className={classes.labelStyle} component="legend">Email</FormLabel>
            <TextField 
              id="standard-basic"
              className={classes.inputStyle}
              label="Enter Your Email Address" 
              type="email"
              required
              name='reply_to'
              value={toSend.reply_to}
              onChange={handleChange}
              variant="outlined" 
            />
            <FormLabel className={classes.labelStyle} component="legend">I am a(n)</FormLabel>
            <TextField
              id="outlined-select-currency"
              className={classes.inputStyle}
              select
              label="Please Select An Option"
              required
              name='contact_type'
              value={toSend.contact_type}
              onChange={handleChange}
              variant="outlined"
            >
              {contactTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <FormLabel className={classes.labelStyle} component="legend">Your Message</FormLabel>
            <TextField
              id="outlined-multiline-flexible"
              label="Type Your Message Here"
              className={classes.inputStyle}
              multiline
              minRows={4}
              maxRows={10}
              value={toSend.message}
              required
              name='message'
              onChange={handleChange}
              variant="outlined"
            />
            <SecondaryButton type={"submit"} text={"Send Message"}/>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  );
};

export default ContactForm;