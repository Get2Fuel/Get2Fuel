import React, { useEffect } from "react";

export default function ApiCall({ props }) {
    if (props.pos) {
        console.log(props.pos.coords.latitude);
        console.log(props.pos.coords.longitude);
        var details = {
            "pointsListStr": props.pos.coords.latitude + "-" + props.pos.coords.longitude,
            "carb": "1-0",
            "ordPrice": "asc"
        }

        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
    }
    useEffect(async () => {
        if (props.pos) {
            const string = "https://fathomless-chamber-48058.herokuapp.com/https://carburanti.mise.gov.it/OssPrezziSearch/ricerca/position?" + formBody
            const response = await fetch(string, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });
            const data = await response.json();
            console.log(data);
        }
        // const [stations] = data.results;
        // console.log(data.results);
    }, [formBody]);
    return (
        <div className="ApiCall">
            <p>wasd</p>
        </div>
    );
};