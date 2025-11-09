import Image from "next/image";


const MyReservationsPage = () => {
    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
                <h1 className="my-6 text-2xl">
                    My Reservations
                </h1>
                <div className="space-y-4">
                    <div className="p-5 grid grid-cols-1 md:grid-cols-4 shadow-md border border-gray-300 rounded-xl">
                        <div className="col-span-1">
                            <div className="relative overflow-hidden aspect-square rounded-xl">
                                <Image
                                    fill
                                    src="/beach_1.jpg"
                                    className="hover:scale-110 object-cover transition h-full w-full"
                                    alt="beach house"
                                />
                            </div>
                        </div>
                       <div className="col-span-1 md:col-span-3 pl-6">
                            <h2 className="mb-4 text-xl">Property Name</h2>

                            <p className="mb-2"><strong>Check in date:</strong> 14/2/2024</p>
                            <p className="mb-2"><strong>Check out date:</strong> 16/2/2024</p>

                            <p className="mb-2"><strong>Number of nights:</strong> 2</p>
                            <p className="mb-2"><strong>Total Price:</strong> $200</p>

                            <div className="cursor-pointer inline-block mt-6 py-4 px-6 bg-airbnb text-white rounded-xl">
                                Go To Property
                            </div>
                        </div>
                    </div>
                    <div className="p-5 grid grid-cols-1 md:grid-cols-4 shadow-md border border-gray-300 rounded-xl">
                        <div className="col-span-1">
                            <div className="relative overflow-hidden aspect-square rounded-xl">
                                <Image
                                    fill
                                    src="/beach_1.jpg"
                                    className="hover:scale-110 object-cover transition h-full w-full"
                                    alt="beach house"
                                />
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-3 pl-6">
                            <h2 className="mb-4 text-xl">Property Name</h2>

                            <p className="mb-2"><strong>Check in date:</strong> 14/2/2024</p>
                            <p className="mb-2"><strong>Check out date:</strong> 16/2/2024</p>

                            <p className="mb-2"><strong>Number of nights:</strong> 2</p>
                            <p className="mb-2"><strong>Total Price:</strong> $200</p>

                            <div className="cursor-pointer inline-block mt-6 py-4 px-6 bg-airbnb text-white rounded-xl">
                                Go To Property
                            </div>
                        </div>
                    </div>
                </div>
        </main>
    );
};

export default MyReservationsPage;