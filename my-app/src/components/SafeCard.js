import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { Tick } from 'react-crude-animated-tick';

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
    background: 'linear-gradient(90deg, rgba(3,82,11,1) 0%, rgba(32,197,60,1) 28%, rgba(82,216,105,1) 100%)',
    //background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(63,81,176,1) 35%, rgba(100,116,202,1) 100%)',
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

export const SafeCard = React.memo(function BlogCard() {
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
        image="../safe.png"
      />
      
      <CardContent>
        <TextInfoContent
          classes={contentStyles}
          overline={'15 APRIL 2021'}
          heading={'Safe URL :'}
        />

      <Tick size={200} />
      <TextInfoContent
          classes={contentStyles}
         
          heading={'No Phishing Detected :-)'}
        />
       
      </CardContent>
    </Card>
  );
});

export default SafeCard;