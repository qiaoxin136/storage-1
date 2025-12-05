import type { SyntheticEvent } from "react";
import { useEffect, useState } from "react";
import { checkLoginAndGetName } from "../utils/AuthUtils";
//import { NavLink } from "react-router";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

function CreatePlace() {
    const client = generateClient<Schema>().models.Place;
    const [userName, setUserName] = useState<string | undefined>()
    const [placeName, setPlaceName] = useState<string>('');
    const [placeDescription, setPlaceDescription] = useState<string>('');

    useEffect(() => {
        const handleData = async () => {
            const name = await checkLoginAndGetName();
            if (name) {
                setUserName(name)
            }
        }
        handleData();
    }, [])

    async function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();
        const place = await client.create({
            name: placeName,
            description: placeDescription
        })
        console.log(place)
        alert(`Place with id ${place.data?.id} created`)

    }

    function renderCreatePlaceForm() {
        if (userName) {
            return (
                <div>You are logged in</div>
            )
        } else {
            return (

                <form onSubmit={(e) => handleSubmit(e)}>
                    <label>Place name:</label><br />
                    <input value={placeName} onChange={(e) => setPlaceName(e.target.value)} /><br />
                    <label>Place description:</label><br />
                    <input value={placeDescription} onChange={(e) => setPlaceDescription(e.target.value)} /><br />
                    <input type="submit" value='Create place' />
                </form>
            )
        }
    }

    return <main>
         {renderCreatePlaceForm()}
    </main>
}

export default CreatePlace
