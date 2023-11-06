import { useMediaQuery, Box, Drawer } from "@mui/material";
import Logo from "../shared/logo/Logo";
import SidebarItems from "./SidebarItems";
const Sidebar = function (_a) {
    const isMobileSidebarOpen = _a.isMobileSidebarOpen, onSidebarClose = _a.onSidebarClose, isSidebarOpen = _a.isSidebarOpen;
    const lgUp = useMediaQuery(function (theme) { return theme.breakpoints.up("lg"); });
    const sidebarWidth = "270px";
    if (lgUp) {
        return (<Box sx={{
                width: sidebarWidth,
                flexShrink: 0,
                backgroundColor:"#1d1f30"


            }} >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer anchor="left" open={isSidebarOpen} variant="permanent" PaperProps={{
                sx: {
                    width: sidebarWidth,
                    boxSizing: "border-box",
                    border: "0",
                    boxShadow: "rgba(113, 122, 131, 0.11) 0px 7px 30px 0px",
                    backgroundColor:"#1d1f30"

                },
            }}>
          {/* ------------------------------------------- */}
          {/* Sidebar Box */}
          {/* ------------------------------------------- */}
          <Box sx={{
                height: "100%",
            }} py={2}>
            {/* ------------------------------------------- */}
            {/* Logo */}
            {/* ------------------------------------------- */}
            <Box px={2}>
              <Logo />
            </Box>
            <Box>
              {/* ------------------------------------------- */}
              {/* Sidebar Items */}
              {/* ------------------------------------------- */}
              <Box mt={3}><SidebarItems /></Box>
            </Box>
          </Box>
        </Drawer>
      </Box>);
    }
    return (<Drawer anchor="left" open={isMobileSidebarOpen} onClose={onSidebarClose} variant="temporary" PaperProps={{
            sx: {
                width: sidebarWidth,
                boxShadow: function (theme) { return theme.shadows[8]; },
            },
        }}>
      {/* ------------------------------------------- */}
      {/* Logo */}
      {/* ------------------------------------------- */}
      <Box px={2} py={2}>
        <Logo />
      </Box>
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}
      <SidebarItems />
    </Drawer>);
};
export default Sidebar;
