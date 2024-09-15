import Layout from '@/layouts/Layout'
import { motion } from 'framer-motion';


const MessageScreen = () => {
  return (
    <Layout>
    <motion.div
    variants={messageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className='bg-gray-500 w-full min-h-screen'>Screen</motion.div>
    </Layout>
  )
}

const messageVariants = {
  initial: { opacity: 0},
  animate: { opacity: 1,transition: { duration: 0.2 } },
  exit: { opacity: 0,transition: { duration: 0.2 } },
};
export default MessageScreen