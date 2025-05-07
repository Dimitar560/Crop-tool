// Helper text function
export default function helperFormatText(helperFormatArr: string[]) {
    return helperFormatArr.map((x) => x?.split("/")[1]).join(",");
}
