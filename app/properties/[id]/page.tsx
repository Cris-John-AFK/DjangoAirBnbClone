import Image from "next/image";
import ReservationSidebar from "./ReservationSidebar";
import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";
import Link from "next/link";


const PropertyDetailPage = async ({params}:{ params: Promise<{ id:string }> }) => {
    const resolvedParams = await params;
    const property = await apiService.get(`/api/properties/${resolvedParams.id}`)
    const userId = await getUserId();

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative">
                <Image
                    fill
                    src="/beach_1.jpg"
                    alt="beach house"
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="py-6 pr-6 col-span-3">
                    <h1 className="mb-4 text-4xl">{property.title}</h1>  
                    <span className="mb-6 block text-lg text-gray-600">
                        {property.guests} guest - {property.bedrooms} bedrooms - {property.bathrooms} bathroom
                    </span>
                    <hr />
                    <Link 
                        href={`/landlord/${property.landlord.id}`}
                        className="py-6 flex items-center space-x-4"
                    >
                        {property.landlord.avatar_url && (
                        <Image
                            src={property.landlord.avatar_url}
                            alt="the username"
                            width={50}
                            height={50}
                            className="rounded-full"
                        />
                    )}
                        <p><strong>{property.landlord.name}</strong> is your host</p>
                    </Link>
                    <hr />
                    <p className="mt-6 text-leg">
                       {property.description}
                    </p>
                </div>
                <ReservationSidebar
                    property={property}
                    userId={userId}
                />
            </div>
        </main>
    )
}

export default PropertyDetailPage;