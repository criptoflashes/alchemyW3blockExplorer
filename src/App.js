import { Alchemy, Network } from "alchemy-sdk";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import Block from "./components/Block";
import "./App.css";
import BlockInfo from "./Pages/BlockInfo";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  return (
    <div>
      {/*  <Navbar></Navbar> */}
      <BrowserRouter>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/block/:id" component={BlockInfo}></Route>
      </BrowserRouter>
    </div>
  );
}
export default App;
