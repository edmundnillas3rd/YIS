import { useEffect, useState } from "react";

interface PreviewClubAwardsModalProps {
    onClickCallback?: (data: any) => void;
}

export default function PreviewClubAwardsModal({ onClickCallback }: PreviewClubAwardsModalProps) {
    const [preview, setPreview] = useState<string>();
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/clubs/user-club-award`, {
            credentials: "include"
        })
            .then(response => response.json())
            .then((data: any) => {
                setPreview(data.dataPreview);

            });
    }, []);

    return <section className="flex justify-center items-center absolute z-10 bg-black bg-opacity-70 w-full h-full top-0 right-0">
        <section className="bg-white border border-zinc-400 rounded flex flex-col md:w-1/2 p-10 gap-2">
            <section className="flex justify-center">
                {preview && (
                    <p>
                        {preview}
                    </p>
                )}
                <button 
                    className="text-black hover:cursor-pointer font-bold"
                    onClick={onClickCallback}
                >X</button>
            </section>
        </section>
    </section>;
}