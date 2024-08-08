

interface title{
  title : string
}

const Header = ({ title } : title) => {

    console.log('header component rendered');
    

  return (
    <nav className=
    "flex sticky items-center px-5 justify-between w-full top-0 h-16 z-50  border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <h1 className="text-xl text-white font-semibold">{title}</h1>
    
      
    </nav>
  );
}

export default Header;
