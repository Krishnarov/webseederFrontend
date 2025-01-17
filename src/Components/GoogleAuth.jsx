import { useEffect, useState } from "react";

const GoogleAuth = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const handlecallbackResponse = (response) => {
        console.log("jwt token", response.credential)

        // Decode jwt token
        const userObject = JSON.parse(atob(response.credential.split(".")[1]));
        console.log("UserInfo", userObject);
        setName(userObject.name)
        setEmail(userObject.email)
        setImage(userObject.picture)
    }
    useEffect(() => {
        // Load Google Api Script
        const google = window.google;
        google.accounts.id.initialize({
            client_id: "660952183948-hla6o4mmdcq3br8j2j98n8ukgd8dcqim.apps.googleusercontent.com",
            callback: handlecallbackResponse,
        });
        google.accounts.id.renderButton(
            document.getElementById("GoogleSignInDiv"),
            {
                theme: "outline",
                size: "large",
            }
        );
        // automatic sign in previous signed in 
        google.accounts.id.prompt();
    }, []);
    return (
       

            <div id="GoogleSignInDiv"></div>
         
    );
};

export default GoogleAuth;