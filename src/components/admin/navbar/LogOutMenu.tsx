import * as React from 'react';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import routes from '@/navigations/routes';
// export type LogOutMenuProps = {
//   open: boolean;
//   setOpen
// }
const LogOutMenu = ({open,setOpen,setIsAdmin}:any)=>{
    const anchorRef = React.useRef<HTMLButtonElement>(null);
  
    const navigate = useNavigate();

    const handleToggle = () => {
      setOpen((open:boolean) => !open);
    };
  // Log Out Action
    const logOutAction = ()=>{
      setIsAdmin(false);
      localStorage.setItem("isAdmin","");
      localStorage.setItem("token","");
      navigate(routes.USER.TOP_PAGE);
    }
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current!.focus();
      }
  
      prevOpen.current = open;
    }, [open]);
    return  <Stack direction="row" spacing={2} className='absolute top-[51px] -right-[15px]'>
    <Paper>
      <MenuList>
        <MenuItem>Admin</MenuItem>
        <MenuItem onClick={logOutAction}>
          <div  className="text-red-500">Logout</div>          
        </MenuItem>
      </MenuList>
    </Paper>
    <div>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        onClick={handleToggle}
      >
        {/* {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={()=>console.log("it works")}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )} */}
      </Popper>
    </div>
  </Stack>
}
export default LogOutMenu;