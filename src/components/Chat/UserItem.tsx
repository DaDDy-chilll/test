
type UserItemProps = {
  user: {
    id: number;
    avatar: string;
    name: string;
    message: string;
  }
  handleClick: (id: number) => void;
}

const UserItem = ({user, handleClick}: UserItemProps) => {

  return (
    <div className='flex items-center gap-3 mx-2 border-b border-gray-300 cursor-pointer' onClick={() => handleClick(user.id)}>
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
