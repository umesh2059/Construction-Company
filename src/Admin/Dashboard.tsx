
import { useEffect} from "react";
import {supabase} from "@/lib/supabase";

const  Dashboard = ()=>{

    const testConnection= async()=>{
        const {data, error} = await supabase
            .from("careers")
            .select("*");


        console.log("Data:", data);
        console.log("Error:",error);
    };

    useEffect(()=>{
        testConnection();
    },[]);
    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold">
                Admin Dashboard
            </h1>

            <div className="grid md:grid-cols-3 gap-6 mt-10">
                <div className="bg-white shadow-lg rounded-xl p-6">
                    <h2 className="text-xl font-semibold">
                        Total Careers
                    </h2>
                    < p className="text-4xl font-bold mt-4">
                    3
                    </p>
                </div>
                <div className="bg-white shadow-lg rounded-xl p-6">
                    <h2 className="text-xl font-semibold">
                        Total projects
                    </h2>

                    <p className="text-4xl font-bold mt-4">
                        5
                    </p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6">
                    <h2 className="text-xl font-semibold">
                        Applications
                    </h2>
                    <p className="text-4xl font-bold mt-4">12</p>
                </div>
            </div>
        </div>
    )
 
    
}

export default Dashboard;