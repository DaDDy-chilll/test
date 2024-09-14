import React from 'react'
import Layout from '@/layouts/Layout';
import { motion } from 'framer-motion';

const AddJobScreen = () => {
  return (
    <Layout>
      <motion.div
      variants={addJobVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className='bg-red-500 w-full min-h-screen'>AddJobScreen</motion.div>
    </Layout>
  )
}

const addJobVariants = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -100 },
};

export default AddJobScreen;