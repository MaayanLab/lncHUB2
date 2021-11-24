import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Suspense } from 'react';

const Card = React.lazy(() => import('./Card'));

export default function Dashboard({ appyters }) {
    return (
        <div className="row justify-content-center my-3">
            {appyters.map((appyter) => (
                <Suspense fallback={<div>Loading...</div>}>
                    <Card key={appyter.id} appyter={{ appyter }} />
                </Suspense>
            ))}
        </div>
    );
}
