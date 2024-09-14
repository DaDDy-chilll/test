import Layout from '@/layouts/Layout';
import { motion } from 'framer-motion';

const MatchedScreend = () => {
  return (
    <Layout>
      <motion.div
      variants={matchedVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className='bg-purple-500 w-full min-h-screen'>MatchedScreend</motion.div>
    </Layout>
  )
}

const matchedVariants = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -100 },
};

export default MatchedScreend