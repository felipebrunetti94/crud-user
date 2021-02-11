import "react-toastify/dist/ReactToastify.css";
import BeneficiaryPage from "./view/BeneficiaryPage";
import { ToastContainer } from "react-toastify";
import { AppBar } from "@material-ui/core";

function App() {
  return (
    <div className="App">
      {/* <AppBar>!!!Transfera</AppBar> */}
      <BeneficiaryPage />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
