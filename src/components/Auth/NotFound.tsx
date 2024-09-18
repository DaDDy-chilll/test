import notfound from "@/assets/images/notfound.svg"
import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-y-10">
        <img src={notfound} alt="not found" width={300} />
        <div className='flex flex-col items-center justify-center gap-y-4'>
        <h1 className='text-4xl font-normal text-secondaryColor'>Page Not Found.</h1>
        <p className='text-lg font-light text-gray-500'>Sorry, we couldn't find the page you're looking for.</p>
        <Link to="/login" className='bg-primaryColor text-white px-10 py-2 rounded-md'>Go to login</Link>
        </div>
    </div>
  )
}

export default NotFound