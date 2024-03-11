import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
 
export default function AdminMenu({ showStatus, setShowStatus}) {

  return (
    <div className="">
      
  
    <Menu>
      <MenuHandler>
        <Button className="px-[10vw]">Status</Button>
      </MenuHandler>
      <MenuList>
        <MenuItem onClick={()=> setShowStatus("pending")}>Pending</MenuItem>
        <MenuItem onClick={()=> setShowStatus("verified")}>Verified</MenuItem>
        <MenuItem onClick={()=> setShowStatus("not-verified")}>Not Verified</MenuItem>
      </MenuList>
    </Menu>
    </div>
  );
}