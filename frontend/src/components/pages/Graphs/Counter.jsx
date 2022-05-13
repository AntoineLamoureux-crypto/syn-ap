import { animate } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './css/Styles.css';

const progressVariants = (percent) => {
  return {
    initial: {
      width: 1000,
    },
    animate: {
      height: `${percent}px`,
      transition: {
        duration: 1,
      },
    },
  };
};

const progressContainerVariants = {
  initial: {
    y: 20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const appVariants = {
  initial: {
    x: -100,
  },
  animate: {
    x: 0,
    transition: {
      staggerChildren: 0.5,
      when: 'beforeChildren',
    },
  },
};

function Counter({ from, to, title, percent }) {
  const nodeRef = useRef();

  useEffect(() => {
    const node = nodeRef.current;
    const controls = animate(from, to, {
      duration: 1,
      onUpdate(value) {
        node.textContent = value.toFixed(0);
      },
    });

    return () => controls.stop();
  }, [from, to]);

  return (
    <>
      <motion.div
        className="App"
        variants={appVariants}
        initial="initial"
        animate="animate"
      >
        <motion.div
          className="progress-container"
          variants={progressContainerVariants}
        >
          <motion.div
            className="progress"
            variants={progressVariants(percent)}
          ></motion.div>
        </motion.div>
      </motion.div>
      <p ref={nodeRef} />
    </>
  );
}

export default Counter;
