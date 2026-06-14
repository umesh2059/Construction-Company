import { useParams } from "react-router-dom";


const ProjectDetails=()=>{

    const {id} = useParams();
    return(
        <div className="max-w-7xl mx-auto p-10">
            <h1 className="text-5xl font-bold">
                Project ID : {id}
            </h1>

        </div>
    );
};

export default ProjectDetails;