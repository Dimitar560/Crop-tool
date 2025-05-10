import "./App.css";
import { UploadFileProvider } from "./components/context/UploadFileProvider";
import CropImage from "./components/views/CropImage";
import "react-image-crop/dist/ReactCrop.css";

function App() {
    return (
        <>
            <UploadFileProvider>
                <CropImage />
            </UploadFileProvider>
        </>
    );
}

export default App;
