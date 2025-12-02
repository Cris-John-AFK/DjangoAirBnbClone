import Image from "next/image";

interface CategoriesProps {
    dataCategory: string;
    setCategory: (category: {category: string}) => void;
}

const Categories: React.FC<CategoriesProps> = ({
    dataCategory,
    setCategory
}) => {
    return (
        <>
            <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
                <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
                    <div 
                        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 opacity-60 hover:border-gray-200 hover:opacity-100 ${dataCategory === 'Beach' ? 'border-gray-800' : 'border-white'}`}
                        onClick={() => setCategory({category: 'Beach'})}
                    >
                        <Image
                            src="/icn_category_beach.jpeg"
                            alt="Category - Beach"
                            width={20}
                            height={20}
                        />
                        <span className="text-xs">Beach</span>
                    </div>
                    <div 
                        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 opacity-60 hover:border-gray-200 hover:opacity-100 ${dataCategory === 'Villas' ? 'border-gray-800' : 'border-white'}`}
                        onClick={() => setCategory({category: 'Villas'})}
                    >
                        <Image
                            src="/icn_category_beach.jpeg"
                            alt="Category - Beach"
                            width={20}
                            height={20}
                        />
                        <span className="text-xs">Villas</span>
                    </div>
                    <div 
                        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 opacity-60 hover:border-gray-200 hover:opacity-100 ${dataCategory === 'Cabins' ? 'border-gray-800' : 'border-white'}`}
                        onClick={() => setCategory({category: 'Cabins'})}
                    >
                        <Image
                            src="/icn_category_beach.jpeg"
                            alt="Category - Beach"
                            width={20}
                            height={20}
                        />
                        <span className="text-xs">Cabins</span>
                    </div>
                    <div 
                        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 opacity-60 hover:border-gray-200 hover:opacity-100 ${dataCategory === 'Tiny homes' ? 'border-gray-800' : 'border-white'}`}
                        onClick={() => setCategory({category: 'Tiny homes'})}
                    >
                        <Image
                            src="/icn_category_beach.jpeg"
                            alt="Category - Beach"
                            width={20}
                            height={20}
                        />
                        <span className="text-xs">Tiny homes</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Categories;