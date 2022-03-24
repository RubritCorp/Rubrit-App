//from modules
import { getSession, useSession } from "next-auth/react";
import { Session } from "next-auth/core/types";
//components
import WorkBag from "../components/WorkBag";
//types
import { NextPage } from "next";
import getNearServices from "./api/public/workbag";
import { useEffect, useState } from "react";

type Props = {
  userOffers: string;
};

const WorkbagPage: NextPage<Props> = ({ userOffers }) => {
  const [nearOffers] = useState(JSON.parse(userOffers));

  return <WorkBag {...{ nearOffers }} />;
};

export default WorkbagPage;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (session) {
    const workBag = await getNearServices({
      categories: session.workerData.items.map((m: any) => m.category),
      lat: session.address.lat,
      lng: session.address.lng,
      RangeCoverage: 100,
    });
    return {
      props: {
        userOffers: JSON.stringify(workBag),
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
      },
    };
  }
}
