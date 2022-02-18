import React, { useState } from 'react'
import { Reorder, useDragControls } from "framer-motion";
import { FaHouseUser } from "react-icons/fa";
import { ReorderIcon } from "./Icon.jsx";

import { Box, Text } from '@chakra-ui/react';



function Settings() {
    const dragControls = useDragControls();
    const initialItems = ["Setting 1", "Setting 2", "Setting 3", "Setting 4"];
    const [items, setItems] = useState(initialItems);

    return (
        <>
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
                    >
                        <span>{item}</span>
                        <Box pl={'97%'} pb={'5'}>
                            <ReorderIcon dragControls={dragControls} />
                        </Box>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </Box>
        </>
    );
}

export default Settings