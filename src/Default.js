import React from "react";
import { useNavigate } from "react-router-dom";

export default function Default() {
    let navigate = useNavigate();

    React.useEffect(() => {
        navigate('/SignIn')
    }
        , []);
    return (
        <div>
            {/* {navigate('/login')} */}
        </div>
    )
}