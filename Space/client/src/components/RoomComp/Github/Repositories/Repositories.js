import React from "react";

import "./Repositories.css";
import Repository from "./Repository";

const Repositories = ({ repos, user }) => (
  <div className="repositories">
    {repos.map((repo) => (
      <Repository key={repo.id} repo={repo} user={user} />
    ))}
  </div>
);

export default Repositories;
