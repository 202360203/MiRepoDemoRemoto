import { useEffect, useState } from "react";

function UsaHookEffect(){
    const [hora, setHora] = useState(new Date());

    useEffect(
        () => {
            const timer = setInterval(
                () => {
                    setHora(new Date());
                }, 1000
            );
            return () => clearInterval(timer);
        }, []
    );
    
    return <h1>{hora.toLocaleTimeString()}</h1>
};

export default UsaHookEffect;