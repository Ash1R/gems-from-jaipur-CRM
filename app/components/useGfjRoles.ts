import { useUser } from "@auth0/nextjs-auth0/client";

const useGfjRoles = () => {
  const { user } = useUser();
  const roles = user?.gfjroles;
  return { email: user?.email, role: roles ? roles[0] : "none" };
};

export default useGfjRoles;
