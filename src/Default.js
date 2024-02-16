import React from "react";
import { useNavigate } from "react-router-dom";

export default function Default() {
    let navigate = useNavigate();

    React.useEffect(() => {
        navigate('/SignIn')
    }
        , [navigate]);
    return (
        <div>
            {/* {navigate('/login')} */}
        </div>
    )
}