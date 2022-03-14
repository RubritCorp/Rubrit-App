import ProfessionalLanding from "../../components/ProfessionalLanding";

import { useRouter } from "next/router";
import { GetServerSideProps, NextPage } from "next/types";
import { ParsedUrlQuery } from "querystring";
import { getUser } from "pages/api/public/users/getProfile";

const UserLanding: NextPage<any> = ({ user }) => {
  const { query } = useRouter();

  return (
    <>
      <ProfessionalLanding user={user} />
    </>
  );
};

export default UserLanding;

interface IParams extends ParsedUrlQuery {
  query: string;
}
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { userId } = query as IParams;

  const user = await getUser(userId);

  return { props: { user: JSON.stringify(user) } };
};
