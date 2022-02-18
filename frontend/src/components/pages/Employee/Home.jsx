import React, { useState, useEffect } from 'react'
import { Box } from '@chakra-ui/react';
import Counter from '../Graphs/Counter.jsx';



function Home() {
    const [ currentUser, setCurrentUser ] = useState('');
    const numberOfOrdersCompleted = currentUser.totalOrdersAssignedCompleted;
    const numberOfOrdersAssigned = currentUser.totalOrdersAssigned;
    
    useEffect(() => {
        const currentUserJSONFormat = localStorage.getItem("currentEmployee")
        const currentUser = JSON.parse(currentUserJSONFormat)
        setCurrentUser(currentUser)
      }, []);

    return (
        <>
        <Box py={'10'} display={'inline-flex'} flexDirection={'column'} w={'100%'}>
            <Counter from={0} to={numberOfOrdersCompleted} title={'Order Completed'} percent={numberOfOrdersCompleted * 10}/>
            <Counter from={0} to={numberOfOrdersAssigned} title={'Order Assigned'} percent={numberOfOrdersAssigned * 10}/>
        </Box>
        </>
    );
}

export default Home