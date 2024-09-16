import Layout from '@/layouts/Layout';
import { motion } from 'framer-motion';
import UserItem from '@/components/Chat/UserItem';
import { jp } from '@/lang/jp';

const ChatScreen = () => {


  const users = [
    {
      avatar: 'https://via.placeholder.com/150',
      name: 'John Doe',
      message: 'Hello, how are you?',
    },
    {
      avatar: 'https://via.placeholder.com/150',
      name: 'John Doe',
      message: 'Hello, how are you?',
    },
    {
      avatar: 'https://via.placeholder.com/150',
      name: 'John Doe',
      message: 'Hello, how are you?',
    },
  ];

  return (
    <Layout>
      <motion.div
      variants={chatVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className=' w-full h-[calc(100vh-65px)] grid grid-cols-8 grid-rows-9 gap-0.5 p-3'>

        {/* User Lists View */}
        <div className='bg-gray-100 col-span-2 row-span-9 '>
          {users.map((user) => (
            <UserItem key={user.name} user={user} />
          ))}
        </div>

        {/* Header View */}
        <div className='bg-gray-100 col-start-3 col-end-9 row-start-1 row-end-2'>
          <div className='flex items-center justify-between w-full h-full px-4 py-3'>
            <h1 className='text-normal font-bold'>Name</h1>
            <button className='bg-gray-500 text-sm text-white px-3 py-2 rounded-md'>Interview Schedule</button>
          </div>
        </div>

        {/* Chat View */}
        <div className='bg-gray-100 col-start-3 col-end-9 row-start-2 row-end-9 relative'>
          <div></div>
          <div className='absolute top-2 right-2 flex items-center gap-2'>
            <button className='bg-secondaryColor text-sm text-white px-3 py-2 rounded-md'>{jp.aiChat}</button>
            <button className='bg-secondaryColor text-sm text-white px-3 py-2 rounded-md'>{jp.adminHelp}</button>
          </div>
        </div>

        {/* Input View */}
        <div className='bg-gray-100 col-start-3 col-end-9 row-start-9 row-end-10'>
          <div className='flex items-center gap-2 w-full h-full px-4 py-3'>
            <input type="text" placeholder='Write a message...' className='w-full p-2 rounded-md bg-gray-300 text-sm' />
            <button className='bg-primaryColor text-sm text-white px-10 py-2 rounded-md'>Send</button>
          </div>
        </div>
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