import React, { useState, useEffect, PureComponent } from 'react'
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { Box, Container } from '@chakra-ui/react';
import Counter from '../Graphs/Counter.jsx';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
import GaugeChart from 'react-gauge-chart'
import './css/Main.css'

export default function Home() {

    const [ currentUser, setCurrentUser ] = useState('');
    const numberOfOrdersCompleted = currentUser.totalOrdersAssignedCompleted;
    const numberOfOrdersAssigned = currentUser.totalOrdersAssigned;
    
    useEffect(() => {
        const currentUserJSONFormat = localStorage.getItem("currentEmployee")
        const currentUser = JSON.parse(currentUserJSONFormat)
        setCurrentUser(currentUser)
      }, []);   
    return (
      <AnimateSharedLayout>
        <motion.ul layout initial={{ borderRadius: 25 }}>
          {items.map(item => (
            <Item key={item} />
          ))}
        </motion.ul>
      </AnimateSharedLayout>
    );
  }
  
  function Item() {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleOpen = () => setIsOpen(!isOpen);
  
    return (
      <motion.li layout onClick={toggleOpen} initial={{ borderRadius: 10 }}>
        <motion.div className="avatar" layout />
        <AnimatePresence>{isOpen && <Content />}</AnimatePresence>
      </motion.li>
    );
  }
  
  function Content() {
    return (
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="row" />
        Option 1
        <div className="row" />
        Option 2
        <div className="row" />
        Option 3
      </motion.div>
    );
  }
  
  const items = [0, 1, 2];
  