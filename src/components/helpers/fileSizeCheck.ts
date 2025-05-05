// Checks the file size
export default function fileSizeCheck(uploadedFile: number, sizeLimit: number) {
    const convertedUplodedFile = uploadedFile / 1024 / 1024; // <-- convert to MB
    if (sizeLimit > convertedUplodedFile) {
        return true;
    } else {
        return false;
    }
}
