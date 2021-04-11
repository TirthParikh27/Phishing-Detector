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
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import HttpIcon from '@material-ui/icons/Http';

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
    background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(63,81,181,1) 28%), rgba(214,242,255,1) 100%;',
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

export const PageCard = React.memo(function BlogCard(props) {
  const styles = useStyles();
  const [state , setState] = React.useState({url:props.url , result: "" })
  const {
    button: buttonStyles,
    ...contentStyles
  } = useBlogTextInfoContentStyles();
  const shadowStyles = useOverShadowStyles();
  
  const myChangeHandler = (event) => {
    setState({url: event.target.value});
  }
  const onSubmit = url => {
    var obj = {};
    obj['url'] = state.url
    console.log(obj)
    if(props.checked){
      fetch('/detect', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }).then(response =>{
        if(response.ok){
        return response.json()
        }
    }).then(data=>{
      console.log(data)
      //setState({result : data.result})
      if(data.result === 0){
        props.changeResult(2)
      } else if(data.result === 1){
        props.changeResult(0)
      }
      
    })
  } else {
    fetch('/detectOffline', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
  }).then(response =>{
      if(response.ok){
      return response.json()
      }
  }).then(data=>{
    console.log(data)
    //setState({result : data.result})
    if(data.result === 0){
      props.changeResult(2)
    } else if(data.result === 1){
      props.changeResult(0)
    }
    
  })

  }
    
          
}
  return (
    <Card className={cx(styles.root, shadowStyles.root)}>
      <CardMedia
        className={styles.media}
        image="../main_hack2.png"
      />
      
      <CardContent>
        <TextInfoContent
          classes={contentStyles}
          overline={'15 APRIL 2021'}
          heading={'Enter a URL'}
          
        />
        <TextField
        className={styles.margin}
        id="input-with-icon-textfield"
        label="URL"
        color="success"
        onChange={myChangeHandler}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <HttpIcon />
            </InputAdornment>
          ),
        }}
      />
        <Button className={buttonStyles} onClick={onSubmit}><b>SCAN</b></Button>
        <b>{state.result}</b>
      </CardContent>
    </Card>
  );
});

export default PageCard;