import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import ToggleSwitch from './ToggleSwitch.js';
import SecurityRoundedIcon from '@material-ui/icons/SecurityRounded';
import CarouselTabs from './CarouselTabs';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Tirth Parikh
      </Link>{' '}

      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
}));


export default function HomePage() {
  const classes = useStyles();
  const [state , setState] = React.useState(true)
  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <SecurityRoundedIcon fontSize="Large" className={classes.icon} />
          <Typography variant="h6" className={classes.title}>
            Phishing Detector
          </Typography>
          <ToggleSwitch checked={state} changeChecked={setState} />
        </Toolbar>
      </AppBar>
    </div>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="md">
            {/* <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Album layout
            </Typography> */}
           <CarouselTabs checked={state} />
            

          </Container>
        </div>
        
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Something Awesome !
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Made with an Attacker's Mindset at UNSW 💙
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}