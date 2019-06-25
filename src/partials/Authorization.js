import React from "react";

const Auth = () => {
  return (
    <form action="#">
      <input type="text" name="name" />
      <input type="password" name="password" autoComplete="false" />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Auth;
