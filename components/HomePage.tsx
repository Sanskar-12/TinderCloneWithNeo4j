"use client";

import { Neo4JUser } from "@/types";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import TinderCard from "react-tinder-card";
import { neo4jSwipe } from "@/app/neo4j.action";

interface HomePageProps {
  currentUser: Neo4JUser;
  users: Neo4JUser[];
}

const HomePageClientComponent = ({ currentUser, users }: HomePageProps) => {
  const handleSwipe = async (direction: string, userId: string) => {
    const isMatch = await neo4jSwipe(
      currentUser.applicationId,
      userId,
      direction
    );

    if (isMatch) {
      alert("Congrats!! Its a match.");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div>
        <div>
          <h1 className="text-4xl">
            Hello {currentUser.firstname} {currentUser.lastname}
          </h1>
        </div>
        <div className="mt-4 relative">
          {users.map((user) => (
            <TinderCard
              key={user.applicationId}
              className="absolute"
              onSwipe={(direction) =>
                handleSwipe(direction, user.applicationId)
              }
            >
              <Card>
                <CardHeader>
                  <CardTitle>
                    {user.firstname} {user.lastname}
                  </CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </CardHeader>
              </Card>
            </TinderCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePageClientComponent;
