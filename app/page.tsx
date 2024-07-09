import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { getUserById, getUsersWithNoConnection } from "./neo4j.action";
import HomePageClientComponent from "@/components/HomePage";

const HomePage = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    return redirect(
      "/api/auth/login?post_login_redirect_url=http://localhost:3000/callback"
    );
  }

  const user = await getUser();

  if (!user) {
    return redirect(
      "/api/auth/login?post_login_redirect_url=http://localhost:3000/callback"
    );
  }

  const currentUser = await getUserById(user.id);

  const usersWithNoConnection = await getUsersWithNoConnection(user.id);

  return (
    <div>
      {currentUser && (
        <HomePageClientComponent
          currentUser={currentUser}
          users={usersWithNoConnection}
        />
      )}
    </div>
  );
};

export default HomePage;
