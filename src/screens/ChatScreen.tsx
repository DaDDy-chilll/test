import React from 'react'
import Layout from '@/layouts/Layout';
import { motion } from 'framer-motion';

const ChatScreen = () => {
  return (
    <Layout>
      <motion.div
      variants={chatVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className='bg-orange-500 w-full min-h-screen'>ChatScreen</motion.div>
    </Layout>
  )
}

const chatVariants = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -100 },
};
export default ChatScreen;