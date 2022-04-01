import React, { useState, useEffect } from 'react'
import { motion, Reorder, useDragControls } from "framer-motion";
import { ReorderIcon } from "./Icon.jsx";
import { Box, Text } from '@chakra-ui/react';
import UserDetails from './Settings Compoments/UserDetails.jsx';

function Settings() {
    const dragControls = useDragControls();
    const initialItems = ['User Details', "Password", "Logout"];
    const [items, setItems] = useState(initialItems);
    const [choice, setChoice] = useState('')

    useEffect(() => {
        setChoice('')
      }, []);

    function chooseOption(choice) {
        setChoice(choice)
    }

    return (
        <>
        { choice === 'User Details' ? <> <UserDetails /> </>: <></> }
        { choice === 'Password' ? <> </> : <></> }
        { choice === 'Logout' ? <> </> : <></> }
        { choice === '' ? 
        <Box py={'10'} display={'inline-flex'} flexDirection={'column'} w={'100%'}>
            <Reorder.Group axis="y" onReorder={setItems} values={items}>
                {items.map((item) => (
                    <Reorder.Item
                        key={item}
                        value={item} 
                        name={item}
                        dragListener={true}
                        dragControls={dragControls}
                        style={{ background: 'rgba(214, 214, 214, 0.5)'}}
                        // While Drag nous permet de donner un style à son enfant
                        whileDrag={{ scale: 1.1 }}
                    >
                        <motion.div whileTap={{fontSize: '3x1'}}>
                            <Text fontFamily={'sans-serif'} fontSize={'2x1'} fontWeight={'semibold'} onClick={() => chooseOption(item)}>{item}</Text>
                        </motion.div>
                        <Box pl={'97%'} pb={'5'}>
                            <ReorderIcon dragControls={dragControls} />
                        </Box>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </Box>
        : <></> }
        </>
    );
}

export default Settings