import { createContext } from "react";

const ColorModeContext = createContext({colorMode:'light',setColorMode:()=>{} });

const [colorMode,setColorMode] = useState('light');

export {colorMode, setColorMode };

export default ColorModeContext;