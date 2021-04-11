import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import HttpIcon from '@material-ui/icons/Http';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    margin: 'auto',
    borderRadius: spacing(2), // 16px
    transition: '0.3s',
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    position: 'relative',
    maxWidth: '90%',
    marginLeft: 'auto',
    overflow: 'initial',
    background: 'linear-gradient(90deg, rgba(128,14,6,1) 0%, rgba(242,59,46,1) 28%, rgba(246,104,94,1) 100%)',
    //background: 'linear-gradient(90deg, rgba(128,14,6,1) 0%, rgba(242,59,46,1) 28%, rgba(255,17,0,1) 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: spacing(2),
    [breakpoints.up('md')]: {
      flexDirection: 'row',
      paddingTop: spacing(2),
    },
  },
  media: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: spacing(-3),
    height: 0,
    paddingBottom: '48%',
    borderRadius: spacing(2),
    backgroundColor: '#fff',
    position: 'relative',
    [breakpoints.up('md')]: {
      width: '100%',
      marginLeft: spacing(-3),
      marginTop: 0,
      transform: 'translateX(-8px)',
    },
    '&:after': {
      content: '" "',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      // backgroundImage: 'linear-gradient(147deg, #fe8a39 0%, #fd3838 74%)',
      //backgroundImage: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(214,242,255,1) 28%, rgba(0,212,255,1) 48%);',
      borderRadius: spacing(2), // 16
      opacity: 0.5,
    },
  },
  content: {
    padding: 24,
  },
  cta: {
    marginTop: 24,
    textTransform: 'initial',
  },
  margin: {
    margin: spacing(2),
  },
}));

export const ThreatCard = React.memo(function BlogCard() {
  const styles = useStyles();
  const {
    button: buttonStyles,
    ...contentStyles
  } = useBlogTextInfoContentStyles();
  const shadowStyles = useOverShadowStyles();
  
  
  return (
    <Card className={cx(styles.root, shadowStyles.root)} >
      <CardMedia
        className={styles.media}
        image="../threat.png"
      />
      
      <CardContent className={styles.margin}>
        <TextInfoContent
          classes={contentStyles}
          overline={'15 APRIL 2021'}
          heading={'Phishing URL :'}
        />
      <ErrorOutlineIcon style={{ fontSize: 200 }} color="secondary" />
     
      <TextInfoContent
          classes={contentStyles}
         
          heading={'DO NOT OPEN !'}
        />
       
      </CardContent>
    </Card>
  );
});

export default ThreatCard;