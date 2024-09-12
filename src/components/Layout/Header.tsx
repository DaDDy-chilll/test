import { Avatar,AvatarFallback,AvatarImage } from "@radix-ui/react-avatar";
import { BellIcon} from '@heroicons/react/24/solid'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface title{
  title : string
}

const Header = ({ title } : title) => {

    console.log('header component rendered');
    

  return (
    <nav className=
    "flex sticky items-center px-5 justify-between w-full top-0 h-16 z-50  border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <h1 className="text-xl text-white font-semibold">{title}</h1>
      <div className="flex gap-5">
      <DropdownMenu>
  <DropdownMenuTrigger className=" z-50">

<BellIcon className="text-white w-5 h-5"/>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
      <Avatar className="w-10 h-10 rounded-full overflow-hidden">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            </div>
      
    </nav>
  );
}

export default Header;
