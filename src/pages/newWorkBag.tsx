//from modules
import { getSession, useSession } from "next-auth/react";
import { Session } from "next-auth/core/types";
//components
import WorkBag from "../components/WorkBag/index2";
//types
import { NextPage } from "next";
import getNearServices from "./api/public/workbag";
import { useState } from "react";

type Props = {
  userOffers: string;
  defaultLocation: string;
};

const WorkBagPage: NextPage<Props> = ({ userOffers, defaultLocation }) => {
  const [nearOffers] = useState(JSON.parse(userOffers));

  return <WorkBag {...{ nearOffers, defaultLocation }} />;
};

export default WorkBagPage;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  console.log("session SSR", session);
  if (session) {
    const workBag = await getNearServices({
      categories: session.workerData.items.map((m: any) => m.category),
      lat: session.address.lat,
      lng: session.address.lng,
      RangeCoverage: session.workerData?.rangeCoverage,
    });
    return {
      props: {
        userOffers: JSON.stringify(workBag),
        defaultLocation: JSON.stringify({
          lat: session.address.lat,
          lng: session.address.lng,
        }),
      },
    };
  } else {
    const workBag = await getNearServices({
      categories: [],
      lat: -31.4198303,
      lng: -64.1903709,
      RangeCoverage: 100,
    });
    return {
      props: {
        userOffers: JSON.stringify(workBag),
        defaultLocation: JSON.stringify({
          lat: -31.4198303,
          lng: -64.1903709,
        }),
      },
    };
  }
}
