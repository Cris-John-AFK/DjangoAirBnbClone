import Image from "next/image";

const PropertyListItem = () => {
    return (
        <div className="cursor-pointer">
            <div className="relative overflow-hidden aspect-square rounded-xl">
                <Image
                    fill
                    src="/beach_1.jpg"
                    sizes="(max-width: 768px) 768px, (max-width: 1200px) 768px, 768px"
                    alt="Beach house"
                    className="hover:scale-110 object-cover transition h-full w-full"
                />
            </div>
            <div className="mt-2">
                <p className="text-lg font-bold">Property name</p>
            </div>
            <div className="mt-2">
                <p className="text-sm text-gray-500"><strong>$200</strong> per night</p>
            </div>
        </div>
    )
}
export default PropertyListItem