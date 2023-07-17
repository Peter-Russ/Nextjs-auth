'use client'; // Error components must be Client components

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div>
            <h2>Something went wrong! 😪</h2>
            <Link href={"/"}>
                <button>Back to the home page</button>
            </Link>
            <button onClick={() => reset()}>Try again</button>
        </div>
    );
}