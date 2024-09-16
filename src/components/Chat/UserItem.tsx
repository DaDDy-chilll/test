
type UserItemProps = {
  user: {
    avatar: string;
    name: string;
    message: string;
  }
}

const UserItem = ({user}: UserItemProps) => {
  return (
    <div className='flex items-center gap-3 mx-2 py-5 border-b border-gray-300'>
      <div className='w-10 h-10 rounded-full overflow-hidden'>
        <img src={user.avatar} alt={user.name} />
      </div>
      <div className='flex flex-col gap-1'>
        <p className='font-bold text-sm'>{user.name}</p>
        <p className='text-xs text-gray-500'>{user.message}</p>
      </div>
    </div>
  )
}

export default UserItem;
