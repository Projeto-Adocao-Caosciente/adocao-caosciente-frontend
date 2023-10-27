export function fileToBase64(
    file: File,
    onload: (base64: string) => void,
    onerror?: (error: ProgressEvent<FileReader>) => void
): void {
    const reader = new FileReader()

    reader.onload = () => {
        const base64 = reader.result as string
        onload(base64)
    }

    reader.onerror = (error) => {
        if (onerror) {
            onerror(error)
        }
    }

    reader.readAsDataURL(file)
}
