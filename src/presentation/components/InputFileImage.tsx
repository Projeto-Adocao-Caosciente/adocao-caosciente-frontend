import React, { useState } from 'react'
import UploadIcon from '../assets/UploadIcon'

interface InputFileImageProps {
    handleImageUpload: (file: File) => void
}

export default function InputFileImage({ handleImageUpload }: InputFileImageProps) {
    const [controller, setController] = useState<boolean>(false)
    const [imgUrl, setImgUrl] = useState<string>('')
    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setImgUrl(URL.createObjectURL(file))
            handleImageUpload(file)
        }
    }
    const defaultCSS =
        'w-[210px] h-[210px] rounded-full border border-black flex justify-center items-center'
    return (
        <div className={`${defaultCSS} relative overflow-hidden object-cover`}>
            <img src={imgUrl} className="absolute w-[210px] h-[210px]" alt="" />
            {/* TODO: Tratar onMouseHover para dispositivos móveis (não deve ter) */}
            {(imgUrl === "" || controller) && (
                <div className="absolute w-[110px] h-[110px] rounded-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <UploadIcon height={75} width={75} />
                </div>
            )}
            <input
                type="file"
                className="cursor-pointer absolute top-0 left-0 w-[210px] h-[210px] opacity-0"
                onChange={handleUpload}
                onMouseEnter={() => setController(true)}
                onMouseLeave={() => setController(false)}
            />
        </div>
    )
}