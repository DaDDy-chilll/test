import { motion } from 'framer-motion';
import JobForm from '@/components/Jobs/JobForm';
import Loading from '@/components/ui/Loading';

const AddJobScreen = () => {
  return (
    <>
    {false && <Loading isLoading={false} className='h-[calc(100vh-68px)]' />}
      <motion.div
      variants={addJobVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className='w-full h-full flex justify-center items-center px-10'>
          <JobForm onBack={()=>{}} formVariant={addJobVariants} />
      </motion.div>
    </>

  )
}

const addJobVariants = {
  initial: { opacity: 0},
  animate: { opacity: 1,transition: { duration: 0.2 } },
  exit: { opacity: 0,transition: { duration: 0.2 } },
};

export default AddJobScreen;