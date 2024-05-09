import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';

interface Location {
    id: string;
    name: string;
    description: string;
    photo: string;
}

interface Data {
    locations: Location[];
}

const AppQuery = gql`
    query GetLocations {
        locations {
            id
            name
            description
            photo
        }
    }
`;

const LocationComponent: React.FC<Location> = ({ id, name, description, photo }) => (
    <div key={id}>
        <h3>{name}</h3>
        <img width="400" height="250" alt="location-reference" src={`${photo}`} />
        <br />
        <b>About this location:</b>
        <p>{description}</p>
        <br />
    </div>
);

const App: React.FC = () => {
    const { loading, data, error } = useQuery<Data>(AppQuery);

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <>
            {data?.locations?.map((location) => (
                <LocationComponent {...location} />
            ))}
        </>
    );
};

export default App;