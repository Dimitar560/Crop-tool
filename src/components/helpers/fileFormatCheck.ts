// Checks the file format
export default function fileFormatCheck(uploadFormat: string, acceptedFormatArr: string[]) {
    const formatCheck = acceptedFormatArr.filter((x) => x === uploadFormat);

    if (formatCheck.length > 0) {
        return true;
    } else {
        return false;
    }
}
