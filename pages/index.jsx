// import Link from "next/link";
// import JobRegistration from "../components/job-registration";
import Welcome from "../components/welcome";
import GeneralLayout from "../layouts/general";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import useUserContext from "../hooks/useUserContext";

const DynamicJobRegistration = dynamic(
  () => import("../components/job-registration"),
  {
    suspense: true,
  }
);

export default function Home() {
  const { user } = useUserContext();
  if (typeof window !== "undefined") {
    console.log("You are on the browser");
  } else {
    console.log("You are on the server");
  }
  return (
    <div>
      <GeneralLayout>
        {!user && <Welcome />}
        {user && (
          <Suspense fallback={`Loading...`}>
            <DynamicJobRegistration />
          </Suspense>
        )}
      </GeneralLayout>
    </div>
  );
}
