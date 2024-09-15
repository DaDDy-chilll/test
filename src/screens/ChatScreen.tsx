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
      className=' w-full h-[calc(100vh-65px)] grid grid-cols-8 grid-rows-9 gap-0'>
        <div className='bg-blue-500 col-span-2 row-span-9'>1</div>
        <div className='bg-green-500 col-start-3 col-end-9 row-start-1 row-end-2'>2</div>
        <div className='bg-yellow-500 col-start-3 col-end-9 row-start-2 row-end-9'>3</div>
        <div className='bg-red-500 col-start-3 col-end-9 row-start-9 row-end-10'>4</div>
      </motion.div>
    </Layout>
  )
}

const chatVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};
export default ChatScreen;