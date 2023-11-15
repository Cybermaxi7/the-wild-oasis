import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;
export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    // 1. Load authenticated user
    const { isLoading, isAuthenticated } = useUser();
    // 2. If there is no authenticated user, redirect to login page
    useEffect(function () {
        if (!isAuthenticated && !isLoading) navigate("/login");
    }, [isAuthenticated, isLoading, navigate]);
    // 3. Show Spinner
    if (isLoading)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );

    // 4. If there is a user, render the app
    if(isAuthenticated) return children;
}
