import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
    <div className="page-header">
        <div className="content-container">
            <h1 className="page-header__404">Page not found. What did you expect, though?</h1>
            <Link className="button" to="/forpuca">Go home, you're drunk</Link>
        </div>
    </div>
);

export default NotFoundPage;
