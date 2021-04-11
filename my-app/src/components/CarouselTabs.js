import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {  Button } from '@material-ui/core'
import PageCard from './PageCard';
import SafeCard from './SafeCard';
import ThreatCard from './ThreatCard';

export default function CarouselTabs(props)
{   const[state , setState] = React.useState(1)
    
    function changeIndex(){
        setState(1)
    }
    return (
        <div>
        <Carousel animation="fade" index={state} autoPlay={false}>

            <SafeCard key={0} />
            <PageCard key={1} changeResult={setState} url={""} checked={props.checked} />
            <ThreatCard key={2} />

        </Carousel>
        
        <Button onClick={changeIndex} align="center">Home</Button>
        </div>
    )
}

